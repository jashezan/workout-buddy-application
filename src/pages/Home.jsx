import { useEffect } from "react";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

// Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const {workouts, dispatch} = useWorkoutContext();
  useEffect(() => {
    const fetchWorkouts = async () => {
      const API_URL = "http://localhost:8000/api/workouts/";
      const response = await axios.get(API_URL);
      const jsonRes = await response.data;
      if (response) {
        dispatch({type: 'SET_WORKOUT', payload: jsonRes})
      }
    };
    try {
      fetchWorkouts();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return <WorkoutDetails workout={workout} key={workout._id} />;
          })}
      </div>
      <WorkoutForm/>
    </div>
  );
};

export default Home;
