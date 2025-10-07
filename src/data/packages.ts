import { Package } from '../types';

export const packages: Record<string, Package> = {
  'essential-upgrade': {
    name: 'Essential Upgrade Package',
    description: 'Perfect for gardens that need finishing touches',
    priceRange: '£10,000 - £20,000',
    timeline: '3-4 weeks',
    features: [
      'Professional landscaping design',
      'Quality patio or decking',
      'Planting scheme',
      'Lighting installation',
      'Turfing or artificial grass',
    ],
  },
  'premium-enhancement': {
    name: 'Premium Enhancement Package',
    description: 'Transform your garden into a stunning outdoor living space',
    priceRange: '£20,000 - £35,000',
    timeline: '4-6 weeks',
    features: [
      'Bespoke garden design with 3D visualization',
      'Premium patio with porcelain tiles',
      'Outdoor kitchen or dining area',
      'Privacy screening and mature planting',
      'Drainage correction included',
      'Ambient lighting system',
    ],
  },
  'complete-transformation': {
    name: 'Complete Transformation Package',
    description: 'A blank canvas deserves a masterpiece',
    priceRange: '£35,000 - £50,000',
    timeline: '6-8 weeks',
    features: [
      'Full architectural garden design',
      'Multi-zone outdoor living spaces',
      'Premium materials throughout',
      'Outdoor kitchen with appliances',
      'Water features or fire pit',
      'Complete drainage system',
      'Automated irrigation',
      'Professional landscape lighting',
    ],
  },
  'comprehensive-build': {
    name: 'Comprehensive Build Package',
    description: 'The ultimate outdoor transformation',
    priceRange: '£50,000+',
    timeline: '8-12 weeks',
    features: [
      'Award-winning bespoke design',
      'Garden room or covered structure',
      'Luxury outdoor kitchen',
      'Premium hardscaping materials',
      'Water features and fire elements',
      'Full smart irrigation system',
      'Comprehensive lighting design',
      'Mature planting and landscaping',
      'Ongoing maintenance plan',
    ],
  },
};
