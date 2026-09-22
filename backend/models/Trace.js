const mongoose = require('mongoose');
const { getDBStatus } = require('../config/db');
const memoryStore = require('./memoryStore');

const traceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userId: { type: String },
    userCode: { type: String, required: true },
    language: { type: String, default: 'javascript' },
    inputData: { type: mongoose.Schema.Types.Mixed },
    steps: [{ type: mongoose.Schema.Types.Mixed }],
    shared: { type: Boolean, default: false },
  },
  { timestamps: true }
);

let MongooseTrace;
try {
  MongooseTrace = mongoose.model('Trace', traceSchema);
} catch (e) {
  MongooseTrace = mongoose.models.Trace;
}

const TraceModel = {
  find: async (query = {}) => {
    if (getDBStatus().isInMemory) return memoryStore.traces.find(query);
    return MongooseTrace.find(query);
  },
  findOne: async (query) => {
    if (getDBStatus().isInMemory) return memoryStore.traces.findOne(query);
    return MongooseTrace.findOne(query);
  },
  findById: async (id) => {
    if (getDBStatus().isInMemory) return memoryStore.traces.findById(id);
    return MongooseTrace.findById(id);
  },
  create: async (data) => {
    if (getDBStatus().isInMemory) return memoryStore.traces.create(data);
    return MongooseTrace.create(data);
  },
};

module.exports = TraceModel;
