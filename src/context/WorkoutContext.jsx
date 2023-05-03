import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUT":
      return {
        workout: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workout: [...state.workout, action.payload],
      };
    default:
      break;
  }
};

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, { workout: null });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
