import { useEffect, useState } from "react";

const User = () => {
  // const [users, setUsers] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/workouts/");

    const data = await response.json();

    setWorkouts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )} */}
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <h1 key={workout._id}>{workout}</h1>)}
      </div>
    </div>
  );
};

export default User;
