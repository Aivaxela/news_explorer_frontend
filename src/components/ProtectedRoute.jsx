import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function ProtectedRoute({ children, setProtectedDestination }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { userState } = useContext(UserContext);

  useEffect(() => {
    if (!userState.loggedIn && userState.authLoaded) {
      setProtectedDestination(location.pathname);
      navigate("/");
    }
  }, [
    userState.authLoaded,
    userState.loggedIn,
    navigate,
    location.pathname,
    setProtectedDestination,
  ]);

  if (!userState.authLoaded) return;
  if (userState.loggedIn) return children;
}
