import { Router } from "express";
import { PropertyController } from "../controllers/property.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.get('/', PropertyController.getProperties);
router.post('/', upload.array('image', 10), PropertyController.addProperty);

export default router