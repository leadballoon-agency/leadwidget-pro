import { motion } from 'framer-motion';
import { useClient } from '../context/ClientContext';

interface HeroScreenProps {
  onStart: () => void;
}

export default function HeroScreen({ onStart }: HeroScreenProps) {
  const { client } = useClient();
  const { branding, customization } = client;

  // Parse headline for line breaks
  const headlineLines = (customization?.heroHeadline || 'Is Your New Build Garden\nCosting You £20k?')
    .split('\n');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-brand-cream to-white"
    >
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Award Badge */}
        {branding.award && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/30 rounded-full px-4 py-2 text-sm font-medium text-brand-charcoal"
          >
            <span className="text-lg">🏆</span>
            <span>{branding.award}</span>
          </motion.div>
        )}

        {/* Main Headline */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-brand-charcoal leading-tight"
        >
          {headlineLines[0]}
          {headlineLines[1] && (
            <>
              <br />
              <span className="text-brand-primary">{headlineLines[1]}</span>
            </>
          )}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-brand-gray leading-relaxed"
        >
          {customization?.heroSubheadline || 'Find out what your garden really needs and what it could be worth.'}
          <br />
          <span className="font-medium text-brand-charcoal">Takes just 60 seconds.</span>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="bg-brand-primary text-white text-lg font-semibold px-12 py-4 rounded-yc shadow-lg hover:opacity-90 transition-opacity min-h-[56px]"
          >
            {customization?.ctaText || 'Start Assessment'}
          </motion.button>
        </motion.div>

        {/* Trust Elements */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6 text-sm text-yc-gray pt-4"
        >
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>No email required</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Free consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>20+ years experience</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
