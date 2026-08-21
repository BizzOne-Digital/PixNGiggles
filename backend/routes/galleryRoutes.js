import express from 'express';
import {
  getGallery,
  getGalleryItem,
  createGalleryItem,
  createMultipleGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
  reorderGallery,
  getGalleryStats,
} from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload, uploadMultiple, handleMulterError } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getGallery);
router.get('/stats', protect, getGalleryStats);
router.post('/multiple', protect, uploadMultiple.array('images', 10), handleMulterError, createMultipleGalleryItems);
router.put('/reorder', protect, reorderGallery);
router.get('/:id', getGalleryItem);
router.post('/', protect, upload.single('image'), handleMulterError, createGalleryItem);
router.put('/:id', protect, upload.single('image'), handleMulterError, updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

export default router;
