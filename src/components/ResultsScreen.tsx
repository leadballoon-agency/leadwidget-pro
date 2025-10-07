import { motion } from 'framer-motion';
import { AssessmentResult } from '../types';
import { generateWhatsAppMessage } from '../utils/scoring';
import { useAssessmentStore } from '../store/assessmentStore';

interface ResultsScreenProps {
  result: AssessmentResult;
}

export default function ResultsScreen({ result }: ResultsScreenProps) {
  const answers = useAssessmentStore(state => state.answers);

  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage(result, answers);
    const whatsappUrl = `https://wa.me/447553035444?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yc-blue';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-yc-cream px-4 py-8"
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Score Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-yc shadow-yc-card p-8 text-center"
        >
          <h2 className="text-xl text-yc-gray mb-2">Your Garden Score</h2>
          <div className={`text-7xl font-bold ${getScoreColor(result.score)} mb-2`}>
            {result.score}
            <span className="text-4xl">/10</span>
          </div>
          <p className="text-2xl font-semibold text-yc-charcoal">{result.scoreLabel}</p>
        </motion.div>

        {/* Problems Detected */}
        {result.problems.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-yc shadow-yc-card p-6"
          >
            <h3 className="text-xl font-semibold text-yc-charcoal mb-4">
              ⚠️ Issues Detected
            </h3>
            <div className="space-y-3">
              {result.problems.map((problem, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  <span className="text-orange-600">•</span>
                  <span className="text-yc-charcoal">{problem}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Risk Assessments */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <div className={`p-4 rounded-lg border ${getRiskColor(result.drainageRisk)}`}>
            <div className="font-semibold mb-1">Drainage Risk</div>
            <div className="text-sm capitalize">{result.drainageRisk}</div>
            {result.drainageRisk === 'high' && (
              <div className="text-xs mt-2">
                73% of new builds in Yorkshire have inadequate drainage
              </div>
            )}
          </div>
          <div className="p-4 rounded-lg border bg-blue-50 border-blue-200 text-blue-800">
            <div className="font-semibold mb-1">Potential Value Add</div>
            <div className="text-sm">{result.valueGap}</div>
            <div className="text-xs mt-2">Based on typical property improvements</div>
          </div>
        </motion.div>

        {/* Recommended Package */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-yc-blue to-blue-600 text-white rounded-yc shadow-lg p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-sm opacity-90 mb-1">Recommended Solution</div>
              <h3 className="text-2xl font-bold">{result.recommendedPackage.name}</h3>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Investment</div>
              <div className="font-bold">{result.recommendedPackage.priceRange}</div>
            </div>
          </div>
          <p className="opacity-90 mb-4">{result.recommendedPackage.description}</p>
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="text-sm font-semibold mb-2">What's Included:</div>
            <ul className="space-y-1 text-sm">
              {result.recommendedPackage.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="opacity-75">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm opacity-75">
            Timeline: {result.recommendedPackage.timeline}
          </div>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-yc shadow-yc-card p-8 text-center space-y-4"
        >
          <h3 className="text-2xl font-bold text-yc-charcoal">
            Ready for Your Personalized Plan?
          </h3>
          <p className="text-yc-gray">
            Send us a photo of your garden via WhatsApp and we'll provide:
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center text-sm text-yc-gray">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Your design options</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Accurate quote</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Next available dates</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWhatsAppClick}
            className="touch-target bg-whatsapp text-white text-lg font-semibold px-8 py-4 rounded-yc shadow-yc-button hover:bg-whatsapp/90 transition-colors inline-flex items-center gap-3"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Send Photo via WhatsApp</span>
          </motion.button>
          <p className="text-sm text-yc-gray">
            💬 Response within 2 hours (Mon-Fri, 9am-6pm)
          </p>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-yc-gold/10 border border-yc-gold/30 rounded-yc p-6 text-center"
        >
          <div className="text-3xl mb-2">🏆</div>
          <div className="font-bold text-yc-charcoal mb-1">
            Award-Winning Service
          </div>
          <div className="text-sm text-yc-gray">
            Landscaper of the Year 2024 • 20+ Years Experience • 500+ Gardens Transformed
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
