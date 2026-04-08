export type UserRole = 'member' | 'admin';
export type Pillar = 'nutrition' | 'sport' | 'mind';
export type PlanItemStatus = 'todo' | 'done';

export interface AuthTokenPayload {
  userId: number;
  role: UserRole;
}

export interface AuthenticatedUser {
  id: number;
  email: string;
  role: UserRole;
}

export interface DiagnosticAnswer {
  questionCode: string;
  value: number;
}

export interface PillarScore {
  pillar: Pillar;
  score: number;
}

export interface ProfileScores {
  nutritionScore: number;
  sportScore: number;
  mindScore: number;
}

export interface ContentModule {
  id: number;
  pillar: Pillar;
  title: string;
  description: string;
  durationMinutes: number;
  externalLink: string | null;
}

export interface PlanItemDraft {
  scheduledDate: string;
  pillar: Pillar;
  title: string;
  description: string;
  durationMinutes: number;
  contentId: number | null;
}
