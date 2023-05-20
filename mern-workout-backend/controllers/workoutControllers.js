const mongoose = require("mongoose");
const Workout = require("./../models/workoutSchema");

// GET all workout
const getAll = async (req, res) => {
  const user_id = req.user._id
  try {
    const response = await Workout.find({user_id}).sort({createdAt: -1});
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST single workout
const createWorkout = async (req, res) => {
  const user_id = req.user._id
  const { title, reps, load } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Please fill in the following fields: ${emptyFields}` });
  }
  try {
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Workout ID" });
  }
  try {
    const response = await Workout.findById(id);
    if (!response) {
      return res.status(404).json({ error: "No such Workout" });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE single workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Workout ID" });
  }
  try {
    const response = await Workout.findOneAndDelete({ _id: id });
    if (!response) {
      return res.status(404).json({ error: "No such Workout" });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE single workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Workout ID" });
  }
  try {
    const response = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "No such Workout" });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  createWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
