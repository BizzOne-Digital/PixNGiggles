import express from 'express';
import { getFAQs, getFAQ, createFAQ, updateFAQ, deleteFAQ } from '../controllers/faqController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getFAQs);
router.get('/:id', getFAQ);
router.post('/', protect, createFAQ);
router.put('/:id', protect, updateFAQ);
router.delete('/:id', protect, deleteFAQ);

export default router;
