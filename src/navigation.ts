import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavigationParams = {
  Login: undefined;
};

export type NavigationProps<T extends keyof NavigationParams> = NativeStackScreenProps<NavigationParams, T>;
