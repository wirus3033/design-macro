import { Dimensions } from "react-native";
 
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
 
export const hp = (value :number) => {
  return (value * windowHeight) / 100;
};
 
export const wp = (value:number) => {
  return (value * windowWidth) / 100;
};