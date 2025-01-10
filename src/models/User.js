const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: Date,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationExpires: Date,
  socialLogins: {
    google: {
      id: String,
      email: String,
      name: String,
    },
    facebook: {
      id: String,
      email: String,
      name: String,
    },
  },
});

// Add indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ resetPasswordToken: 1 });
userSchema.index({ verificationToken: 1 });

module.exports = mongoose.model('User', userSchema);
