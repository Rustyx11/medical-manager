import { configureStore } from "@reduxjs/toolkit";
import { alert } from "./accessories/alert";
import { user } from "./accessories/user";

export default configureStore({
  reducer: {
    alerts: alert.reducer,
    user: user.reducer,
  },
});
