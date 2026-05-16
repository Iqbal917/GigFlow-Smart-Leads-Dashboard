import express from 'express';

import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead,
  exportLeadsCSV
} from '../controllers/lead.controller';

import { protect } from '../middlewares/auth.middleware';
import { allowRoles } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validation.middleware';
import { leadSchema } from '../validations/lead.validation';

const router = express.Router();

/**
 * GLOBAL AUTH PROTECTION
 */
router.use(protect);

/**
 * CREATE LEAD
 */
router.post(
  '/',
  validate(leadSchema),
  createLead
);

/**
 * GET ALL LEADS (filters + pagination handled in controller)
 */
router.get('/', getLeads);

/**
 * GET SINGLE LEAD
 */
router.get('/:id', getLeadById);

/**
 * UPDATE LEAD
 */
router.put(
  '/:id',
  validate(leadSchema),
  updateLead
);

/**
 * DELETE LEAD (ADMIN ONLY)
 */
router.delete(
  '/:id',
  allowRoles(['admin']),
  deleteLead
);

/**
 * EXPORT CSV (ADMIN ONLY)
 */
router.get(
  '/export',
  allowRoles(['admin']),
  exportLeadsCSV
);

export default router;