import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot,
  Unsubscribe,
  collection,
  getDocs
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SiteContent } from '@shared/contentSchema';

const COLLECTION_NAME = 'portfolio';

// Section names that correspond to document IDs
const SECTION_NAMES = [
  'personalInfo',
  'socialLinks', 
  'navigation',
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'certifications',
  'contact'
] as const;

export type SectionName = typeof SECTION_NAMES[number];

export class SectionedFirestoreService {
  private unsubscribers: Map<string, Unsubscribe> = new Map();

  /**
   * Normalize arrays that were stored as objects with numeric keys back to proper arrays
   * This handles Firebase's array-to-object conversion issue
   */
  private normalizeArrayFields(data: any): any {
    if (!data || typeof data !== 'object') return data;

    const normalized = { ...data };

    // Define which fields should be arrays
    const arrayFields = ['socialLinks', 'navigation', 'projects', 'experience', 'certifications'];
    
    arrayFields.forEach(fieldName => {
      const field = normalized[fieldName];
      if (field && !Array.isArray(field) && typeof field === 'object') {
        // Check if this looks like an object with numeric keys (0, 1, 2, etc.)
        const keys = Object.keys(field);
        const isNumericKeysOnly = keys.every(key => /^\d+$/.test(key));
        
        if (isNumericKeysOnly && keys.length > 0) {
          // Convert object with numeric keys back to array
          const sortedKeys = keys.sort((a, b) => parseInt(a) - parseInt(b));
          normalized[fieldName] = sortedKeys.map(key => field[key]);
          console.log(`🔧 Normalized ${fieldName} from object to array`);
        }
      }
    });

    // Handle nested array fields within sections
    if (normalized.skills?.categories && Array.isArray(normalized.skills.categories)) {
      normalized.skills.categories = normalized.skills.categories.map((category: any) => {
        if (category.skills && !Array.isArray(category.skills) && typeof category.skills === 'object') {
          const skillKeys = Object.keys(category.skills);
          const isNumericKeysOnly = skillKeys.every(key => /^\d+$/.test(key));
          if (isNumericKeysOnly && skillKeys.length > 0) {
            const sortedKeys = skillKeys.sort((a, b) => parseInt(a) - parseInt(b));
            category.skills = sortedKeys.map(key => category.skills[key]);
          }
        }
        return category;
      });
    }

    // Verify arrays are properly normalized (for debugging)
    arrayFields.forEach(fieldName => {
      if (normalized[fieldName] && !Array.isArray(normalized[fieldName])) {
        console.warn(`⚠️ ${fieldName} is not an array after normalization:`, typeof normalized[fieldName]);
      }
    });

    return normalized;
  }

  /**
   * Save a specific section to its own document
   */
  async saveSection(sectionName: SectionName, sectionData: any): Promise<boolean> {
    if (!db) {
      console.warn('Firebase not available for saving section');
      return false;
    }
    try {
      console.log(`🔄 Saving ${sectionName} section...`);
      console.log(`📋 Section data keys:`, Object.keys(sectionData || {}));
      
      const docRef = doc(db, COLLECTION_NAME, sectionName);
      const saveData = {
        ...sectionData, // Save ALL fields from the section
        lastModified: new Date().toISOString(),
        version: '1.0.0',
        sectionName
      };
      
      await setDoc(docRef, saveData, { merge: false }); // Use merge: false to replace entire document
      
      console.log(`✅ Successfully saved ${sectionName} section`);
      return true;
    } catch (error: any) {
      // Silently handle aborted requests
      if (error.code === 'cancelled' || error.message?.includes('aborted')) {
        return false;
      }
      console.error(`❌ Error saving ${sectionName} section:`, error);
      return false;
    }
  }

  /**
   * Save all sections of content to separate documents
   */
  async saveAllSections(content: SiteContent): Promise<boolean> {
    try {
      console.log('🔄 Saving all sections to separate documents...');
      
      const promises = SECTION_NAMES.map(async (sectionName) => {
        const sectionData = content[sectionName];
        if (sectionData) {
          return this.saveSection(sectionName, sectionData);
        }
        return true;
      });

      const results = await Promise.all(promises);
      const allSuccessful = results.every(result => result === true);
      
      if (allSuccessful) {
        console.log('✅ All sections saved successfully!');
      } else {
        console.error('❌ Some sections failed to save');
      }
      
      return allSuccessful;
    } catch (error: any) {
      // Silently handle aborted requests
      if (error.code === 'cancelled' || error.message?.includes('aborted')) {
        return false;
      }
      console.error('❌ Error saving all sections:', error);
      return false;
    }
  }

