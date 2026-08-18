import express from 'express';
import { uploadImage, uploadMultipleImages } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload, uploadMultiple } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.single('image'), uploadImage);
router.post('/multiple', protect, uploadMultiple.array('images', 20), uploadMultipleImages);

export default router;
