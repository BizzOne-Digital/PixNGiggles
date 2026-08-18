import express from 'express';
import {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getTestimonials);
router.get('/:id', getTestimonial);
router.post('/', protect, upload.single('image'), createTestimonial);
router.put('/:id', protect, upload.single('image'), updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

export default router;
