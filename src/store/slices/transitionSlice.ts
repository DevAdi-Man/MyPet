import { createSlice } from "@reduxjs/toolkit";

interface TransitionState {
  visible: boolean;
}

const initialState: TransitionState = {
  visible: false,
};

const transitionSlice = createSlice({
  name: "transition",
  initialState,
  reducers: {
    showTransition: (state) => {
      state.visible = true;
    },
    hideTransition: (state) => {
      state.visible = false;
    },
  },
});
export const { showTransition, hideTransition } = transitionSlice.actions;
export default transitionSlice.reducer;
