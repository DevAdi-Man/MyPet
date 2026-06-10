import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PetState {
  hunger: number;
  energy: number;
  happiness: number;

  xp: number;
  level: number;

  lastOpenAt: number;
}

const initialState: PetState = {
  hunger: 100,
  energy: 100,
  happiness: 100,

  xp: 100,
  level: 100,

  lastOpenAt: Date.now(),
};

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    feedPet: (state) => {
      state.hunger = Math.min(state.hunger + 20, 100);
      state.xp += 5;
    },
    playWithPet: (state) => {
      state.happiness = Math.min(state.happiness + 20, 100);
      state.xp += 5;
    },
    sleepPet: (state) => {
      state.energy = Math.min(state.energy + 20, 100);
      state.xp += 5;
    },
    applyDelay: (
      state,
      action: PayloadAction<{
        hungerDecay: number;
        energyDecay: number;
        happinessDecay: number;
      }>,
    ) => {
      state.hunger = action.payload.hungerDecay;
      state.energy = action.payload.energyDecay;
      state.happiness = action.payload.happinessDecay;
    },
    updateLastOpenAt: (state, action: PayloadAction<number>) => {
      state.lastOpenAt = action.payload;
    },
    levelUp: (state) => {
      state.level += 1;
    },
    resetPet: () => initialState,
  },
});

export const {
  feedPet,
  playWithPet,
  sleepPet,
  applyDelay,
  updateLastOpenAt,
  levelUp,
  resetPet,
} = petSlice.actions;

export default petSlice.reducer;
