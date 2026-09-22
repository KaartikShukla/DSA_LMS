const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const { modulesData, lessonsData } = require('../seed/seedData');

// Seed default course data if empty
const ensureSeedData = async () => {
  const count = await Module.countDocuments();
  if (count === 0) {
    console.log('[Seed] Seeding default modules and lessons...');
    await Module.insertMany(modulesData);
    await Lesson.insertMany(lessonsData);
    console.log('[Seed] Database successfully seeded with 7 modules and 12 detailed lessons.');
  }
};

exports.ensureSeedData = ensureSeedData;

exports.getModules = async (req, res) => {
  try {
    await ensureSeedData();
    const modules = await Module.find();
    const lessons = await Lesson.find();

    // Attach lessons array to each module
    const populated = modules.map((mod) => {
      const modLessons = lessons
        .filter((l) => l.moduleId === mod._id || l.moduleId === mod.id)
        .map((l) => ({
          id: l._id || l.id,
          title: l.title,
          slug: l.slug,
          category: l.category,
          difficulty: l.difficulty,
          summary: l.summary,
          timeComplexity: l.timeComplexity,
        }));
      return {
        ...mod,
        lessons: modLessons,
      };
    });

    res.json(populated);
  } catch (err) {
    console.error('Error fetching modules:', err);
    res.status(500).json({ error: 'Failed to retrieve DSA course modules' });
  }
};

exports.getModuleBySlug = async (req, res) => {
  try {
    await ensureSeedData();
    const mod = await Module.findOne({ slug: req.params.slug });
    if (!mod) return res.status(404).json({ error: 'Module not found' });

    const lessons = await Lesson.find({ moduleId: mod._id || mod.id });
    res.json({
      ...mod,
      lessons,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching module' });
  }
};

exports.getLessons = async (req, res) => {
  try {
    await ensureSeedData();
    const query = {};
    if (req.query.category) query.category = req.query.category;
    if (req.query.difficulty) query.difficulty = req.query.difficulty;

    const lessons = await Lesson.find(query);
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
};

exports.getLessonBySlug = async (req, res) => {
  try {
    await ensureSeedData();
    const lesson = await Lesson.findOne({ slug: req.params.slug });
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching lesson' });
  }
};

exports.createLesson = async (req, res) => {
  try {
    const { title, slug, moduleId, category, difficulty, summary, theory, timeComplexity, spaceComplexity, codeSnippet, algorithmKey, teachingPoints } = req.body;
    if (!title || !slug || !moduleId || !codeSnippet) {
      return res.status(400).json({ error: 'Title, slug, moduleId, and codeSnippet are required' });
    }

    const created = await Lesson.create({
      title,
      slug,
      moduleId,
      category: category || 'sorting',
      difficulty: difficulty || 'Beginner',
      summary: summary || '',
      theory: theory || '',
      timeComplexity: timeComplexity || { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      spaceComplexity: spaceComplexity || 'O(1)',
      codeSnippet,
      algorithmKey: algorithmKey || 'custom',
      teachingPoints: teachingPoints || [],
    });

    res.status(201).json(created);
  } catch (err) {
    console.error('Error creating lesson:', err);
    res.status(500).json({ error: 'Failed to create lesson' });
  }
};
