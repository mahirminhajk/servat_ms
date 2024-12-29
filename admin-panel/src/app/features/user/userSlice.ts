import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  id: string;
  phone: string;
  profile: string;
  isAdmin: boolean;
};

const initialState: UserState = {
  name: "",
  id: "",
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
      state.id = action.payload.id;
      state.phone = action.payload.phone;
      state.profile = action.payload.profile;
      state.isAdmin = action.payload.isAdmin;
    },
    clearUser: (state) => {
      state.name = initialState.name;
      state.phone = initialState.phone;
      state.profile = initialState.profile;
      state.isAdmin = initialState.isAdmin;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;