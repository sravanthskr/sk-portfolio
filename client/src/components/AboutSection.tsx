import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useAboutContent } from '@/contexts/ContentContext';

export default function AboutSection() {
  const aboutContent = useAboutContent();
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
          <h2 className="text-fluid-4xl lg:text-fluid-5xl font-light mb-4 sm:mb-6">{aboutContent.title}</h2>
          <div className="w-16 sm:w-20 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="space-y-12 lg:space-y-16">
          {/* About Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 motion-reduce-ok"
            >
              <p className="text-fluid-base lg:text-fluid-lg text-muted-foreground leading-relaxed">
                {aboutContent.description}
              </p>
              
              <p className="text-fluid-base lg:text-fluid-lg text-muted-foreground leading-relaxed">
                {aboutContent.secondParagraph}
              </p>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6">
                {aboutContent.kpiCards.map((kpi, index) => (
                  <Card key={index} className="p-4 sm:p-6 text-center hover-elevate">
                    <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">{kpi.value}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{kpi.label}</div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Skills Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative motion-reduce-ok"
            >
              <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4">Key Technologies</h3>
                  <div className="space-y-3">
                    {aboutContent.keyTechnologies.map((tech, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm sm:text-base">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="motion-reduce-ok"
          >
            <h2 className="text-fluid-4xl lg:text-fluid-5xl font-light mb-4 sm:mb-6">Education</h2>
            <div className="w-16 sm:w-20 h-1 bg-primary rounded-full mb-6 lg:mb-8" />
            
            <div className="space-y-6 lg:space-y-8">
              {aboutContent.education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="motion-reduce-ok"
                >
                  <Card className="p-4 sm:p-6 lg:p-8 hover-elevate">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                      {/* Timeline dot */}
                      <div className="hidden sm:flex flex-col items-center mt-1">
                        <div className="w-3 h-3 rounded-full bg-primary shadow-lg" />
                        {index < aboutContent.education.length - 1 && (
                          <div className="w-px h-16 bg-border mt-2" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-3">
                          <div className="min-w-0">
                            <h4 className="text-base sm:text-lg font-semibold line-clamp-2">{edu.degree}</h4>
                            <p className="text-sm sm:text-base text-primary font-medium">{edu.institution}</p>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full whitespace-nowrap">
                            {edu.period}
                          </div>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}