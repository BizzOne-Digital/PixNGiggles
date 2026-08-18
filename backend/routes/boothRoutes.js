import express from 'express';
import {
  getBooths,
  getBooth,
  createBooth,
  updateBooth,
  deleteBooth,
  reorderBooths,
} from '../controllers/boothController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getBooths);
router.get('/:id', getBooth);
router.post('/', protect, upload.single('image'), createBooth);
router.put('/:id', protect, upload.single('image'), updateBooth);
router.delete('/:id', protect, deleteBooth);
router.put('/reorder', protect, reorderBooths);

export default router;
