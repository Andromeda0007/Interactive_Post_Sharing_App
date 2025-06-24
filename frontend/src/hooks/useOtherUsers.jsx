import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice"; // ✅ Correct action
import { USER_API_END_POINT } from "../utils/constant";

const useOtherUsers = (loggedInUserId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        console.log("Fetching other users for ID:", loggedInUserId);
        const res = await axios.get(`${USER_API_END_POINT}/otheruser/${loggedInUserId}`, {
          withCredentials: true,
        });

        console.log("Fetched other users: ", res.data.otherUsers);
        dispatch(setOtherUsers(res.data.otherUsers));
      } catch (error) {
        console.error("Error fetching other users:", error);
      }
    };

    if (loggedInUserId) {
      fetchOtherUsers();
    }
  }, [loggedInUserId, dispatch]);
};

export default useOtherUsers;
