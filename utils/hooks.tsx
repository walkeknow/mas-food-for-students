import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileStackParamList, RootStackParamList} from './types';

type NavigationScreenProp = NativeStackNavigationProp<RootStackParamList>;
type ProfileNavigationScreenProp = NativeStackNavigationProp<ProfileStackParamList>;

export const useAppNavigation = () => useNavigation<NavigationScreenProp>();
export const useProfileNavigation = () => useNavigation<ProfileNavigationScreenProp>();
