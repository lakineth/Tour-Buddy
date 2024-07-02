import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import Loading from './components/Loading';
import Food from './components/Food';
import Destination from './components/Destination';
import Transport from './components/Transport';
import Welcome from './components/Welcome';
import ForgotPassword from './components/ForgotPassword';
import { initializeApp } from "firebase/app";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...'], (isAffected, bundle) => {
  return isAffected || bundle.includes('example.js');
});
 
const firebaseConfig = {
  apiKey: "AIzaSyCpBz-5NvZ6hLz1M-Ge4OcFJ8KZs0ZuxYk",
  authDomain: "enhance-4c8fd.firebaseapp.com",
  projectId: "enhance-4c8fd",
  storageBucket: "enhance-4c8fd.appspot.com",
  messagingSenderId: "278692163041",
  appId: "1:278692163041:web:9336a9969628cdc70e36a0",
  measurementId: "G-LEE8JB65ZP"
};

initializeApp(firebaseConfig);
console.disableYellowBox = true;

const App = createStackNavigator({
    Loading                     : { screen: Loading }, 
    Welcome                     : { screen: Welcome },
    HomePage                    : { screen: HomePage },
    Login                       : { screen: Login }, 
    Register                    : { screen: Register },
    ForgotPassword              : { screen: ForgotPassword },
    Food                    : { screen: Food },
    Transport                    : { screen: Transport },
    Destination                    : { screen: Destination },
  },
  {
    initialRouteName: 'Loading',
  }
);
export default createAppContainer(App);