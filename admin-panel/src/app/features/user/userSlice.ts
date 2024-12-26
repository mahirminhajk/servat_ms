import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  phone: string;
  profile: string;
  isAdmin: boolean;
};

const initialState: UserState = {
  username: "",
  phone: "",
  profile: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.username = action.payload.username;
      state.phone = action.payload.phone;
      state.profile = action.payload.profile;
      state.isAdmin = action.payload.isAdmin;
    },
    clearUser: (state) => {
      state.username = "";
      state.phone = "";
      state.profile = "";
      state.isAdmin = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;