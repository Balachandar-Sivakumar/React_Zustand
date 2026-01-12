import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useTodoStore from "../store/useStore";

const ClearError = () => {
  const location = useLocation();
  const setError = useTodoStore((state) => state.setError);

  useEffect(() => {
    setError({});
  }, [location.pathname, setError]);

  return null;
};

export default ClearError;