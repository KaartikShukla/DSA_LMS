const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dsa_lms_jwt_key_2026_production';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role === 'instructor' ? 'instructor' : 'student',
      completedLessons: [],
      starredLessons: [],
    });

    const token = generateToken(user);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        completedLessons: user.completedLessons,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        completedLessons: user.completedLessons || [],
        starredLessons: user.starredLessons || [],
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      completedLessons: user.completedLessons || [],
      starredLessons: user.starredLessons || [],
      progress: user.progress,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

// Demo quick-login for convenient evaluation
exports.demoLogin = async (req, res) => {
  try {
    const role = req.body.role === 'instructor' ? 'instructor' : 'student';
    const email = role === 'instructor' ? 'teacher@dsalms.edu' : 'student@dsalms.edu';
    const name = role === 'instructor' ? 'Prof. Alan Turing' : 'Alex Learner';

    let user = await User.findOne({ email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        completedLessons: ['lesson_binary_search'],
        starredLessons: [],
      });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        completedLessons: user.completedLessons || [],
        starredLessons: user.starredLessons || [],
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Demo login error' });
  }
};
