import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import { asyncHandler } from '../utils/helpers.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  res.json({
    success: true,
    data: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    },
  });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.admin });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.admin._id);

  const isMatch = await bcrypt.compare(currentPassword, admin.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Current password is incorrect');
  }

  admin.password = await bcrypt.hash(newPassword, 12);
  await admin.save();

  res.json({ success: true, message: 'Password updated successfully' });
});
