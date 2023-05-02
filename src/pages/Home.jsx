import { useEffect, useState } from "react";
import axios from "axios";

// const API_URL_1 = "http://localhost:8000/api/workouts/";
const API_URL_2 = "/api/workouts/";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  // const fetchWorkouts = async () => {
  //   const headers = { "Content-Type": "application/json" };
  //   const response = await fetch("/api/workouts/", {
  //     headers,
  //   });
  //   // console.log(response.json());
  //   console.log("Yo Data\n\n", response.json());
  //   const jsonRes = await response.json();
  //   if (response.ok) {
  //     setWorkouts(jsonRes);
  //   }
  // };
  useEffect(() => {
    // fetchWorkouts();
    axios
      .get(`/api${API_URL_2}`)
      .then((res) => {
        setWorkouts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log("Hello\n\n", err));
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <h1 key={workout._id}>{workout}</h1>)}
      </div>
    </div>
  );
};

export default Home;
