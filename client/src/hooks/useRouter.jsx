// hooks/useRouterNavigation.js
import { useParams, useNavigate } from "react-router-dom";

function useRouterNavigation() {
  const navigate = useNavigate();
  const params = useParams();

  const goBack = () => {
    navigate(-1);
  };

  return {
    goBack,
    params,
    location,
  };
}

export default useRouterNavigation;
