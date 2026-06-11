import { ImageSourcePropType } from "react-native";
export const PLATES = [
  { left: 75 * 2, top: 90 },
  { left: 63 * 5, top: 130 },
  { left: 127.2 * 4, top: 130 },
  { left: 134 * 5, top: 90 },
];
export const Foods = [
  {
    id: "Chiken",
    source: require("@assets/foods/chicken.png") as ImageSourcePropType,
    hungerValue: 10,
    top: 50,
    left: 5,
  },
  {
    id: "cherry",
    source: require("@assets/foods/cherry.png") as ImageSourcePropType,
    hungerValue: 5,
    top: 90,
    left: 80,
  },
  {
    id: "HotDog",
    source: require("@assets/foods/hotDog.png") as ImageSourcePropType,
    hungerValue: 8,
    top: 90,
    left: 190,
  },
  {
    id: "IceCream",
    source: require("@assets/foods/icecream.png") as ImageSourcePropType,
    hungerValue: 6,
    top: 55,
    left: 250,
  },
  {
    id: "Salad",
    source: require("@assets/foods/salad.png") as ImageSourcePropType,
    hungerValue: 4,
    top: 40,
    left: 320,
  },
  {
    id: "Berry",
    source: require("@assets/foods/berry.png") as ImageSourcePropType,
    hungerValue: 3,
    top: 40,
    left: 400,
  },
  {
    id: "Apple",
    source: require("@assets/foods/apple.png") as ImageSourcePropType,
    hungerValue: 5,
    top: 40,
    left: 480,
  },
];
