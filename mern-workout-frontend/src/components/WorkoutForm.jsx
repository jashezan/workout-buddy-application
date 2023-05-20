import axios from "axios";
import { useState } from "react";

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFileds, setEmptyFields] = useState([]);
  const {user} = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add a workout");
      return;
    }
    const workout = { title, load, reps };

    if (workout.title !== "" && workout.reps && workout.load) {
      axios
        .post("http://localhost:8000/api/workouts/", workout, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          if (response.statusText === "OK") {
            setError(null);
            setTitle("");
            setLoad("");
            setReps("");
            dispatch({ type: "CREATE_WORKOUT", payload: response.data });
            // console.log("new workout added:", response.data);
          }
          if (response.data.emptyFileds.length > 0) {
            setEmptyFields(response.data.emptyFileds);
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
        className={emptyFileds.includes("title") ? "error" : ""}
        required
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        required
        className={emptyFileds.includes("load") ? "error" : ""}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        required
        className={emptyFileds.includes("reps") ? "error" : ""}
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error.message}</div>}
    </form>
  );
};

export default WorkoutForm;
