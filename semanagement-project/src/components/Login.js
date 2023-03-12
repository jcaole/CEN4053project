
import { login } from "../util/users/login";

export const Login = () => {
  return (
    <button onClick={(e)=>{ login(); }}>Login</button>
  );
}