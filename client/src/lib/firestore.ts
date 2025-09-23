import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot,
  Unsubscribe 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SiteContent } from '@shared/contentSchema';

const PORTFOLIO_DOC_ID = 'main';
const COLLECTION_NAME = 'portfolio';

export class FirestoreService {
  private unsubscribe: Unsubscribe | null = null;

  /**
   * Save portfolio content to Firestore
   */
  async saveContent(content: SiteContent): Promise<boolean> {
    try {
      console.log('🔄 FirestoreService: Starting save operation...');
      console.log('📋 Content sections to save:', Object.keys(content));
      
      // Validate content structure
      const requiredSections = ['personalInfo', 'socialLinks', 'navigation', 'hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
      const availableSections = Object.keys(content);
      const missingSections = requiredSections.filter(section => !availableSections.includes(section));
      
      if (missingSections.length > 0) {
        console.warn('⚠️  Missing sections detected:', missingSections);
        console.log('🔍 Available sections:', availableSections);
      }
      
      // Log detailed content structure for debugging
      console.log('🏠 Hero section:', content.hero?.title?.first, content.hero?.title?.last);
      console.log('📄 About section:', content.about?.title, '- Has secondParagraph:', !!content.about?.secondParagraph);
      console.log('📧 Contact section:', content.contact?.title, '- Email:', content.contact?.email);
      console.log('🔗 Social links count:', content.socialLinks?.length || 0);
      console.log('🧭 Navigation items count:', content.navigation?.length || 0);
      
      // Create deep clone to avoid reference issues
      const contentClone = JSON.parse(JSON.stringify(content));
      
      const docRef = doc(db, COLLECTION_NAME, PORTFOLIO_DOC_ID);
      const saveData = {
        content: contentClone,
        lastModified: new Date().toISOString(),
        version: '1.0.0',
        debug: {
          savedAt: new Date().toISOString(),
          sectionsCount: Object.keys(contentClone).length,
          sections: Object.keys(contentClone),
          fieldCounts: {
            heroFields: Object.keys(contentClone.hero || {}).length,
            aboutFields: Object.keys(contentClone.about || {}).length,
            contactFields: Object.keys(contentClone.contact || {}).length,
            socialLinksCount: (contentClone.socialLinks || []).length,
            navigationCount: (contentClone.navigation || []).length
          }
        }
      };
      
      await setDoc(docRef, saveData, { merge: true });
      
      console.log('✅ FirestoreService: Save completed successfully!');
      console.log('📊 Saved sections:', Object.keys(contentClone));
      console.log('🎯 Document saved with debug info:', saveData.debug);
      
      return true;
    } catch (error) {
      console.error('❌ Error saving content to Firestore:', error);
      return false;
    }
  }

  /**
   * Load portfolio content from Firestore
   */
  async loadContent(): Promise<SiteContent | null> {
    try {
      console.log('📥 FirestoreService: Loading content from Firestore...');
      const docRef = doc(db, COLLECTION_NAME, PORTFOLIO_DOC_ID);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        const loadedContent = data.content as SiteContent;
        
        // Log detailed structure for debugging
        console.log('📋 Loaded sections:', Object.keys(loadedContent));
        console.log('🏠 Loaded hero:', loadedContent.hero?.title?.first, loadedContent.hero?.title?.last);
        console.log('📄 Loaded about:', loadedContent.about?.title, '- Has secondParagraph:', !!loadedContent.about?.secondParagraph);
        console.log('📧 Loaded contact:', loadedContent.contact?.title, '- Email:', loadedContent.contact?.email);
        console.log('📊 Loaded metadata:', data.debug?.sectionsCount, 'sections at', data.lastModified);
        
        return loadedContent;
      }
      
      console.log('📭 No existing content found in Firestore');
      return null;
    } catch (error) {
      console.error('❌ Error loading content from Firestore:', error);
      return null;
    }
  }

  /**
   * Get document metadata (last modified, version, etc.)
   */
  async getContentMetadata(): Promise<{lastModified: string, version: string} | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, PORTFOLIO_DOC_ID);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          lastModified: data.lastModified || '',
          version: data.version || '1.0.0'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error loading content metadata:', error);
      return null;
    }
  }

  /**
   * Subscribe to real-time content updates
   */
  subscribeToContent(callback: (content: SiteContent | null, metadata?: any) => void): void {
    const docRef = doc(db, COLLECTION_NAME, PORTFOLIO_DOC_ID);
    
    this.unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        callback(data.content as SiteContent, {
          lastModified: data.lastModified,
          version: data.version
        });
      } else {
        callback(null);
      }
    }, (error) => {
      console.error('Error in content subscription:', error);
      callback(null);
    });
  }

  /**
   * Unsubscribe from real-time updates
   */
  unsubscribeFromContent(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  /**
   * Check if content exists in Firestore
   */
  async contentExists(): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTION_NAME, PORTFOLIO_DOC_ID);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.error('Error checking if content exists:', error);
      return false;
    }
  }
}

export const firestoreService = new FirestoreService();

