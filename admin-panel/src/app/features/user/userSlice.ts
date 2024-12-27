import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  phone: string;
  profile: string;
  isAdmin: boolean;
};

const initialState: UserState = {
  name: "",
  phone: "",
  profile: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.profile = action.payload.profile;
      state.isAdmin = action.payload.isAdmin;
    },
    clearUser: (state) => {
      state.name = "";
      state.phone = "";
      state.profile = "";
      state.isAdmin = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;