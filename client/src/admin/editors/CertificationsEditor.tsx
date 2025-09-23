import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useContent } from '@/contexts/ContentContext';

export default function CertificationsEditor() {
  const { content, updateContent } = useContent();
  const certifications = content.certifications;

  const addCertification = () => {
    const newCertification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      icon: '🏆',
      credentialId: '',
      url: ''
    };
    const updatedCertifications = [...certifications.certifications, newCertification];
    updateContent('certifications.certifications', updatedCertifications);
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = certifications.certifications.filter((_, i) => i !== index);
    updateContent('certifications.certifications', updatedCertifications);
  };

  const updateCertification = (index: number, field: string, value: any) => {
    const updatedCertifications = [...certifications.certifications];
    (updatedCertifications[index] as any)[field] = value;
    updateContent('certifications.certifications', updatedCertifications);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Certifications Section</h2>
        <p className="text-muted-foreground">
          Manage your professional certifications and achievements.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Section Title</h3>
          <div>
            <Label htmlFor="certifications-title">Title</Label>
            <Input
              id="certifications-title"
              value={certifications.title}
              onChange={(e) => updateContent('certifications.title', e.target.value)}
              placeholder="Certifications & Achievements"
              className="mt-2"
            />
          </div>
        </Card>

        {/* Certifications */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Certifications</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addCertification}
              className="gap-2"
            >
              <Icon icon="lucide:plus" className="w-4 h-4" />
              Add Certification
            </Button>
          </div>
          
          <div className="space-y-6">
            {certifications.certifications.map((cert, certIndex) => (
              <Card key={cert.id} className="p-6 border-dashed">
                <div className="flex items-start justify-between mb-6">
                  <h4 className="font-medium">Certification #{certIndex + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCertification(certIndex)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Icon icon="lucide:trash-2" className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Basic Certification Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`cert-name-${certIndex}`}>Certification Name</Label>
                      <Input
                        id={`cert-name-${certIndex}`}
                        value={cert.name}
                        onChange={(e) => updateCertification(certIndex, 'name', e.target.value)}
                        placeholder="AWS Certified Solutions Architect"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`cert-issuer-${certIndex}`}>Issuing Organization</Label>
                      <Input
                        id={`cert-issuer-${certIndex}`}
                        value={cert.issuer}
                        onChange={(e) => updateCertification(certIndex, 'issuer', e.target.value)}
                        placeholder="Amazon Web Services"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`cert-date-${certIndex}`}>Issue Date</Label>
                      <Input
                        id={`cert-date-${certIndex}`}
                        value={cert.date}
                        onChange={(e) => updateCertification(certIndex, 'date', e.target.value)}
                        placeholder="March 2024"
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Format: "Month Year" (e.g., "March 2024")
                      </p>
                    </div>
                    <div>
                      <Label htmlFor={`cert-icon-${certIndex}`}>Icon/Emoji</Label>
                      <Input
                        id={`cert-icon-${certIndex}`}
                        value={cert.icon}
                        onChange={(e) => updateCertification(certIndex, 'icon', e.target.value)}
                        placeholder="🏆"
                        className="mt-2"
                        maxLength={2}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Single emoji or icon character
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`cert-credential-${certIndex}`}>Credential ID</Label>
                      <Input
                        id={`cert-credential-${certIndex}`}
                        value={cert.credentialId}
                        onChange={(e) => updateCertification(certIndex, 'credentialId', e.target.value)}
                        placeholder="AWS-SAA-123456789"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`cert-url-${certIndex}`}>Verification URL</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id={`cert-url-${certIndex}`}
                          value={cert.url}
                          onChange={(e) => updateCertification(certIndex, 'url', e.target.value)}
                          placeholder="https://verify.certification.com/123456"
                        />
                        {cert.url && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => window.open(cert.url, '_blank')}
                          >
                            <Icon icon="lucide:external-link" className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        URL where certification can be verified
                      </p>
                    </div>
                  </div>

                  {/* Preview Card */}
                  <div className="mt-6 p-4 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{cert.icon}</div>
                      <div className="flex-1">
                        <h5 className="font-medium">{cert.name || 'Certification Name'}</h5>
                        <p className="text-sm text-muted-foreground">{cert.issuer || 'Issuing Organization'}</p>
                        <p className="text-xs text-muted-foreground">{cert.date || 'Issue Date'}</p>
                      </div>
                      {cert.url && (
                        <div className="text-xs text-primary">Verifiable</div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {certifications.certifications.length === 0 && (
              <Card className="p-8 border-dashed text-center">
                <p className="text-muted-foreground mb-4">No certifications yet</p>
                <Button onClick={addCertification} variant="outline" className="gap-2">
                  <Icon icon="lucide:plus" className="w-4 h-4" />
                  Add Your First Certification
                </Button>
              </Card>
            )}
          </div>
        </Card>

        {/* Tips Card */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-lg font-medium mb-3">🎓 Certification Tips</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>Name:</strong> Use the official certification name as it appears on your certificate</p>
            <p>• <strong>Issuer:</strong> Include the full name of the certifying organization</p>
            <p>• <strong>Date:</strong> Use the issue date, not expiration date (unless it's current validity)</p>
            <p>• <strong>Verification:</strong> Include verification URLs when available to build credibility</p>
            <p>• <strong>Icons:</strong> Use relevant emojis like 🏆, 🎓, ⭐, 🏅, or brand-specific icons</p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}