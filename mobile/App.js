import 'react-native-gesture-handler';

import { TailwindProvider } from "./src/context/useTailwind";
import { StyleSheet, SafeAreaView } from "react-native";
import { Navigation } from './src/navigation/Navigation';


export default function App() {

  return (
    <TailwindProvider>
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});