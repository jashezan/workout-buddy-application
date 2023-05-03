import axios from "axios";
import { useState } from "react";

import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const {dispatch} = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    if (workout.title !== "" && workout.reps && workout.load) {
      axios
        .post("http://localhost:8000/api/workouts/", workout, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (response.statusText === "OK") {
            setError(null);
            setTitle("");
            setLoad("");
            setReps("");
            dispatch({type: 'CREATE_WORKOUT', payload: response.data})
            console.log("new workout added:", response.data);
          }
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Exercise Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        required
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        required
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error.message}</div>}
    </form>
  );
};

export default WorkoutForm;
