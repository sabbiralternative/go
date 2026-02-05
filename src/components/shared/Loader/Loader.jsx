import { FaSpinner } from "react-icons/fa";

const Loader = ({ size = 20 }) => {
  return <FaSpinner className="animate-spin" size={size} color="white" />;
};

export default Loader;
