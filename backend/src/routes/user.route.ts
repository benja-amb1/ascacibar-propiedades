import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { CheckRoleMiddleware } from "../middlewares/checkrole.middleware";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post('/register', UserController.addUser);
router.post('/register-admin', AuthMiddleware, CheckRoleMiddleware('admin'), UserController.addAdmin);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/session/:id', AuthMiddleware, UserController.getSession);
router.get('/:id', AuthMiddleware, UserController.getUser);
router.patch('/:id', AuthMiddleware, UserController.updateUser);
router.delete('/:id', AuthMiddleware, UserController.deleteUser);

export default router