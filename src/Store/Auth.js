import { createSlice } from "@reduxjs/toolkit";
import { memoize } from "proxy-memoize";
import { userInfo } from "@/Apis/Auth.js";

export const authSlice = createSlice({
   name: "auth",
   initialState: {
      userInfo: {}
   },
   reducers: {
      setUserInfo(state, action) {
         state.userInfo = action.payload;
      }
   }
});

export const { setUserInfo } = authSlice.actions;

export const selectUsername = (state) => state.auth.userInfo.name;

export const selectUserId = (state) => state.auth.userInfo.userId;

export const selectPermissionCodes = memoize((state) => state.auth.userInfo.funcCodes ?? []);

export default authSlice.reducer;

export function getUserInfo() {
   return (dispatch) => {
      userInfo().then((res) => {
         dispatch(setUserInfo(res));
      });
   };
}
