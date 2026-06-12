import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useRoom } from "@hooks/useRoom";
import { HomeRoom } from "./HomeRoom";
import { Room } from "src/types/room";
import { KitchenRoom } from "./KitchenRoom";
import { RoomTransition } from "@components/RoomTransition";
import { RootState } from "@store/index";
import { useBackgroundMusic } from "@hooks/useBackgroundMusic";
import { BedRoom } from "./BedRoom";
import { BathRoom } from "./BathRoom";

const rooms: Partial<Record<Room, FC>> = {
  [Room.HOME]: HomeRoom,
  [Room.KITCHEN]: KitchenRoom,
  [Room.BATHROOM]: BathRoom,
  [Room.BEDROOM]: BedRoom,
};

export const GameScreen = () => {
  const { currentRoom } = useRoom();
  const musicEnabled = useSelector(
    (state: RootState) => state.pet.musicEnabled
  );
  
  // Keep music running across all rooms
  useBackgroundMusic(musicEnabled)

  const CurrentRoom = rooms[currentRoom];

  return (
    <>
      {CurrentRoom ? <CurrentRoom /> : null}
      <RoomTransition />
    </>
  );
};
