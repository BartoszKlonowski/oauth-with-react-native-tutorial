import React from "react";
import { Image, Linking, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { NavigationProps } from "../navigation";

export const Profile = ({route}: NavigationProps<'Profile'>) => {
  const profile = route.params;
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileHeadingContainer}>
        <Image source={{uri: profile.avatar_url}} width={120} height={120}/>
        <View style={styles.profileDataContainer}>
          <Text style={styles.dataText}>{profile.name}</Text>
          <Text style={styles.dataText}>{profile.bio}</Text>
        </View>
      </View>
      <Text style={styles.dataText}>
        {`Visit my profile: ${profile.login} and check out some of my ${profile.public_repos} repos!`}
      </Text>
      <TouchableHighlight onPress={() => {
        !!profile.html_url && Linking.openURL(profile.html_url);
      }} disabled={!profile.html_url}>
        <Text>{profile.login}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  profileHeadingContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  profileDataContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  dataText: {
    padding: 5
  },
  profileVisitButton: {
    height: 40,
    width: 200,
  },
});
