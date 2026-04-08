import type { UserRepository } from '../repositories/UserRepository';
import type { UserRole } from '../types/domain';
import { comparePassword, hashPassword } from '../utils/password';
import { signAuthToken } from '../utils/jwt';
import { ConflictError, UnauthorizedError } from '../utils/AppError';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signup(email: string, password: string, role: UserRole = 'member'): Promise<{
    user: { id: number; email: string; role: UserRole };
    token: string;
  }> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new ConflictError('Email already registered');
    }

    const passwordHash = await hashPassword(password);
    const user = await this.userRepository.createUser(email, passwordHash, role);
    const token = signAuthToken({ userId: user.id, role: user.role });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async login(email: string, password: string): Promise<{
    user: { id: number; email: string; role: UserRole };
    token: string;
  }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = signAuthToken({ userId: user.id, role: user.role });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async getCurrentUser(userId: number): Promise<{ id: number; email: string; role: UserRole }> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
