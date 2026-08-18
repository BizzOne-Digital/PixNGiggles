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
import { upload, uploadMultiple } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getGallery);
router.get('/stats', protect, getGalleryStats);
router.get('/:id', getGalleryItem);
router.post('/', protect, upload.single('image'), createGalleryItem);
router.post('/multiple', protect, uploadMultiple.array('images', 20), createMultipleGalleryItems);
router.put('/:id', protect, upload.single('image'), updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);
router.put('/reorder', protect, reorderGallery);

export default router;
