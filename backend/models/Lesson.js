const mongoose = require('mongoose');
const { getDBStatus } = require('../config/db');
const memoryStore = require('./memoryStore');

const lessonSchema = new mongoose.Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    moduleId: { type: String, required: true },
    category: {
      type: String,
      enum: ['searching', 'sorting', 'linked_list', 'stack', 'queue', 'tree', 'graph', 'dp'],
      required: true,
    },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    summary: { type: String, required: true },
    theory: { type: String, required: true },
    timeComplexity: {
      best: { type: String, default: 'O(1)' },
      average: { type: String, default: 'O(n)' },
      worst: { type: String, default: 'O(n)' },
    },
    spaceComplexity: { type: String, default: 'O(1)' },
    codeSnippet: { type: String, required: true },
    defaultInput: { type: mongoose.Schema.Types.Mixed },
    algorithmKey: { type: String, required: true },
    teachingPoints: [{ type: String }],
    quizQuestions: [
      {
        question: String,
        options: [String],
        correctAnswer: Number,
        explanation: String,
      },
    ],
  },
  { timestamps: true, _id: false }
);

let MongooseLesson;
try {
  MongooseLesson = mongoose.model('Lesson', lessonSchema);
} catch (e) {
  MongooseLesson = mongoose.models.Lesson;
}

const LessonModel = {
  find: async (query = {}) => {
    if (getDBStatus().isInMemory) return memoryStore.lessons.find(query);
    return MongooseLesson.find(query);
  },
  findOne: async (query) => {
    if (getDBStatus().isInMemory) return memoryStore.lessons.findOne(query);
    return MongooseLesson.findOne(query);
  },
  findById: async (id) => {
    if (getDBStatus().isInMemory) return memoryStore.lessons.findById(id);
    return MongooseLesson.findById(id);
  },
  create: async (data) => {
    if (getDBStatus().isInMemory) return memoryStore.lessons.create(data);
    return MongooseLesson.create(data);
  },
  insertMany: async (docs) => {
    if (getDBStatus().isInMemory) return memoryStore.lessons.insertMany(docs);
    return MongooseLesson.insertMany(docs);
  },
  countDocuments: async (query = {}) => {
    if (getDBStatus().isInMemory) return memoryStore.lessons.countDocuments(query);
    return MongooseLesson.countDocuments(query);
  },
};

module.exports = LessonModel;
