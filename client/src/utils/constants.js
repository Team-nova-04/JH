/**
 * Application Constants
 */

export const USER_TYPES = {
  CITIZEN: 'citizen',
  AUTHORITY: 'authority',
  ADMIN: 'admin',
};

export const COMPLAINT_STATUS = {
  PENDING: 'pending',
  SEEN: 'seen',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
};

export const COMPLAINT_CATEGORIES = [
  'water issue',
  'electricity issue',
  'road issue',
  'garbage issue',
  'safety hazard',
  'environmental issue',
];

export const AUTHORITY_ROLES = {
  MUNICIPAL_COUNCIL: 'municipal_council',
  WATER_BOARD: 'water_board',
  CEB: 'ceb',
  RDA: 'rda',
  POLICE_SAFETY: 'police_safety',
  DISASTER_MANAGEMENT: 'disaster_management',
};

export const AUTHORITY_LABELS = {
  municipal_council: 'Municipal Council',
  water_board: 'Water Board',
  ceb: 'CEB (Electricity)',
  rda: 'RDA (Roads)',
  police_safety: 'Police & Safety',
  disaster_management: 'Disaster Management',
};

export const STATUS_LABELS = {
  pending: 'Pending',
  seen: 'Seen',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

export const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  seen: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-purple-100 text-purple-800',
  resolved: 'bg-green-100 text-green-800',
};

export const URGENCY_LABELS = {
  critical: 'Critical',
  urgent: 'Urgent',
  normal: 'Normal',
};

export const URGENCY_COLORS = {
  critical: 'bg-red-100 text-red-800 border-red-300',
  urgent: 'bg-orange-100 text-orange-800 border-orange-300',
  normal: 'bg-gray-100 text-gray-800 border-gray-300',
};

export const getUrgencyLevel = (score) => {
  if (score >= 0.9) return 'critical';
  if (score >= 0.7) return 'urgent';
  return 'normal';
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