  /**
   * Load a specific section from its document
   */
  async loadSection(sectionName: SectionName): Promise<any | null> {
    if (!db) {
      console.warn('Firebase not available for loading section');
      return null;
    }
    try {
      console.log(`📥 Loading ${sectionName} section...`);
      
      const docRef = doc(db, COLLECTION_NAME, sectionName);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Remove metadata and return just the section data
        const { lastModified, version, sectionName: _, ...sectionData } = data;
        console.log(`✅ Loaded ${sectionName} with fields:`, Object.keys(sectionData));
        // Normalize arrays that may have been stored as objects
        return this.normalizeArrayFields(sectionData);
      }
      
      console.log(`ℹ️  No document found for ${sectionName}`);
      return null;
    } catch (error: any) {
      // Silently handle aborted requests
      if (error.code === 'cancelled' || error.message?.includes('aborted')) {
        return null;
      }
      console.error(`❌ Error loading ${sectionName} section:`, error);
      return null;
    }
  }

  /**
   * Load all sections and reconstruct the complete SiteContent
   */
  async loadAllSections(): Promise<SiteContent | null> {
    try {
      console.log('📥 Loading all sections from separate documents...');
      
      const sections: Partial<SiteContent> = {};
      
      for (const sectionName of SECTION_NAMES) {
        const sectionData = await this.loadSection(sectionName);
        if (sectionData) {
          sections[sectionName] = sectionData;
        }
      }
      
      // Check if we have any data
      const sectionKeys = Object.keys(sections);
      if (sectionKeys.length === 0) {
        console.log('ℹ️  No sections found in database');
        return null;
      }
      
      console.log(`✅ Loaded ${sectionKeys.length} sections:`, sectionKeys);
      return sections as SiteContent;
    } catch (error: any) {
      // Silently handle aborted requests
      if (error.code === 'cancelled' || error.message?.includes('aborted')) {
        return null;
      }
      console.error('❌ Error loading all sections:', error);
      return null;
    }
  }

  /**
   * Subscribe to changes in a specific section
   */
  subscribeToSection(sectionName: SectionName, callback: (data: any) => void): void {
    if (!db) {
      console.warn('Firebase not available for subscription');
      callback(null);
      return;
    }
    const docRef = doc(db, COLLECTION_NAME, sectionName);
    
    const unsubscribe = onSnapshot(docRef, 
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const { lastModified, version, sectionName: _, ...sectionData } = data;
          // Normalize arrays that may have been stored as objects
          callback(this.normalizeArrayFields(sectionData));
        } else {
          callback(null);
        }
      },
      (error) => {
        // Handle errors, especially aborted requests
        if (error.code === 'cancelled' || error.message?.includes('aborted')) {
          // Silently handle aborted requests - they're normal during rapid navigation
          return;
        }
        console.error(`Error in ${sectionName} subscription:`, error);
        callback(null);
      }
    );

    this.unsubscribers.set(sectionName, unsubscribe);
  }

  /**
   * Subscribe to all sections for real-time updates
   */
  subscribeToAllSections(callback: (content: SiteContent | null) => void): void {
    let sectionData: Partial<SiteContent> = {};
    let loadedSections = 0;
    const totalSections = SECTION_NAMES.length;

    SECTION_NAMES.forEach((sectionName) => {
      this.subscribeToSection(sectionName, (data) => {
        if (data) {
          sectionData[sectionName] = data;
        } else {
          delete sectionData[sectionName];
        }
        
        loadedSections = Object.keys(sectionData).length;
        
        // Only call callback if we have some data
        if (loadedSections > 0) {
          callback(sectionData as SiteContent);
        } else {
          callback(null);
        }
      });
    });
  }

  /**
   * Unsubscribe from all section listeners
   */
  unsubscribeFromAllSections(): void {
    this.unsubscribers.forEach((unsubscribe) => {
      unsubscribe();
    });
    this.unsubscribers.clear();
  }

  /**
   * Get metadata for all sections
   */
  async getAllSectionsMetadata(): Promise<Record<string, any>> {
    if (!db) {
      console.warn('Firebase not available for getting metadata');
      return {};
    }
    try {
      const metadata: Record<string, any> = {};
      
      for (const sectionName of SECTION_NAMES) {
        const docRef = doc(db, COLLECTION_NAME, sectionName);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          metadata[sectionName] = {
            lastModified: data.lastModified,
            version: data.version,
            exists: true
          };
        } else {
          metadata[sectionName] = {
            exists: false
          };
        }
      }
      
      return metadata;
    } catch (error) {
      console.error('❌ Error getting sections metadata:', error);
      return {};
    }
  }

  /**
   * Check if content exists (any section has data)
   */
  async contentExists(): Promise<boolean> {
    if (!db) {
      console.warn('Firebase not available for checking content');
      return false;
    }
    try {
      for (const sectionName of SECTION_NAMES) {
        const docRef = doc(db, COLLECTION_NAME, sectionName);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('❌ Error checking if content exists:', error);
      return false;
    }
  }
}

export const sectionedFirestoreService = new SectionedFirestoreService();

// Make available globally for debugging
(window as any).sectionedFirestoreService = sectionedFirestoreService;

console.log('🔧 Sectioned Firestore service loaded!');
console.log('Available sections:', SECTION_NAMES.join(', '));