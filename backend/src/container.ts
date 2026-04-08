import { AuthController } from './controllers/AuthController';
import { AdminController } from './controllers/AdminController';
import { ContentController } from './controllers/ContentController';
import { DiagnosticController } from './controllers/DiagnosticController';
import { PlanController } from './controllers/PlanController';
import { AdminRepository } from './repositories/AdminRepository';
import { ContentRepository } from './repositories/ContentRepository';
import { DiagnosticRepository } from './repositories/DiagnosticRepository';
import { PlanRepository } from './repositories/PlanRepository';
import { UserRepository } from './repositories/UserRepository';
import { AdminService } from './services/adminService';
import { AuthService } from './services/authService';
import { ContentService } from './services/contentService';
import { DiagnosticService } from './services/diagnosticService';
import { PlanService } from './services/planService';

const userRepository = new UserRepository();
const diagnosticRepository = new DiagnosticRepository();
const planRepository = new PlanRepository();
const contentRepository = new ContentRepository();
const adminRepository = new AdminRepository();

const authService = new AuthService(userRepository);
const contentService = new ContentService(contentRepository);
const planService = new PlanService(planRepository, contentRepository);
const diagnosticService = new DiagnosticService(diagnosticRepository, planService);
const adminService = new AdminService(adminRepository);

export const container = {
  authController: new AuthController(authService),
  diagnosticController: new DiagnosticController(diagnosticService),
  planController: new PlanController(planService),
  contentController: new ContentController(contentService),
  adminController: new AdminController(adminService),
};
