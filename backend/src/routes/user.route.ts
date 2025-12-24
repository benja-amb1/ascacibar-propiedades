import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { CheckRoleMiddleware } from "../middlewares/checkrole.middleware";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { authLimiter } from "../utils/ratelimiter.util";

const router = Router();

router.post('/register', authLimiter, UserController.addUser);
router.post('/register-admin', authLimiter, AuthMiddleware, CheckRoleMiddleware('admin'), authLimiter, UserController.addAdmin);
router.post('/login', authLimiter, UserController.login);
router.post('/logout', UserController.logout);
router.get('/session/:id', AuthMiddleware, UserController.getSession);
router.get('/:id', AuthMiddleware, UserController.getUser);
router.patch('/:id', AuthMiddleware, UserController.updateUser);
router.delete('/:id', AuthMiddleware, UserController.deleteUser);

export default router