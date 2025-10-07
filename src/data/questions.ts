import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'move-in',
    text: 'How long ago did you move in?',
    type: 'single',
    required: true,
    options: [
      { id: 'less-6', text: 'Less than 6 months', value: '<6months' },
      { id: '6-12', text: '6-12 months', value: '6-12months' },
      { id: '1-2', text: '1-2 years', value: '1-2years' },
      { id: '2plus', text: '2+ years', value: '2+years' },
    ],
  },
  {
    id: 'current-state',
    text: 'What did the builder leave you with?',
    type: 'single',
    required: true,
    options: [
      { id: 'turf', text: 'Just turf/grass', value: 'turf', icon: '🌱' },
      { id: 'patio', text: 'Basic patio slab', value: 'patio', icon: '⬜' },
      { id: 'gravel', text: 'Gravel and fence', value: 'gravel', icon: '🪨' },
      { id: 'nothing', text: 'Literally nothing', value: 'nothing', icon: '🏗️' },
    ],
  },
  {
    id: 'problems',
    text: "What's your biggest problem right now?",
    type: 'multiple',
    required: true,
    options: [
      { id: 'drainage', text: 'Waterlogging / Poor drainage', value: 'drainage', icon: '💧' },
      { id: 'privacy', text: 'Overlooked by neighbors', value: 'privacy', icon: '👁️' },
      { id: 'unsafe', text: 'Unsafe / Uneven for kids', value: 'unsafe', icon: '⚠️' },
      { id: 'unfinished', text: 'Looks unfinished / Cheap', value: 'unfinished', icon: '🏗️' },
      { id: 'wasted', text: 'Wasted space', value: 'wasted', icon: '📏' },
    ],
  },
  {
    id: 'dream-use',
    text: 'What would transform how you use your home?',
    type: 'single',
    required: true,
    options: [
      { id: 'dining', text: 'Outdoor dining area', value: 'dining', icon: '🍽️' },
      { id: 'play', text: 'Safe play space for children', value: 'play', icon: '🎪' },
      { id: 'sanctuary', text: 'Low-maintenance sanctuary', value: 'sanctuary', icon: '🧘' },
      { id: 'office', text: 'Home office / Garden room', value: 'office', icon: '💼' },
      { id: 'value', text: 'Property value boost', value: 'value', icon: '💰' },
    ],
  },
  {
    id: 'size',
    text: 'Garden size estimate?',
    type: 'single',
    required: true,
    options: [
      { id: 'small', text: 'Small (up to 50m²)', value: 'small' },
      { id: 'medium', text: 'Medium (50-100m²)', value: 'medium' },
      { id: 'large', text: 'Large (100m²+)', value: 'large' },
      { id: 'unsure', text: 'Not sure', value: 'unsure' },
    ],
  },
  {
    id: 'timeline',
    text: 'When are you looking to start?',
    type: 'single',
    required: true,
    options: [
      { id: 'asap', text: 'ASAP (next 3 months)', value: 'asap' },
      { id: 'planning', text: 'Planning ahead (3-6 months)', value: '3-6months' },
      { id: 'researching', text: 'Researching (6-12 months)', value: '6-12months' },
      { id: 'exploring', text: 'Just exploring', value: 'exploring' },
    ],
  },
  {
    id: 'budget',
    text: "What's your ideal investment range?",
    type: 'single',
    required: true,
    options: [
      { id: 'budget1', text: '£10k-£20k', value: '10-20k' },
      { id: 'budget2', text: '£20k-£35k', value: '20-35k' },
      { id: 'budget3', text: '£35k-£50k', value: '35-50k' },
      { id: 'budget4', text: '£50k+', value: '50k+' },
    ],
  },
  {
    id: 'postcode',
    text: 'Your postcode?',
    type: 'single',
    required: false,
    options: [
      { id: 'postcode-input', text: 'Enter postcode', value: 'input' },
    ],
  },
];
