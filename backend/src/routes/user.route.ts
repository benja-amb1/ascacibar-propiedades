import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.post('/', UserController.addUser);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/session/:id', UserController.getSession);
router.get('/:id', UserController.getUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router