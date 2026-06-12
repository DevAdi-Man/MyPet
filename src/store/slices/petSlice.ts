import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PetState {
  hunger: number;
  energy: number;
  happiness: number;

  xp: number;
  level: number;

  lastOpenAt: number;

  musicEnabled: boolean;
}

const initialState: PetState = {
  hunger: 1,
  energy: 100,
  happiness: 100,

  xp: 0,
  level: 0,

  lastOpenAt: Date.now(),

  musicEnabled: true,
};

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    toggleMusic: (state) => {
      state.musicEnabled = !state.musicEnabled;
    },

    setMusicEnabled: (state, action: PayloadAction<boolean>) => {
      state.musicEnabled = action.payload;
    },
    feedPet: (state, action: PayloadAction<number>) => {
      state.hunger = Math.min(state.hunger + action.payload, 100);
      state.xp += 5;
    },
    playWithPet: (state, action: PayloadAction<number>) => {
      state.happiness = Math.min(state.happiness + action.payload, 100);
      state.xp += 5;
    },
    sleepPet: (state, action: PayloadAction<number>) => {
      state.energy = Math.min(state.energy + action.payload, 100);
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
  toggleMusic,
  setMusicEnabled,
} = petSlice.actions;

export default petSlice.reducer;
