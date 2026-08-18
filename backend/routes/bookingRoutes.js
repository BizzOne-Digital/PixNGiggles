import express from 'express';
import {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getBookingStats,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/stats', protect, getBookingStats);
router.get('/', protect, getBookings);
router.get('/:id', protect, getBooking);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

export default router;
