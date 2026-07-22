import express from 'express';
import { getJobs, getJobById, createJob, updateJob, deleteJob, getCompanyJobs } from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/company/me')
  .get(protect, authorize('company', 'admin'), getCompanyJobs);

router.route('/')
  .get(getJobs)
  .post(protect, authorize('company', 'admin'), createJob);

router.route('/:id')
  .get(getJobById)
  .put(protect, authorize('company', 'admin'), updateJob)
  .delete(protect, authorize('company', 'admin'), deleteJob);

export default router;
