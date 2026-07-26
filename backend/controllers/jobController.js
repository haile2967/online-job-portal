import Job from '../models/Job.js';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ 
      $or: [
        { status: 'Active' },
        { status: { $exists: false } }
      ]
    }).populate('postedBy', 'name companyName');
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name companyName email');
    if (job) {
      job.views = (job.views || 0) + 1;
      await job.save();
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private (Company, Admin)
export const createJob = async (req, res) => {
  try {
    const { title, company, description, requirements, location, salary, type, status } = req.body;

    const job = new Job({
      title,
      company,
      description,
      requirements,
      location,
      salary,
      type,
      status: status || 'Active',
      postedBy: req.user.id,
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private (Company)
export const updateJob = async (req, res) => {
  try {
    const { title, description, requirements, location, salary, type, status } = req.body;

    const job = await Job.findById(req.params.id);

    if (job) {
      // Check if user is the job poster
      if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'User not authorized to update this job' });
      }

      job.title = title || job.title;
      job.description = description || job.description;
      job.requirements = requirements || job.requirements;
      job.location = location || job.location;
      job.salary = salary || job.salary;
      job.type = type || job.type;
      if (status) job.status = status;

      const updatedJob = await job.save();
      res.json(updatedJob);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private (Company)
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job) {
      // Check if user is the job poster
      if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'User not authorized to delete this job' });
      }

      await job.deleteOne();
      res.json({ message: 'Job removed' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get jobs by company
// @route   GET /api/jobs/company/me
// @access  Private (Company)
export const getCompanyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).sort('-createdAt');
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
