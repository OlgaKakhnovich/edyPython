import express from 'express';
import { login, logout, signup, getMe, updateMe, getDates, getRating } from '../controllers/auth.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.get("/visited_dates",protectRoute, getDates);
router.get("/rating", protectRoute, getRating);
router.put("/:id", updateMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;