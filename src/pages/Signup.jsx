import { useState } from "react";
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup, error, isLoading} = useSignup()


  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <label htmlFor="email">Email: </label>
      <input
        type="email"
        name="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        id=""
      />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        name="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        id=""
      />
      <button type="submit" disabled={isLoading}>Sign Up</button>
      {error && (<div>{error}</div>)}
    </form>
  );
};

export default Signup;
