import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setViewedProfile } from "../redux/userSlice"; // 👈 updated import
import { USER_API_END_POINT } from "../utils/constant";

const useGetProfile = (id) => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((store) => store.user.loggedInUser?._id);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
        });

        dispatch(setViewedProfile(res.data.user)); // 👈 save to viewedProfile
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (id && id !== loggedInUserId) {
      fetchProfile(); // ✅ Only fetch if not your own profile
    } else if (id === loggedInUserId) {
      dispatch(setViewedProfile(null)); // 👈 Clear or handle self-profile differently
    }
  }, [id, dispatch, loggedInUserId]);
};

export default useGetProfile;
