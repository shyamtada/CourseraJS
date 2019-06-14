import React from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import AboutUs from "./AboutUsComponent";
import ContactUs from "./ContactUsComponent";
import DishDetail from "./DishDetailComponent";
import {
  ScrollView,
  Text,
  Platform,
  View,
  Image,
  StyleSheet
} from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView
} from "react-navigation";
import { Icon } from "react-native-elements";

const MenuNavigator = createStackNavigator(
  {
    Menu: {
      screen: Menu,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        )
      })
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

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          color="white"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      )
    })
  }
);

const AboutUsNavigator = createStackNavigator(
  {
    AboutUs: {
      screen: AboutUs
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          color="white"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      )
    })
  }
);

const ContactUsNavigator = createStackNavigator(
  {
    ContactUs: {
      screen: ContactUs
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          color="white"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      )
    })
  }
);

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={StyleSheet.container}
      forcerInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/logo.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: "Home",
        drawerLabel: "Home",
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor} />
        )
      }
    },
    Menu: {
      screen: MenuNavigator,
      navigationOptions: {
        title: "Menu",
        drawerLabel: "Menu",
        drawerIcon: ({ tintColor }) => (
          <Icon name="list" type="font-awesome" size={24} color={tintColor} />
        )
      }
    },
    AboutUs: {
      screen: AboutUsNavigator,
      navigationOptions: {
        title: "About Us",
        drawerLabel: "About Us",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="info-circle"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        )
      }
    },
    ContactUs: {
      screen: ContactUsNavigator,
      navigationOptions: {
        title: "Contact Us",
        drawerLabel: "Contact Us",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="address-card"
            type="font-awesome"
            size={22}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    drawerBackgroundColor: "#D1C4E9",
    contentComponent: CustomDrawerContentComponent
  }
);

const Main = createAppContainer(MainNavigator);
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row"
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold"
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});
