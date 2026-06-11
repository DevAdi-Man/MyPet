import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@store/index";
import { changeRoomAction, Room } from "@store/slices/roomSlice";

export const useRoom = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentRoom = useSelector(
    (state: RootState) => state.room.currentRoom
  );

  const changeRoom = (room: Room) => {
    dispatch(changeRoomAction(room));
  };

  return {
    currentRoom,
    changeRoom,
  };
};