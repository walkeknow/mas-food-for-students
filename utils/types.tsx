import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageSourcePropType } from "react-native";


export type RootStackParamList = {
  Root: undefined;
  Search: undefined;
  Listing: undefined;
  CreateListing: undefined;
};

export type ProfileStackParamList = {
  ViewProfileScreen: undefined;
  EditProfileScreen: undefined
};

export type ItemCardTypes = {
  item: {
    name: string;
    image: string;
    distance: string;
    tagColor: string;
    university: string;
    address: string;
    pickup: string;
    bought: string;
    expires: string;
    seller: string;
    id: number
  };
};
