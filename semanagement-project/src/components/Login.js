
import { Login } from "../util/users/login";

export const Login = () => {
  return (
    <button onClick={(e)=>{ Login(); }}>Login</button>
  );
}