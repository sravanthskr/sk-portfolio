import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { SiteContent, ContentUpdate } from "@shared/contentSchema";
import * as siteData from "@/content/siteData";
import { sectionedFirestoreService } from "@/lib/sectionedFirestore";
import { useAuth } from "@/contexts/AuthContext";

// Hook to safely use auth context (returns null if not available)
const useSafeAuth = () => {
  try {
    return useAuth();
  } catch (error) {
    return { isAdmin: false, user: null };
  }
};

// Transform the current siteData to match the new schema
const transformSiteData = (): SiteContent => {
  return {
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
};

interface ContentContextType {
  content: SiteContent;
  isDirty: boolean;
  lastSaved: Date | null;
  loading: boolean;
  saving: boolean;
  updateContent: (path: string, value: any) => void;
  updateMultiple: (updates: ContentUpdate[]) => void;
  resetContent: () => void;
  saveToFirestore: () => Promise<boolean>;
  loadFromFirestore: () => Promise<boolean>;
  saveToStorage: () => boolean;
  loadFromStorage: () => boolean;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
}

const ContentContext = createContext<ContentContextType | null>(null);

const STORAGE_KEY = "portfolio_content_data";

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState<SiteContent>(transformSiteData());
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { isAdmin, user } = useSafeAuth();

  // Initialize content - Load from Firestore if admin, otherwise from localStorage
  useEffect(() => {
    const initializeContent = async () => {
      if (isAdmin && user) {
        const loaded = await loadFromFirestore();
        // If no data exists in Firestore, auto-initialize with defaults
        if (!loaded) {
          console.log(
            "No portfolio data found in Firestore. Initializing with defaults...",
          );
          const defaultContent = transformSiteData();
          setSaving(true);
          try {
            const success = await sectionedFirestoreService.saveAllSections(defaultContent);
            if (success) {
              setContent(defaultContent);
              setLastSaved(new Date());
              setIsDirty(false);
              console.log(
                "Portfolio data initialized in Firestore successfully!",
              );
            }
          } catch (error) {
            console.error("Failed to initialize Firestore data:", error);
          } finally {
            setSaving(false);
          }
        }
      } else {
        loadFromStorage();
      }
    };

    initializeContent();
  }, [isAdmin, user]);

  // Set up real-time sync for all users (read-only for non-admin)
  useEffect(() => {
    let isComponentMounted = true;
    
    // Subscribe to Firebase updates for live preview functionality
    sectionedFirestoreService.subscribeToAllSections((firestoreContent) => {
        if (firestoreContent && isComponentMounted) {
          // Always update content from Firestore, but only if not currently saving
          if (!saving) {
            console.log(
              "📥 Loading content from Firestore:",
              Object.keys(firestoreContent),
            );
            
            // Ensure data integrity - merge with defaults to prevent undefined arrays
            const defaultData = transformSiteData();
            const safeContent = {
              ...defaultData, // Default fallbacks
              ...firestoreContent, // Override with Firestore data (already normalized by sectionedFirestoreService)
              // Specifically ensure arrays are always arrays with fallback to defaults
              navigation: Array.isArray(firestoreContent.navigation) ? firestoreContent.navigation : defaultData.navigation,
              socialLinks: Array.isArray(firestoreContent.socialLinks) ? firestoreContent.socialLinks : defaultData.socialLinks,
              // Ensure nested objects exist
              hero: firestoreContent.hero ? { ...defaultData.hero, ...firestoreContent.hero } : defaultData.hero,
              about: firestoreContent.about ? { ...defaultData.about, ...firestoreContent.about } : defaultData.about,
              skills: firestoreContent.skills ? { ...defaultData.skills, ...firestoreContent.skills } : defaultData.skills,
              projects: firestoreContent.projects ? { ...defaultData.projects, ...firestoreContent.projects } : defaultData.projects,
              experience: firestoreContent.experience ? { ...defaultData.experience, ...firestoreContent.experience } : defaultData.experience,
              certifications: firestoreContent.certifications ? { ...defaultData.certifications, ...firestoreContent.certifications } : defaultData.certifications,
              contact: firestoreContent.contact ? { ...defaultData.contact, ...firestoreContent.contact } : defaultData.contact,
            };
            
            setContent(safeContent);
            setIsDirty(false); // Reset dirty state when loading from Firestore
            setLastSaved(new Date());
          }
        }
      });

      return () => {
        isComponentMounted = false;
        sectionedFirestoreService.unsubscribeFromAllSections();
      };
    }, [saving]);

  const setValueByPath = useCallback((obj: any, path: string, value: any) => {
    const keys = path.split(".");
    const lastKey = keys.pop()!;

    let current = obj;
    for (const key of keys) {
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }

    current[lastKey] = value;
  }, []);

  const updateContent = useCallback(
    (path: string, value: any) => {
      setContent((prev) => {
        const newContent = JSON.parse(JSON.stringify(prev)); // Deep clone
        setValueByPath(newContent, path, value);
        return newContent;
      });
      setIsDirty(true);
    },
    [setValueByPath],
  );

  const updateMultiple = useCallback(
    (updates: ContentUpdate[]) => {
      setContent((prev) => {
        const newContent = JSON.parse(JSON.stringify(prev)); // Deep clone
        updates.forEach(({ path, value }) => {
          setValueByPath(newContent, path, value);
        });
        return newContent;
      });
      setIsDirty(true);
    },
    [setValueByPath],
  );

  const resetContent = useCallback(async () => {
    const defaultContent = transformSiteData();
    setContent(defaultContent);
    setIsDirty(true);

    // If admin, also reset the Firestore content
    if (isAdmin && user) {
      setSaving(true);
      try {
        await sectionedFirestoreService.saveAllSections(defaultContent);
        setIsDirty(false);
        setLastSaved(new Date());
      } catch (error) {
        console.error("Failed to reset content in Firestore:", error);
      } finally {
        setSaving(false);
      }
    } else {
      setIsDirty(false);
      setLastSaved(null);
    }
  }, [isAdmin, user]);

  const saveToFirestore = useCallback(async (): Promise<boolean> => {
    if (!isAdmin || !user) {
      return false;
    }

    setSaving(true);
    try {
      console.log("💾 Saving content to Firestore:", Object.keys(content));
      console.log("📋 Content preview:", {
        hero: content.hero?.title,
        about: content.about?.title,
        totalSections: Object.keys(content).length,
      });

      const success = await sectionedFirestoreService.saveAllSections(content);
      if (success) {
        setIsDirty(false);
        setLastSaved(new Date());
        console.log("✅ Content saved successfully to Firestore!");
      } else {
        console.error("❌ Failed to save content to Firestore");
      }
      return success;
    } catch (error) {
      console.error("Failed to save to Firestore:", error);
      return false;
    } finally {
      setSaving(false);
    }
  }, [content, isAdmin, user]);

  const loadFromFirestore = useCallback(async (): Promise<boolean> => {
    if (!isAdmin || !user) {
      return false;
    }

    setLoading(true);
    try {
      const firestoreContent = await sectionedFirestoreService.loadAllSections();
      if (firestoreContent) {
        // Ensure data integrity - merge with defaults to prevent undefined arrays (same as subscription path)
        const defaultData = transformSiteData();
        const safeContent = {
          ...defaultData, // Default fallbacks
          ...firestoreContent, // Override with Firestore data (already normalized by sectionedFirestoreService)
          // Specifically ensure arrays are always arrays with fallback to defaults
          navigation: Array.isArray(firestoreContent.navigation) ? firestoreContent.navigation : defaultData.navigation,
          socialLinks: Array.isArray(firestoreContent.socialLinks) ? firestoreContent.socialLinks : defaultData.socialLinks,
          // Ensure nested objects exist
          hero: firestoreContent.hero ? { ...defaultData.hero, ...firestoreContent.hero } : defaultData.hero,
          about: firestoreContent.about ? { ...defaultData.about, ...firestoreContent.about } : defaultData.about,
          skills: firestoreContent.skills ? { ...defaultData.skills, ...firestoreContent.skills } : defaultData.skills,
          projects: firestoreContent.projects ? { ...defaultData.projects, ...firestoreContent.projects } : defaultData.projects,
          experience: firestoreContent.experience ? { ...defaultData.experience, ...firestoreContent.experience } : defaultData.experience,
          certifications: firestoreContent.certifications ? { ...defaultData.certifications, ...firestoreContent.certifications } : defaultData.certifications,
          contact: firestoreContent.contact ? { ...defaultData.contact, ...firestoreContent.contact } : defaultData.contact,
        };
        
        setContent(safeContent);
        setIsDirty(false);
        setLastSaved(new Date());
        console.log("Portfolio data loaded from Firestore successfully!");
        return true;
      }
      console.log("No existing portfolio data found in Firestore.");
      return false;
    } catch (error) {
      console.error("Failed to load from Firestore:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [isAdmin, user]);

  const saveToStorage = useCallback(() => {
    try {
      const dataToSave = {
        content,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      if (!isAdmin) {
        // Only update these states if not admin (admin uses Firestore)
        setIsDirty(false);
        setLastSaved(new Date());
      }
      return true;
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
      return false;
    }
  }, [content, isAdmin]);

  const loadFromStorage = useCallback((): boolean => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { content: savedContent, timestamp } = JSON.parse(saved);
        setContent(savedContent);
        setLastSaved(new Date(timestamp));
        setIsDirty(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      return false;
    }
  }, []);

  const exportData = useCallback((): string => {
    const exportData = {
      version: "1.0.0",
      exported: new Date().toISOString(),
      content,
    };
    return JSON.stringify(exportData, null, 2);
  }, [content]);

  const importData = useCallback((jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.content && typeof parsed.content === "object") {
        setContent(parsed.content);
        setIsDirty(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to import data:", error);
      return false;
    }
  }, []);

  const contextValue: ContentContextType = {
    content,
    isDirty,
    lastSaved,
    loading,
    saving,
    updateContent,
    updateMultiple,
    resetContent,
    saveToFirestore,
    loadFromFirestore,
    saveToStorage,
    loadFromStorage,
    exportData,
    importData,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};

// Selector hooks for specific content sections
export const usePersonalInfo = () => useContent().content.personalInfo;
export const useSocialLinks = () => useContent().content.socialLinks;
export const useNavigation = () => useContent().content.navigation;
export const useHeroContent = () => useContent().content.hero;
export const useAboutContent = () => useContent().content.about;
export const useSkillsContent = () => useContent().content.skills;
export const useProjectsContent = () => useContent().content.projects;
export const useExperienceContent = () => useContent().content.experience;
export const useCertificationsContent = () =>
  useContent().content.certifications;
export const useContactContent = () => useContent().content.contact;
