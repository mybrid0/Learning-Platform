import axios from "axios";
import { useEffect } from "react";

function XPUpdater({ authState, setAuthState }) {
  useEffect(() => {
    // Update XP every 10 minutes
    const intervalId = setInterval(async () => {
      try {
        // Adjust the XP value as needed
        const xpToAdd = 10;

        // Make an API call to update XP
        const response = await axios.put(
          `http://localhost:3001/users/update-xp/${authState.id}`,
          {
            score: xpToAdd,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        );

        if (response.data.success) {
          // Fetch the updated user data after XP update
          const userDataResponse = await axios.get(
            "http://localhost:3001/users/userData",
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          );

          // Update the XP-related state
          setAuthState((prevAuthState) => ({
            ...prevAuthState,
            xp: userDataResponse.data.xp,
            xpLevel: userDataResponse.data.xpLevel,
          }));
        }
      } catch (error) {
        console.error("Error updating XP:", error);
      }
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [authState.id, setAuthState]);

  // Render nothing since this component doesn't have a visual representation
  return null;
}

export default XPUpdater;
