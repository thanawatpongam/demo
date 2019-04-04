import { createStackNavigator, createAppContainer } from "react-navigation";
import {Restaurant} from "./src/restaurant";
import {Menu} from "./src/menu";

const RootStack = createStackNavigator({
    Home: {
      screen: Restaurant
    },
    Menu: {
      screen: Menu
    }
  });

const App = createAppContainer(RootStack);

export default App;