import React, { JSX, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from '../components/Button';

const Login = (): JSX.Element => {
  const [authCode, setAuthCode] = useState("");
  const [accessToken, setAccessToken] = useState("");

  return (
    <View style={styles.mainContainer}>
      <Button onPress={() => {}} title='Authorize'/>
      <View style={styles.tokenResultContainer}>
        <Text>Authorization code is:</Text>
        <Text>{authCode}</Text>
        <Text>Access token is:</Text>
        <Text>{accessToken}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tokenResultContainer: {
    alignItems: "center",
    padding: 15,
    height: 250,
    width: 550
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default Login;