// Test function for debugging (available in browser console)
(window as any).testFirebaseSync = async () => {
  console.log('🧪 Testing Firebase sync functionality...');
  
  try {
    // Test loading current content
    console.log('📥 Testing load...');
    const loadedContent = await firestoreService.loadContent();
    
    if (loadedContent) {
      console.log('✅ Content loaded successfully');
      
      // Test saving with a small modification
      console.log('💾 Testing save with modification...');
      const testContent = { 
        ...loadedContent, 
        hero: { 
          ...loadedContent.hero, 
          description: `${loadedContent.hero.description} [TEST SYNC ${new Date().getTime()}]` 
        } 
      };
      
      const saveSuccess = await firestoreService.saveContent(testContent);
      if (saveSuccess) {
        console.log('✅ Content saved successfully');
        
        // Test loading again to verify sync
        console.log('🔄 Testing reload to verify sync...');
        const reloadedContent = await firestoreService.loadContent();
        
        if (reloadedContent && reloadedContent.hero.description.includes('[TEST SYNC')) {
          console.log('🎉 Firebase sync test PASSED! Data saved and loaded correctly.');
        } else {
          console.error('❌ Firebase sync test FAILED! Data was not properly synced.');
        }
      } else {
        console.error('❌ Save test failed');
      }
    } else {
      console.log('📝 No existing content found. Testing initial save...');
      
      // Import default data for testing
      const siteData = await import('@/content/siteData');
      const defaultContent = {
        personalInfo: siteData.personalInfo,
        socialLinks: siteData.socialLinks,
        navigation: siteData.navigationSections,
        hero: siteData.heroContent,
        about: siteData.aboutContent,
        skills: siteData.skillsContent,
        projects: siteData.projectsContent,
        experience: siteData.experienceContent,
        certifications: siteData.certificationsContent,
        contact: siteData.contactContent,
      };
      
      const saveSuccess = await firestoreService.saveContent(defaultContent);
      if (saveSuccess) {
        console.log('✅ Initial content saved successfully');
      } else {
        console.error('❌ Initial save failed');
      }
    }
  } catch (error) {
    console.error('❌ Firebase sync test error:', error);
  }
};

// Function to ensure complete data structure (available in browser console)
(window as any).ensureCompleteFirebaseData = async () => {
  console.log('🔧 Ensuring complete Firebase data structure...');
  
  try {
    // Import all site data
    const siteData = await import('@/content/siteData');
    
    // Create complete content structure with all required fields
    const completeContent = {
      personalInfo: siteData.personalInfo,
      socialLinks: siteData.socialLinks,
      navigation: siteData.navigationSections,
      hero: siteData.heroContent, // Note: This is "hero", not "home"
      about: siteData.aboutContent, // This includes secondParagraph
      skills: siteData.skillsContent,
      projects: siteData.projectsContent,
      experience: siteData.experienceContent,
      certifications: siteData.certificationsContent,
      contact: siteData.contactContent,
    };
    
    console.log('📊 Complete content structure:');
    console.log('- Personal Info:', !!completeContent.personalInfo);
    console.log('- Social Links:', completeContent.socialLinks.length, 'items');
    console.log('- Navigation:', completeContent.navigation.length, 'items');
    console.log('- Hero (NOT home):', !!completeContent.hero, '- Description:', completeContent.hero.description.substring(0, 50) + '...');
    console.log('- About:', !!completeContent.about, '- Has secondParagraph:', !!completeContent.about.secondParagraph);
    console.log('- Skills:', !!completeContent.skills, '- Categories:', completeContent.skills.categories.length);
    console.log('- Projects:', !!completeContent.projects, '- Projects:', completeContent.projects.projects.length);
    console.log('- Experience:', !!completeContent.experience, '- Experiences:', completeContent.experience.experiences.length);
    console.log('- Certifications:', !!completeContent.certifications, '- Certs:', completeContent.certifications.certifications.length);
    console.log('- Contact:', !!completeContent.contact, '- Email:', completeContent.contact.email);
    
    console.log('💾 Saving complete structure to Firebase...');
    const saveSuccess = await firestoreService.saveContent(completeContent);
    
    if (saveSuccess) {
      console.log('✅ Complete data structure saved to Firebase successfully!');
      console.log('🔄 Verifying by reloading...');
      
      const reloadedContent = await firestoreService.loadContent();
      if (reloadedContent) {
        console.log('✅ Data reloaded successfully! All sections should now be complete.');
        console.log('📋 Reloaded sections:', Object.keys(reloadedContent));
        
        // Verify critical fields
        if (reloadedContent.hero && reloadedContent.about?.secondParagraph && reloadedContent.contact?.email) {
          console.log('🎉 SUCCESS! All critical fields are present in Firebase:');
          console.log('- Hero section: ✅');
          console.log('- About secondParagraph: ✅');
          console.log('- Contact email: ✅');
          console.log('- All sections: ✅');
        } else {
          console.warn('⚠️ Some critical fields may still be missing');
        }
      }
    } else {
      console.error('❌ Failed to save complete structure');
    }
  } catch (error) {
    console.error('❌ Error ensuring complete data:', error);
  }
};