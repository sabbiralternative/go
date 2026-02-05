import { useDispatch } from "react-redux";
import { setShowLeftSidebar } from "../../../redux/features/global/globalSlice";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className="top-bar">
      <i
        onClick={() => dispatch(setShowLeftSidebar(true))}
        className="fas fa-bars"
      />
      <i className="fas fa-bell" />
    </header>
  );
};

export default Header;
