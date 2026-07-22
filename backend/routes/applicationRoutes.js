import express from 'express';
import { 
  applyForJob, 
  getMyApplications, 
  getJobApplications, 
  updateApplicationStatus,
  getCompanyApplications
} from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('jobseeker'), applyForJob);

router.route('/me')
  .get(protect, authorize('jobseeker'), getMyApplications);

router.route('/company/me')
  .get(protect, authorize('company', 'admin'), getCompanyApplications);

router.route('/job/:jobId')
  .get(protect, authorize('company', 'admin'), getJobApplications);

router.route('/:id/status')
  .put(protect, authorize('company', 'admin'), updateApplicationStatus);

export default router;
