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
  EditProfileScreen: undefined;
  RequestsScreen: undefined
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
    seller_id: string;
    id: number;
  };
};

export type RequestCardTypes = {
  item: ItemCardTypes["item"];
  state: string;
};
