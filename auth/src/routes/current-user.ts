import express from 'express';
const router = express.Router();

import { currentUser } from '../middleware/current-user';

//l'appli va utiliser jwt + un cookie stocké dans le browser
router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
