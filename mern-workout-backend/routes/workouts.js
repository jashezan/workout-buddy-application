const express = require("express");
const workoutController = require("./../controllers/workoutControllers");
const requireAuth = require("./../middlewares/requireAuth");
const router = express.Router();

router.use(requireAuth);

router
  .route("/")
  .get(workoutController.getAll)
  .post(workoutController.createWorkout);

// router.get("/", workoutController.getAll)

router
  .route("/:id")
  .get(workoutController.getWorkout)
  .delete(workoutController.deleteWorkout)
  .patch(workoutController.updateWorkout);

module.exports = router;
