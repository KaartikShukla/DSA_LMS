// In-memory data store providing seamless zero-config operation
const { v4: uuidv4 } = require('crypto');

class MemoryCollection {
  constructor(name) {
    this.name = name;
    this.data = [];
  }

  async find(query = {}) {
    return this.data.filter((item) => {
      for (const [key, value] of Object.entries(query)) {
        if (item[key] !== value) return false;
      }
      return true;
    });
  }

  async findOne(query = {}) {
    return this.data.find((item) => {
      for (const [key, value] of Object.entries(query)) {
        if (item[key] !== value) return false;
      }
      return true;
    }) || null;
  }

  async findById(id) {
    return this.data.find((item) => item._id === id || item.id === id) || null;
  }

  async create(doc) {
    const newDoc = {
      _id: doc._id || Math.random().toString(36).substring(2, 11),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...doc,
    };
    this.data.push(newDoc);
    return newDoc;
  }

  async insertMany(docs) {
    const created = docs.map((doc) => ({
      _id: doc._id || Math.random().toString(36).substring(2, 11),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...doc,
    }));
    this.data.push(...created);
    return created;
  }

  async findByIdAndUpdate(id, update, options = { new: true }) {
    const index = this.data.findIndex((item) => item._id === id || item.id === id);
    if (index === -1) return null;
    const current = this.data[index];
    const updated = {
      ...current,
      ...(update.$set || update),
      updatedAt: new Date(),
    };
    if (update.$addToSet) {
      for (const [field, val] of Object.entries(update.$addToSet)) {
        if (!Array.isArray(updated[field])) updated[field] = [];
        if (!updated[field].includes(val)) updated[field].push(val);
      }
    }
    this.data[index] = updated;
    return updated;
  }

  async deleteOne(query) {
    const index = this.data.findIndex((item) => {
      for (const [key, value] of Object.entries(query)) {
        if (item[key] !== value) return false;
      }
      return true;
    });
    if (index !== -1) {
      this.data.splice(index, 1);
      return { deletedCount: 1 };
    }
    return { deletedCount: 0 };
  }

  async countDocuments(query = {}) {
    const res = await this.find(query);
    return res.length;
  }
}

const memoryStore = {
  users: new MemoryCollection('users'),
  modules: new MemoryCollection('modules'),
  lessons: new MemoryCollection('lessons'),
  traces: new MemoryCollection('traces'),
};

module.exports = memoryStore;
