import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const {user} = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await axios.delete(`http://localhost:8000/api/workouts/${workout._id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    });
    const jsonRes = await response.data;

    if(jsonRes){
      dispatch({ type: "DELETE_WORKOUT", payload: jsonRes });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>{(new Date(workout.createdAt)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
      <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
    </div>
  );
};
export default WorkoutDetails;
