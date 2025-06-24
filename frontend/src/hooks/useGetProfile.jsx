import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setViewedProfile } from "../redux/userSlice";
import { USER_API_END_POINT } from "../utils/constant";

const useGetProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return; // Don't fetch if no ID (we’re showing logged-in user)

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
        });
        dispatch(setViewedProfile(res.data.user));
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchProfile();
  }, [id, dispatch]);
};

export default useGetProfile;
