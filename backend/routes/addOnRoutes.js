import express from 'express';
import {
  getAddOns,
  getAddOn,
  createAddOn,
  updateAddOn,
  deleteAddOn,
  reorderAddOns,
} from '../controllers/addOnController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getAddOns);
router.get('/:id', getAddOn);
router.post('/', protect, upload.single('image'), createAddOn);
router.put('/:id', protect, upload.single('image'), updateAddOn);
router.delete('/:id', protect, deleteAddOn);
router.put('/reorder', protect, reorderAddOns);

export default router;
