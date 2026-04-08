import { AuthService } from '../../services/authService';
import { UnauthorizedError } from '../../utils/AppError';

describe('AuthService', () => {
  it('signs up a new user', async () => {
    const userRepository = {
      findByEmail: jest.fn().mockResolvedValue(null),
      createUser: jest.fn().mockResolvedValue({
        id: 7,
        email: 'member@example.com',
        role: 'member',
        password_hash: 'hash',
      }),
      findById: jest.fn(),
    };

    const service = new AuthService(userRepository as never);
    const result = await service.signup('member@example.com', 'StrongPass1');

    expect(result.user.email).toBe('member@example.com');
    expect(result.token).toBeTruthy();
    expect(userRepository.createUser).toHaveBeenCalled();
  });

  it('throws on invalid login', async () => {
    const userRepository = {
      findByEmail: jest.fn().mockResolvedValue(null),
      createUser: jest.fn(),
      findById: jest.fn(),
    };

    const service = new AuthService(userRepository as never);

    await expect(service.login('missing@example.com', 'WrongPass1')).rejects.toBeInstanceOf(
      UnauthorizedError,
    );
  });
});
