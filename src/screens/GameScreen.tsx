import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useRoom } from "@hooks/useRoom";
import { usePetAudio } from "@hooks/usePetAudio";
import { HomeRoom } from "./HomeRoom";
import { Room } from "src/types/room";
import { KitchenRoom } from "./KitchenRoom";
import { RoomTransition } from "@components/RoomTransition";
import { RootState } from "@store/index";

const rooms: Partial<Record<Room, FC>> = {
  [Room.HOME]: HomeRoom,
  [Room.KITCHEN]: KitchenRoom,
  // [Room.BATHROOM]: BathroomRoom,
  // [Room.BEDROOM]: BedroomRoom,
};

export const GameScreen = () => {
  const { currentRoom } = useRoom();
  const musicEnabled = useSelector(
    (state: RootState) => state.pet.musicEnabled
  );
  
  // Keep music running across all rooms
  usePetAudio(musicEnabled);

  const CurrentRoom = rooms[currentRoom];

  return (
    <>
      {CurrentRoom ? <CurrentRoom /> : null}
      <RoomTransition />
    </>
  );
};
