import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GithubAccount } from './Content';

export type NavigationParams = {
  Login: undefined;
  Profile: GithubAccount;
};

export type NavigationProps<T extends keyof NavigationParams> = NativeStackScreenProps<NavigationParams, T>;
