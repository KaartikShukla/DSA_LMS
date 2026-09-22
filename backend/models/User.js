const mongoose = require('mongoose');
const { getDBStatus } = require('../config/db');
const memoryStore = require('./memoryStore');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
    completedLessons: [{ type: String }],
    starredLessons: [{ type: String }],
    progress: {
      totalTimeSpentMinutes: { type: Number, default: 0 },
      stepsExecutedCount: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

let MongooseUser;
try {
  MongooseUser = mongoose.model('User', userSchema);
} catch (e) {
  MongooseUser = mongoose.models.User;
}

const UserModel = {
  find: async (query) => {
    if (getDBStatus().isInMemory) return memoryStore.users.find(query);
    return MongooseUser.find(query);
  },
  findOne: async (query) => {
    if (getDBStatus().isInMemory) return memoryStore.users.findOne(query);
    return MongooseUser.findOne(query);
  },
  findById: async (id) => {
    if (getDBStatus().isInMemory) return memoryStore.users.findById(id);
    return MongooseUser.findById(id);
  },
  create: async (data) => {
    if (getDBStatus().isInMemory) return memoryStore.users.create(data);
    return MongooseUser.create(data);
  },
  findByIdAndUpdate: async (id, update, options) => {
    if (getDBStatus().isInMemory) return memoryStore.users.findByIdAndUpdate(id, update, options);
    return MongooseUser.findByIdAndUpdate(id, update, options);
  },
  countDocuments: async (query) => {
    if (getDBStatus().isInMemory) return memoryStore.users.countDocuments(query);
    return MongooseUser.countDocuments(query);
  },
};

module.exports = UserModel;
