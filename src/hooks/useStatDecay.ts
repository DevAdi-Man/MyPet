import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reducerHook";
import { applyDelay, updateLastOpenAt } from "@store/slices/petSlice";

const HUNGER_DECAY_RATE = 0.2; 
const ENERGY_DECAY_RATE = 0.15; 
const HAPPINESS_DECAY_RATE = 0.1; 

export const useStatDecay = () => {
  const dispatch = useAppDispatch();
  const pet = useAppSelector((state) => state.pet);

  // Apply offline decay when app opens
  useEffect(() => {
    const now = Date.now();
    const elapsedSeconds = (now - pet.lastOpenAt) / 1000;

    if (elapsedSeconds > 0) {
      dispatch(
        applyDelay({
          hungerDecay: Math.max(
            pet.hunger - HUNGER_DECAY_RATE * elapsedSeconds,
            0
          ),
          energyDecay: Math.max(
            pet.energy - ENERGY_DECAY_RATE * elapsedSeconds,
            0
          ),
          happinessDecay: Math.max(
            pet.happiness - HAPPINESS_DECAY_RATE * elapsedSeconds,
            0
          ),
        })
      );
    }

    dispatch(updateLastOpenAt(now));
  }, []);

  // Decay every 10 seconds while app is open
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        applyDelay({
          hungerDecay: Math.max(
            pet.hunger - HUNGER_DECAY_RATE * 10,
            0
          ),
          energyDecay: Math.max(
            pet.energy - ENERGY_DECAY_RATE * 10,
            0
          ),
          happinessDecay: Math.max(
            pet.happiness - HAPPINESS_DECAY_RATE * 10,
            0
          ),
        })
      );

      dispatch(updateLastOpenAt(Date.now()));
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch, pet.hunger, pet.energy, pet.happiness]);
};