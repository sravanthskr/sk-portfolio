import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useContent } from '@/contexts/ContentContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

export default function AdminHeader() {
  const { theme, toggleTheme } = useTheme();
  const { isDirty, lastSaved, saving, saveToFirestore, exportData, importData, resetContent } = useContent();
  const { logout, user } = useAuth();

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-content-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          if (importData(content)) {
            alert('Content imported successfully!');
          } else {
            alert('Failed to import content. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleSave = async () => {
    const success = await saveToFirestore();
    if (success) {
      // Could show success toast here
    } else {
      alert('Failed to save content. Please try again.');
    }
  };

  const handleLogout = async () => {
    if (isDirty && !window.confirm('You have unsaved changes. Are you sure you want to log out?')) {
      return;
    }
    await logout();
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all changes? This will restore the original content and cannot be undone.')) {
      resetContent();
    }
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-primary">Portfolio CMS</h1>
          {isDirty && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400"
            >
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Unsaved changes
            </motion.div>
          )}
          {lastSaved && !isDirty && (
            <div className="text-sm text-muted-foreground">
              Last saved: {lastSaved.toLocaleTimeString()}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            disabled={!isDirty || saving}
            className="gap-2"
          >
            {saving ? (
              <>
                <Icon icon="lucide:loader-2" className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Icon icon="lucide:save" className="w-4 h-4" />
                Save to Cloud
              </>
            )}
          </Button>

          <div className="w-px h-6 bg-border" />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleExport}
            className="gap-2"
          >
            <Icon icon="lucide:download" className="w-4 h-4" />
            Export
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleImport}
            className="gap-2"
          >
            <Icon icon="lucide:upload" className="w-4 h-4" />
            Import
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="gap-2 text-destructive hover:text-destructive"
          >
            <Icon icon="lucide:rotate-ccw" className="w-4 h-4" />
            Reset
          </Button>

          <div className="w-px h-6 bg-border" />


          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Icon icon="lucide:moon" className="w-4 h-4" /> : <Icon icon="lucide:sun" className="w-4 h-4" />}
          </Button>

          <div className="w-px h-6 bg-border" />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <Icon icon="lucide:log-out" className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}