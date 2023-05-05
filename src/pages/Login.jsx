import { useState } from 'react'
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2>Login</h2>

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
      <button type="submit" disabled={isLoading}>Login</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
}

export default Login