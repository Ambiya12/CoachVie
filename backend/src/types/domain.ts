export type UserRole = 'member' | 'admin';

export interface AuthTokenPayload {
  userId: number;
  role: UserRole;
}

export interface AuthenticatedUser {
  id: number;
  email: string;
  role: UserRole;
}
