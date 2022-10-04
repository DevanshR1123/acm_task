import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return <div>You are logged in...</div>;
};
export default HomePage;
