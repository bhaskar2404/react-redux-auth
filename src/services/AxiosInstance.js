import axios from "axios";
import { store } from "../store/store";

const axiosInstance = axios.create({
  baseURL: `https://fire-base-backend-80195-default-rtdb.firebaseio.com/`,
});
axiosInstance.interceptors.request.use((confing) => {
  console.log(confing);
  const state = store.getState();
  confing.params = confing.params || {};
  confing.params["auth"] = state.auth.auth.idToken;
  return confing;
});

export default axiosInstance;
