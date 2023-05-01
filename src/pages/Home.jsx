import { useEffect, useState } from "react";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts/");
      console.log("Response\n\n", response)
      const json = await response.json();
      console.log("JSON\n\n",json)
      if (response.ok) {
        setWorkouts(json);
      }
    };

    fetchWorkouts();
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
