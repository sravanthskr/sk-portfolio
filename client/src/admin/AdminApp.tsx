import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ContentProvider } from '@/contexts/ContentContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import AdminLogin from '@/components/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminSidebar from './components/AdminSidebar';
import AdminContent from './components/AdminContent';
import AdminPreview from './components/AdminPreview';
import AdminHeader from './components/AdminHeader';
import { Icon } from '@iconify/react';

export type AdminSection = 
  | 'hero' 
  | 'about' 
  | 'skills' 
  | 'projects' 
  | 'experience' 
  | 'certifications' 
  | 'contact' 
  | 'navigation' 
  | 'social';

function AuthenticatedAdminApp() {
  const { user, isAdmin, loading } = useAuth();
  const [activeSection, setActiveSection] = useState<AdminSection>('hero');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Icon icon="lucide:loader-2" className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <AdminLogin />;
  }

  return (
    <ContentProvider>
      <div className="min-h-screen bg-background text-foreground">
        <AdminHeader />
        <AdminLayout>
          <AdminSidebar 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <AdminContent 
            activeSection={activeSection}
          />
        </AdminLayout>
      </div>
    </ContentProvider>
  );
}

export default function AdminApp() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthenticatedAdminApp />
      </AuthProvider>
    </ThemeProvider>
  );
}