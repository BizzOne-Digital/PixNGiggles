import express from 'express';
import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  getContactStats,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createContact);
router.get('/stats', protect, getContactStats);
router.get('/', protect, getContacts);
router.get('/:id', protect, getContact);
router.put('/:id', protect, updateContact);
router.delete('/:id', protect, deleteContact);

export default router;
