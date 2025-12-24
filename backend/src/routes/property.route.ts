import { Router } from "express";
import { PropertyController } from "../controllers/property.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.get('/', PropertyController.getProperties);
router.post('/', upload.array('image', 10), PropertyController.addProperty);
router.get('/:id', PropertyController.getProperty);
router.patch('/:id', upload.array('image', 10), PropertyController.updateProperty);
router.delete('/:id', PropertyController.deleteProperty);

export default router