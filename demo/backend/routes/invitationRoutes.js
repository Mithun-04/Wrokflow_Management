import express from 'express';
import invitationController from '../controller/invitationController.js';
const { authMiddleware, managerMiddleware } = require('../middleware/authMiddleware.js');


const router = express.Router();

router.get('/', authMiddleware, invitationController.getUserInvitations);
router.post('/accept', authMiddleware, invitationController.acceptInvitation);
router.post('/decline', authMiddleware, invitationController.declineInvitation);

export default router;