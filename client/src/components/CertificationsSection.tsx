import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';
import { useCertificationsContent } from '@/contexts/ContentContext';

export default function CertificationsSection() {
  const certificationsContent = useCertificationsContent();
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const handleCardClick = (certId: string) => {
    setFlippedCard(flippedCard === certId ? null : certId);
  };
  return (
    <section className="min-h-screen-safe section-padding section-spacing pt-20 lg:pt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-fluid-4xl lg:text-fluid-5xl font-light mb-4 sm:mb-6">{certificationsContent.title}</h2>
          <div className="w-16 sm:w-20 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {certificationsContent.certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group perspective-1000"
            >
              <div 
                className={`relative h-80 transform-style-preserve-3d transition-transform duration-1000 motion-reduce-ok cursor-pointer ${
                  flippedCard === cert.id ? 'rotate-y-180' : ''
                }`}
                onClick={() => handleCardClick(cert.id)}
              >
                {/* Front of card */}
                <Card className="absolute inset-0 p-6 backface-hidden bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover-elevate">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{cert.icon}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon icon="lucide:calendar" className="w-3 h-3" />
                        {cert.date}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>
                      
                      <div className="flex items-center gap-2 text-primary mb-4">
                        <Icon icon="lucide:award" className="w-4 h-4" />
                        <span className="text-sm font-medium">Verified Certification</span>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Credential ID: {cert.credentialId}
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mt-4 opacity-70">
                      Click to view details
                    </div>
                  </div>
                </Card>

                {/* Back of card */}
                <Card className="absolute inset-0 p-6 backface-hidden rotate-y-180 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{cert.name}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(cert.url, '_blank', 'noopener,noreferrer');
                        }}
                        className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                        data-testid={`button-verify-${cert.id}`}
                      >
                        <Icon icon="lucide:external-link" className="w-3 h-3" />
                        Verify
                      </button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Professional certification demonstrating expertise and commitment to excellence in {cert.name.toLowerCase()}.
                    </p>
                    
                    <div className="mt-auto">
                      <div className="text-xs text-muted-foreground">
                        <div>Credential ID: {cert.credentialId}</div>
                        <div className="mt-1">Issued by: {cert.issuer}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}