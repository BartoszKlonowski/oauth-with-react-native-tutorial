import React, { JSX, useCallback, useEffect, useState } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from '../components/Button';
import { GithubAccount } from '../Content';
import { useNavigation } from '@react-navigation/native';
import { NavigationParams } from '../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const client_id = "Your clientID goes here";
const client_secret = "Your client secret goes here";

const Login = (): JSX.Element => {
  const [authCode, setAuthCode] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [profile, setProfile] = useState<GithubAccount>();

  const navigation = useNavigation<NativeStackNavigationProp<NavigationParams>>();

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

  const requestAccess = useCallback((token: string) => {
    fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: client_id,
        client_secret: client_secret,
        response_type: "token",
        code: token,
        redirect_uri: "OAuthWithReactNativeTutorial://code"
      }),
    }).then((response) => {
      response.json().then(res => {
        setAccessToken(res.access_token);
      }).catch(error => {
        console.log("cant open response - parsing error: ", error);
      });
    }).catch(error => {
      console.log("Access token fetching error: ", error);
    });
  }, []);

  const handleAPIFetch = useCallback(() => {
    fetch("https://api.github.com/user", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `token ${accessToken}`
      },
    }).then(response => {
      response.json().then(res => {
        setProfile(res);
      });
    });
  }, [accessToken, authCode]);

  useEffect(() => {
    Linking.addEventListener('url', ({ url }) => {
      const temporaryToken = url.split("?")[1].split("=")[1];
      setAuthCode(temporaryToken);
      requestAccess(temporaryToken);
    });
    return () => {
      Linking.removeAllListeners('url');
    }
  }, [setAuthCode, requestAccess]);

  useEffect(() => {
    if (authCode && accessToken) {
      handleAPIFetch();
    }
  }, [authCode, accessToken]);

  return (
    <View style={styles.mainContainer}>
      <Button onPress={handleAuthorization} title='Authorize'/>
      <View style={styles.tokenResultContainer}>
        <Text>Authorization code is:</Text>
        <Text>{authCode}</Text>
        <Text>Access token is:</Text>
        <Text>{accessToken}</Text>
      </View>
      {authCode && accessToken && profile ? <Button onPress={() => {
          navigation.navigate('Profile', profile);
        }} title="Log in" /> : null}
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
