import express from 'express';
import {
  getSettings,
  updateSettings,
  uploadSettingsImage,
  getDashboardStats,
} from '../controllers/settingsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getSettings);
router.get('/dashboard', protect, getDashboardStats);
router.put('/', protect, updateSettings);
router.post('/upload', protect, upload.single('image'), uploadSettingsImage);

export default router;
