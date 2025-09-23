import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useSkillsContent } from '@/contexts/ContentContext';
import { Icon } from '@iconify/react';

const categoryIcons: Record<string, string> = {
  'Frontend': 'lucide:code',
  'Backend': 'lucide:server',
  'Tools & Technologies': 'lucide:cloud',
  'Design & UX': 'lucide:palette',
};

const categoryColors: Record<string, string> = {
  'Frontend': 'from-blue-500/20 to-purple-500/20',
  'Backend': 'from-green-500/20 to-teal-500/20',
  'Tools & Technologies': 'from-orange-500/20 to-red-500/20',
  'Design & UX': 'from-pink-500/20 to-purple-500/20',
};

const categoryIconColors: Record<string, string> = {
  'Frontend': 'text-blue-500',
  'Backend': 'text-green-500',
  'Tools & Technologies': 'text-orange-500',
  'Design & UX': 'text-pink-500',
};

export default function SkillsSection() {
  const skillsContent = useSkillsContent();
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
          <h2 className="text-fluid-4xl lg:text-fluid-5xl font-light mb-4 sm:mb-6">{skillsContent.title}</h2>
          <div className="w-16 sm:w-20 h-1 bg-primary rounded-full" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {skillsContent.categories.map((category, index) => {
            const iconName = categoryIcons[category.name] || 'lucide:code';
            const color = categoryColors[category.name] || categoryColors['Frontend'];
            const iconColor = categoryIconColors[category.name] || categoryIconColors['Frontend'];
            
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="motion-reduce-ok"
              >
                <Card className={`p-4 sm:p-6 h-full bg-gradient-to-br ${color} border-primary/10 hover-elevate`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${iconColor.replace('text-', 'bg-')}/10`}>
                      <Icon icon={iconName} className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-base lg:text-lg">{category.name}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.skills.map((skill) => (
                      <div 
                        key={skill}
                        className="text-xs sm:text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border/50"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}