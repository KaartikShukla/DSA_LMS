const User = require('../models/User');
const Lesson = require('../models/Lesson');

exports.toggleLesson = async (req, res) => {
  try {
    const { lessonId } = req.body;
    if (!lessonId) return res.status(400).json({ error: 'lessonId is required' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let completed = Array.isArray(user.completedLessons) ? [...user.completedLessons] : [];
    const index = completed.indexOf(lessonId);

    if (index > -1) {
      completed.splice(index, 1);
    } else {
      completed.push(lessonId);
    }

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { completedLessons: completed } },
      { new: true }
    );

    res.json({
      completedLessons: updated.completedLessons,
      isCompleted: index === -1,
    });
  } catch (err) {
    console.error('Error toggling lesson completion:', err);
    res.status(500).json({ error: 'Could not update lesson progress' });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const totalLessons = await Lesson.countDocuments();
    const completedCount = (user && user.completedLessons) ? user.completedLessons.length : 0;
    const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    res.json({
      completedLessons: (user && user.completedLessons) || [],
      totalLessons,
      completedCount,
      percentage,
      progress: (user && user.progress) || { totalTimeSpentMinutes: 0, stepsExecutedCount: 0 },
    });
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve progress data' });
  }
};
