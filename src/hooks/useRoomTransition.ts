import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/index";
import {
  showTransition,
  hideTransition,
} from "@store/slices/transitionSlice";
import { changeRoomAction } from "@store/slices/roomSlice";
import { Room } from "src/types/room";

export const useRoomTransition = () => {
  const dispatch = useDispatch<AppDispatch>();

  const changeRoomWithTransition = (room: Room) => {
    dispatch(showTransition());

    setTimeout(() => {
      dispatch(changeRoomAction(room));
      dispatch(hideTransition());
    }, 1000); 
  };

  return { changeRoomWithTransition };
};