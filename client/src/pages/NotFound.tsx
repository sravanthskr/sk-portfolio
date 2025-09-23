import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-background to-muted/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-lg"
      >
        <Card className="p-8 sm:p-10 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 relative overflow-hidden">
          {/* Floating animation elements */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-4 right-4 opacity-10"
          >
            <Icon icon="lucide:compass" className="w-8 h-8 text-primary" />
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-8xl sm:text-9xl font-light text-primary mb-4 relative">
              4
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mx-1"
              >
                0
              </motion.span>
              4
            </div>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h1 className="text-2xl sm:text-3xl font-light mb-4">
              The Path Less Traveled
            </h1>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="italic text-lg">
                "Not all who wander are lost..."
              </p>
              <p className="text-sm">
                Sometimes the journey leads us to unexpected places. This page may not exist,
                but perhaps that's exactly where you needed to be right now — discovering that 
                even in digital spaces, there's beauty in the unknown.
              </p>
              <p className="text-xs opacity-75">
                Every great explorer knows that wrong turns often lead to the most beautiful discoveries.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="flex items-center gap-2 hover:scale-105 transition-transform"
                data-testid="button-go-back"
              >
                <Icon icon="lucide:arrow-left" className="w-4 h-4" />
                Retrace Steps
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 hover:scale-105 transition-transform"
                data-testid="button-home"
              >
                <Icon icon="lucide:home" className="w-4 h-4" />
                Return Home
              </Button>
            </div>
          </motion.div>
        </Card>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xs text-muted-foreground mt-8 space-y-2"
        >
          <p>Error 404 - The page you're seeking has yet to be written</p>
          <p className="italic opacity-60">"In the end, we will remember not the words of our enemies, but the silence of our friends." - MLK Jr.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}