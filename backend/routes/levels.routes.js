import express from 'express';
import { getLevelsProgress, getChaptersProgress, getAllLevels, getLevel, getAllChapters,getChapterByLevelId, getTests, getTask, postExecute , addProgress, getCompletedLevels, submitAndTakeNextTask, submitTask} from '../controllers/level.controller.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.get("/",getAllLevels);
router.get("/completedLevels/:id", getCompletedLevels );
router.get("/chapters",getAllChapters);
router.get("/:id/chapter", getChapterByLevelId);
router.get("/task/:id", getTests);
router.get("/levelProgress", protectRoute, getLevelsProgress);
router.get("/chapterProgress", protectRoute, getChaptersProgress);
router.post("/:id/task", protectRoute, getTask);
router.put("/:id/task/submit",protectRoute, submitAndTakeNextTask );
router.put("/:id/task/onlySubmit",protectRoute, submitTask );
router.get("/:id",getLevel);
router.post("/execute/:id", postExecute);
router.put("/addProgress", protectRoute, addProgress);

export default router;