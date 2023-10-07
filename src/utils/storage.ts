import AsyncStorage from '@react-native-async-storage/async-storage';

import { PlaceProps } from '../screens/MainScreen/MainScreen';

export async function getPlaces(key: string) {
  const locations = await AsyncStorage.getItem(key);
  return JSON.parse(locations!) || [];
}

export async function savePlace(key: string, place: PlaceProps) {
  const myPlaces = await getPlaces(key);

  const hasItem = myPlaces.some(
    (item: PlaceProps) =>
      item.info.location.lat === place.info.location.lat &&
      item.info.location.lng === place.info.location.lng
  );

  if (hasItem) return;

  myPlaces.push(place);

  await AsyncStorage.setItem(key, JSON.stringify(myPlaces));
}

export async function removePlace(key: string, place: PlaceProps) {
  const places = await getPlaces(key);

  const myPlaces = places.filter((item: PlaceProps) => {
    return (
      item.info.location.lat !== place.info.location.lat &&
      item.info.location.lng !== place.info.location.lng
    );
  });

  await AsyncStorage.setItem(key, JSON.stringify(myPlaces));

  return myPlaces;
}
