const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { sendOtpEmail } = require('../utils/email');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP for signup
router.post('/send-otp', [
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').isMobilePhone().withMessage('Valid phone number required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, phone } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    if (!user) {
      user = await User.create({ email, phone, otp, otpExpiresAt, isVerified: false });
    } else {
      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
      user.isVerified = false;
      await user.save();
    }

    await sendOtpEmail(email, otp);
    res.json({ message: 'OTP sent' });
  } catch (error) {
    console.error('OTP send error', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP and complete signup
router.post('/verify-otp', [
  body('email').isEmail(),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  body('fullName').isLength({ min: 3 }).withMessage('Full name is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, otp, fullName, password, phone } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.otp !== otp || user.otpExpiresAt < new Date()) return res.status(400).json({ message: 'Invalid or expired OTP' });

    const passwordHash = await bcrypt.hash(password, 10);

    user.fullName = fullName;
    user.passwordHash = passwordHash;
    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    user.phone = phone || user.phone;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error('OTP verify error', error);
    res.status(500).json({ message: 'Verification failed' });
  }
});

// User login
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.isVerified) return res.status(401).json({ message: 'Invalid login or unverified user' });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(401).json({ message: 'Invalid login credentials' });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
}

module.exports = { router, authenticateToken };
