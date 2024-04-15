import Navigation from "./src/navigation";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  console.log("Phownix was here!")
  return (
    <NavigationContainer>
        <Navigation/>
    </NavigationContainer>
  );
}