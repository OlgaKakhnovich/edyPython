import express from 'express';
import { getAllLevels, getLevel, getAllChapters } from '../controllers/level.controller.js';

const router = express.Router();

router.get("/",getAllLevels);
router.get("/chapters",getAllChapters);
router.get("/:id",getLevel);


export default router;