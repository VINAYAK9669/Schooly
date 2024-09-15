import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

function useDecodeJWT(token) {
  // useMemo is used to memoize the decoded token and avoid unnecessary recalculations
  const decodedToken = useMemo(() => {
    try {
      // Decode the JWT token
      return jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
      return {};
    }
  }, [token]);

  // Extract and return the necessary information from the decoded token
  return {
    name: decodedToken.name || "",
    profession: decodedToken.profession || "",
    userID: decodedToken._id || "",
  };
}

export default useDecodeJWT;
