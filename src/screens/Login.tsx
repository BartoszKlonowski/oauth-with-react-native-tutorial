import React, { JSX, useCallback, useEffect, useState } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from '../components/Button';

const client_id = "Your clientID goes here";

const Login = (): JSX.Element => {
  const [authCode, setAuthCode] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleAuthorization = useCallback(async () => {
    const urlBase = "https://github.com/login/oauth/authorize";
    const requestParams = {
      client_id: client_id,
      redirect_uri: "OAuthWithReactNativeTutorial://code",
    }

    const keys = Object.keys(requestParams);
    const vals = Object.values(requestParams);
    let reqParams = "";
    for (let i = 0; i < keys.length; i++) {
      reqParams += '&';
      reqParams += `${keys[i]}=${vals[i]}`;
    }
    const reqUrl = urlBase + `?${reqParams}`;

    await Linking.openURL(reqUrl);
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', ({ url }) => {
      const temporaryToken = url.split("?")[1].split("=")[1];
      setAuthCode(temporaryToken);
    });
    return () => {
      Linking.removeAllListeners('url');
    }
  }, [setAuthCode]);

  return (
    <View style={styles.mainContainer}>
      <Button onPress={handleAuthorization} title='Authorize'/>
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
