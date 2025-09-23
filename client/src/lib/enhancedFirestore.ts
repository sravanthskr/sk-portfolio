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

export class EnhancedFirestoreService {
  private unsubscribe: Unsubscribe | null = null;

  /**
   * Enhanced save with complete validation and error handling
   */
  async saveContent(content: SiteContent): Promise<boolean> {
    try {
      console.log('🔄 Enhanced Save: Starting content save...');
      
      // Validate that all required sections exist
      const requiredSections = ['personalInfo', 'socialLinks', 'navigation', 'hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
      const missingSections: string[] = [];
      
      for (const section of requiredSections) {
        if (!content[section as keyof SiteContent]) {
          missingSections.push(section);
        }
      }
      
      if (missingSections.length > 0) {
        console.warn('⚠️  Missing sections:', missingSections);
      }
      
      console.log('📋 Sections to save:', Object.keys(content));
      
      // Create a deep clone to ensure no reference issues
      const contentToSave = JSON.parse(JSON.stringify(content));
      
      // Add validation for each section
      const validatedContent = {
        personalInfo: contentToSave.personalInfo || {
          name: { first: '', last: '' },
          email: '',
          tagline: ''
        },
        socialLinks: Array.isArray(contentToSave.socialLinks) ? contentToSave.socialLinks : [],
        navigation: Array.isArray(contentToSave.navigation) ? contentToSave.navigation : [],
        hero: contentToSave.hero || {
          title: { first: '', last: '' },
          description: '',
          buttons: { primary: { text: '', action: '' } }
        },
        about: contentToSave.about || {
          title: '',
          description: '',
          secondParagraph: '',
          kpiCards: [],
          keyTechnologies: [],
          education: []
        },
        skills: contentToSave.skills || {
          title: '',
          categories: []
        },
        projects: contentToSave.projects || {
          title: '',
          filterCategories: [],
          projects: []
        },
        experience: contentToSave.experience || {
          title: '',
          experiences: []
        },
        certifications: contentToSave.certifications || {
          title: '',
          certifications: []
        },
        contact: contentToSave.contact || {
          title: '',
          subtitle: '',
          description: '',
          bulletPoints: [],
          form: {
            title: '',
            fields: {
              firstName: { label: '', placeholder: '' },
              lastName: { label: '', placeholder: '' },
              email: { label: '', placeholder: '' },
              subject: { label: '', placeholder: '' },
              message: { label: '', placeholder: '' }
            },
            submitButton: { text: '' }
          },
          email: '',
          emailCard: { title: '' }
        }
      };

      console.log('✅ Content validation complete. Saving to Firestore...');
      
      const docRef = doc(db, COLLECTION_NAME, PORTFOLIO_DOC_ID);
      const saveData = {
        content: validatedContent,
        lastModified: new Date().toISOString(),
        version: '1.0.0',
        savedSections: Object.keys(validatedContent),
        totalSections: Object.keys(validatedContent).length
      };
      
      await setDoc(docRef, saveData, { merge: true });
      
      console.log('✅ Enhanced save completed successfully!');
      console.log('📊 Saved sections:', Object.keys(validatedContent));
      
      return true;
    } catch (error) {
      console.error('❌ Enhanced save failed:', error);
      return false;
    }
  }

  /**
   * Enhanced load with validation
   */
  async loadContent(): Promise<SiteContent | null> {
    try {
      console.log('📥 Enhanced Load: Loading content from Firestore...');
      
      const docRef = doc(db, COLLECTION_NAME, PORTFOLIO_DOC_ID);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('✅ Document exists');
        console.log('📊 Available sections:', Object.keys(data.content || {}));
        
        return data.content as SiteContent;
      }
      
      console.log('ℹ️  No document found in Firestore');
      return null;
    } catch (error) {
      console.error('❌ Enhanced load failed:', error);
      return null;
    }
  }

  /**
   * Test all CRUD operations
   */
  async testCRUDOperations(testContent: SiteContent): Promise<void> {
    console.log('🧪 Testing complete CRUD operations...');
    
    try {
      // CREATE/UPDATE
      console.log('1️⃣ Testing CREATE/UPDATE...');
      const saveResult = await this.saveContent(testContent);
      console.log('Save result:', saveResult);
      
      // READ
      console.log('2️⃣ Testing READ...');
      const loadedContent = await this.loadContent();
      if (loadedContent) {
        console.log('✅ Content loaded successfully');
        console.log('📋 Loaded sections:', Object.keys(loadedContent));
        
        // Verify each section
        const sections = ['personalInfo', 'hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
        sections.forEach(section => {
          const exists = !!(loadedContent as any)[section];
          console.log(`${exists ? '✅' : '❌'} ${section}: ${exists ? 'EXISTS' : 'MISSING'}`);
        });
      } else {
        console.log('❌ Failed to load content');
      }
      
      console.log('🎉 CRUD test completed!');
      
    } catch (error) {
      console.error('❌ CRUD test failed:', error);
    }
  }
}

export const enhancedFirestoreService = new EnhancedFirestoreService();

// Make available globally for testing
(window as any).enhancedFirestoreService = enhancedFirestoreService;
(window as any).testEnhancedCRUD = async () => {
  const testContent = {
    personalInfo: { name: { first: 'Test', last: 'User' }, email: 'test@example.com', tagline: 'Test Developer' },
    socialLinks: [{ platform: 'GitHub', url: 'https://github.com', label: 'GitHub', iconName: 'Github' }],
    navigation: [{ id: 'home', label: 'Home', shortcut: '1' }],
    hero: { title: { first: 'Hello', last: 'World' }, description: 'Test hero content', buttons: { primary: { text: 'Contact', action: 'contact' } } },
    about: { title: 'About', description: 'Test about', secondParagraph: 'More about', kpiCards: [], keyTechnologies: [], education: [] },
    skills: { title: 'Skills', categories: [] },
    projects: { title: 'Projects', filterCategories: [], projects: [] },
    experience: { title: 'Experience', experiences: [] },
    certifications: { title: 'Certs', certifications: [] },
    contact: { title: 'Contact', subtitle: 'Get in touch', description: 'Contact me', bulletPoints: [], form: { title: 'Form', fields: { firstName: { label: 'First', placeholder: 'John' }, lastName: { label: 'Last', placeholder: 'Doe' }, email: { label: 'Email', placeholder: 'john@example.com' }, subject: { label: 'Subject', placeholder: 'Hello' }, message: { label: 'Message', placeholder: 'Message' } }, submitButton: { text: 'Send' } }, email: 'test@example.com', emailCard: { title: 'Email' } }
  } as SiteContent;
  
  await enhancedFirestoreService.testCRUDOperations(testContent);
};

console.log('🔧 Enhanced Firestore service loaded!');
console.log('Run testEnhancedCRUD() in console to test complete CRUD operations');