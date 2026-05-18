const Project = require('../models/Project');
const Task = require('../models/Task');

// @desc    Get all projects for current user
// @route   GET /api/projects
// @access  Private
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user.id }, { members: req.user.id }]
    }).populate('owner', 'name email').populate('members', 'name email');
    
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('members', 'name email');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner or member
    if (project.owner._id.toString() !== req.user.id && !project.members.some(m => m._id.toString() === req.user.id)) {
      return res.status(401).json({ message: 'Not authorized to access this project' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
  try {
    const { title, description, status, members } = req.body;

    const project = await Project.create({
      title,
      description,
      status,
      owner: req.user.id,
      members: members || []
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Only owner can update project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this project' });
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Only owner can delete project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this project' });
    }

    await project.deleteOne();
    
    // Delete all tasks associated with the project
    await Task.deleteMany({ project: req.params.id });

    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
