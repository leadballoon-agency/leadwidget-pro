import { Answer, AssessmentResult } from '../types';
import { packages } from '../data/packages';
import { ClientConfig } from '../config/clients';

export function calculateScore(answers: Answer[]): AssessmentResult {
  let score = 10;
  const problems: string[] = [];

  // Get answer values
  const moveIn = getAnswerValue(answers, 'move-in');
  const currentState = getAnswerValue(answers, 'current-state');
  const problemsSelected = getAnswerValue(answers, 'problems') as string[];
  const budget = getAnswerValue(answers, 'budget');
  const size = getAnswerValue(answers, 'size');

  // Score deductions based on problems
  if (problemsSelected?.includes('drainage')) {
    score -= 2.0;
    problems.push('Poor drainage');
  }
  if (problemsSelected?.includes('privacy')) {
    score -= 1.5;
    problems.push('Lack of privacy');
  }
  if (problemsSelected?.includes('unfinished')) {
    score -= 2.0;
    problems.push('Unfinished appearance');
  }
  if (problemsSelected?.includes('unsafe')) {
    score -= 1.5;
    problems.push('Safety concerns');
  }
  if (problemsSelected?.includes('wasted')) {
    score -= 1.0;
    problems.push('Wasted space');
  }

  // Additional deductions based on current state and move-in time
  if (currentState === 'turf' && moveIn === '<6months') {
    score -= 1.5;
  } else if (currentState === 'turf' && moveIn === '6-12months') {
    score -= 1.0;
  }

  if (currentState === 'nothing') {
    score -= 2.5;
    problems.push('No existing landscaping');
  }

  // Keep score in valid range
  score = Math.max(0, Math.min(10, score));

  // Determine drainage risk
  const drainageRisk = calculateDrainageRisk(problemsSelected, moveIn, currentState);

  // Determine privacy score
  const privacyScore = problemsSelected?.includes('privacy') ? 'low' :
                       size === 'small' ? 'medium' : 'high';

  // Calculate value gap
  const valueGap = calculateValueGap(budget);

  // Determine recommended package
  const recommendedPackage = determinePackage(score);

  // Determine score label
  const scoreLabel = getScoreLabel(score);

  return {
    score: Math.round(score * 10) / 10,
    scoreLabel,
    drainageRisk,
    privacyScore,
    valueGap,
    recommendedPackage,
    problems,
  };
}

function getAnswerValue(answers: Answer[], questionId: string): string | string[] | undefined {
  const answer = answers.find(a => a.questionId === questionId);
  return answer?.value;
}

function calculateDrainageRisk(
  problems: string[] | undefined,
  moveIn: string | string[] | undefined,
  currentState: string | string[] | undefined
): 'low' | 'medium' | 'high' {
  const hasDrainageIssue = problems?.includes('drainage');
  const recentMoveIn = moveIn === '<6months' || moveIn === '6-12months';
  const justTurf = currentState === 'turf';

  if (hasDrainageIssue && recentMoveIn && justTurf) {
    return 'high';
  } else if (hasDrainageIssue || (recentMoveIn && justTurf)) {
    return 'medium';
  }
  return 'low';
}

function calculateValueGap(budget: string | string[] | undefined): string {
  // Property value increase is typically 1.5-2x the landscaping investment
  const budgetMap: Record<string, string> = {
    '10-20k': '£18,000 - £40,000',
    '20-35k': '£35,000 - £70,000',
    '35-50k': '£60,000 - £100,000',
    '50k+': '£100,000 - £150,000+',
  };

  return budgetMap[budget as string] || '£20,000 - £40,000';
}

function determinePackage(score: number) {
  if (score >= 8) {
    return packages['essential-upgrade'];
  } else if (score >= 6) {
    return packages['premium-enhancement'];
  } else if (score >= 4) {
    return packages['complete-transformation'];
  } else {
    return packages['comprehensive-build'];
  }
}

function getScoreLabel(score: number): string {
  if (score >= 8) {
    return 'Finishing Touches Needed';
  } else if (score >= 6) {
    return 'Quick Wins Available';
  } else if (score >= 4) {
    return 'Blank Canvas';
  } else {
    return 'Urgent Attention Required';
  }
}

export function generateWhatsAppMessage(
  result: AssessmentResult,
  answers: Answer[],
  client: ClientConfig
): string {
  const budget = getAnswerValue(answers, 'budget');
  const timeline = getAnswerValue(answers, 'timeline');
  const postcode = getAnswerValue(answers, 'postcode');

  const budgetMap: Record<string, string> = {
    '10-20k': '£10k-£20k',
    '20-35k': '£20k-£35k',
    '35-50k': '£35k-£50k',
    '50k+': '£50k+',
  };

  const timelineMap: Record<string, string> = {
    'asap': 'ASAP (next 3 months)',
    '3-6months': 'Planning ahead (3-6 months)',
    '6-12months': 'Researching (6-12 months)',
    'exploring': 'Just exploring',
  };

  const message = `Hi! I just completed the garden assessment.

My Score: ${result.score}/10
Issues: ${result.problems.join(', ')}
Budget: ${budgetMap[budget as string] || 'Not specified'}
Timeline: ${timelineMap[timeline as string] || 'Not specified'}
${postcode ? `Postcode: ${postcode}` : ''}

Here's a photo of my garden:`;

  return message;
}

export function generateWhatsAppURL(
  result: AssessmentResult,
  answers: Answer[],
  client: ClientConfig
): string {
  const message = generateWhatsAppMessage(result, answers, client);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${client.contact.whatsapp}?text=${encodedMessage}`;
}
