import React from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import DishDetail from "./DishDetailComponent";
import { ScrollView, Platform, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

const MenuNavigator = createStackNavigator(
  {
    Menu: {
      screen: Menu
    },
    DishDetail: {
      screen: DishDetail
    }
  },
  {
    initialRouteName: "Menu",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);
const Main = createAppContainer(MenuNavigator);
// export default class Main extends React.Component {
//   render() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
//         }}
//       >
//         <MenuNavigator />
//       </View>
//     );
//   }
// }
export default Main;