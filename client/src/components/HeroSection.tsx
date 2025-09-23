import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useHeroContent } from "@/contexts/ContentContext";

interface HeroSectionProps {
  onScrollToNext: () => void;
}

export default function HeroSection({ onScrollToNext }: HeroSectionProps) {
  const heroContent = useHeroContent();
  return (
    <section className="min-h-screen-safe flex items-center justify-center relative overflow-hidden safe-top">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('/images/hero-background.png')`,
        }}
      />
      {/* Light overlay for subtle background */}
      <div className="absolute inset-0 z-0 bg-background/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center pl-8 pr-2 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="motion-reduce-ok"
        >
          <h1 className="text-fluid-5xl lg:text-fluid-6xl font-light mb-4 sm:mb-6 tracking-tight">
            <span className="text-primary font-medium">
              {heroContent.title.first}
            </span>{" "}
            <span className="text-foreground">{heroContent.title.last}</span>
          </h1>

          <motion.p
            className="text-fluid-lg lg:text-fluid-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed motion-reduce-ok"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full motion-reduce-ok"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-lg flex justify-center"
            >
              <Button
                size="default"
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg min-h-[38px] sm:min-h-[42px] md:min-h-[44px] relative overflow-hidden group"
                data-testid="button-my-resume"
                onClick={() => {
                  if (heroContent.buttons.primary.url) {
                    window.open(heroContent.buttons.primary.url, "_blank");
                  }
                }}
              >
                <motion.span
                  className="relative z-10"
                  initial={{ y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {heroContent.buttons.primary.text}
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/30 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 origin-left"
                  transition={{ duration: 0.2 }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={onScrollToNext}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full border border-border bg-background/80 backdrop-blur-sm hover-elevate min-h-[44px] min-w-[44px] motion-reduce-ok"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        data-testid="button-scroll-down"
        aria-label="Scroll to next section"
      >
        <Icon
          icon="lucide:chevron-down"
          className="w-5 h-5 text-muted-foreground"
        />
      </motion.button>
    </section>
  );
}
