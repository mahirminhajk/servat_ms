import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SystemState {
  isDarkMode: boolean;
  isLogined: boolean;
};

const initialState: SystemState = {
  isDarkMode: true,
  isLogined: false,
}

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setLogined: (state, action: PayloadAction<boolean>) => {
      state.isLogined = action.payload;
    },
  },
});

export const { setDarkMode, setLogined } = systemSlice.actions;

export default systemSlice.reducer;