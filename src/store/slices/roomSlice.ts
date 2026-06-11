import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type Room = "home" | "kitchen" | "bathroom" | "bedroom";

interface GameState {
  currentRoom: Room;
}

const initialState: GameState = {
  currentRoom: "home",
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    changeRoom: (state, action: PayloadAction<Room>) => {
      state.currentRoom = action.payload;
    },
  },
});

export const { changeRoom: changeRoomAction } = roomSlice.actions;
export default roomSlice.reducer;
