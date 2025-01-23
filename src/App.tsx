import React, { JSX } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

function App(): JSX.Element {
  return (
    <View style={styles.mainContainer}>
      <Text>OAuth2.0 with React Native</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default App;
