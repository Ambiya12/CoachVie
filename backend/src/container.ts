import { AuthController } from './controllers/AuthController';
import { AdminController } from './controllers/AdminController';
import { AdminRepository } from './repositories/AdminRepository';
import { UserRepository } from './repositories/UserRepository';
import { AdminService } from './services/adminService';
import { AuthService } from './services/authService';

const userRepository = new UserRepository();
const adminRepository = new AdminRepository();

const authService = new AuthService(userRepository);
const adminService = new AdminService(adminRepository);

export const container = {
  authController: new AuthController(authService),
  adminController: new AdminController(adminService),
};
