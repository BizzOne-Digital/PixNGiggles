import express from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  reorderServices,
} from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getService);
router.post('/', protect, upload.single('image'), createService);
router.put('/:id', protect, upload.single('image'), updateService);
router.delete('/:id', protect, deleteService);
router.put('/reorder', protect, reorderServices);

export default router;
