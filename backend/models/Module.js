const mongoose = require('mongoose');
const { getDBStatus } = require('../config/db');
const memoryStore = require('./memoryStore');

const moduleSchema = new mongoose.Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Code' },
    order: { type: Number, default: 0 },
    lessonIds: [{ type: String }],
  },
  { timestamps: true, _id: false }
);

let MongooseModule;
try {
  MongooseModule = mongoose.model('Module', moduleSchema);
} catch (e) {
  MongooseModule = mongoose.models.Module;
}

const ModuleModel = {
  find: async (query = {}) => {
    if (getDBStatus().isInMemory) return memoryStore.modules.find(query);
    return MongooseModule.find(query).sort({ order: 1 });
  },
  findOne: async (query) => {
    if (getDBStatus().isInMemory) return memoryStore.modules.findOne(query);
    return MongooseModule.findOne(query);
  },
  findById: async (id) => {
    if (getDBStatus().isInMemory) return memoryStore.modules.findById(id);
    return MongooseModule.findById(id);
  },
  create: async (data) => {
    if (getDBStatus().isInMemory) return memoryStore.modules.create(data);
    return MongooseModule.create(data);
  },
  insertMany: async (docs) => {
    if (getDBStatus().isInMemory) return memoryStore.modules.insertMany(docs);
    return MongooseModule.insertMany(docs);
  },
  countDocuments: async (query = {}) => {
    if (getDBStatus().isInMemory) return memoryStore.modules.countDocuments(query);
    return MongooseModule.countDocuments(query);
  },
};

module.exports = ModuleModel;
