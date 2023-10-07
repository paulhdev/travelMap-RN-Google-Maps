import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItem, TouchableOpacity } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// @ts-ignore
import { GOOGLE_MAPS_API_KEY } from '@env';

import {
  Button,
  ButtonText,
  Container,
  FooterArea,
  FooterBtn,
  FooterBtnText,
  FooterClearText,
  FooterText,
  FooterTextArea,
  FooterTitle,
  FooterTitleArea,
  HeaderArea,
  Icon,
  Input,
  PlaceItem,
  PlaceItemDescription,
  PlaceItemImage,
  PlaceItemInfoArea,
  PlaceItemName,
  Subtitle,
  Title,
  TitleArea,
  TitleSeparateArea,
  TitleSeparateLine,
  TitleSeparateText,
} from './MainScreenStyles';

import { getPlaces, removePlace, savePlace } from '../../utils/storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../routes/Routes';
import { useFocusEffect } from '@react-navigation/native';

export type MapPlaceProps = {
  name: string;
  photo: string;
  location: {
    lat: number;
    lng: number;
  };
};

export type PlaceProps = {
  title: string;
  info: MapPlaceProps;
};

type ScreenProps = NativeStackScreenProps<AppStackParamList, 'MainScreen'>;

export function MainScreen({ navigation }: ScreenProps) {
  const [allPlaces, setAllPlaces] = useState<PlaceProps[] | []>([]);
  const [formActive, setFormActive] = useState(false);
  const [title, setTitle] = useState('');
  const [mapLocation, setMapLocation] = useState<MapPlaceProps | null>(null);
  const [origin, setOrigin] = useState<PlaceProps | null>(null);
  const [destination, setDestination] = useState<PlaceProps | null>(null);

  function toggleForm() {
    if (!formActive) {
      setTitle('');
      setMapLocation(null);
    }

    setFormActive((prev) => !prev);
  }

  async function handleSaveLocation() {
    if (!title) return;

    const data = {
      title,
      info: mapLocation!,
    } as PlaceProps;

    await savePlace('@travelMap', data).then(() => {
      setTitle('');
      setMapLocation(null);
      setFormActive(false);

      setAllPlaces((prev) => [data, ...prev]);
    });
  }

  async function handleRemoveLocation(place: PlaceProps) {
    removePlace('@travelMap', place).then(() => {
      const filter = allPlaces.filter(
        (item: PlaceProps) =>
          item.info.location.lat !== place.info.location.lat &&
          item.info.location.lng !== place.info.location.lng
      );

      setAllPlaces(filter);
    });
  }

  async function getStoragePlaces() {
    const response = await getPlaces('@travelMap');
    setAllPlaces(response);
  }

  function selectPlace(place: PlaceProps) {
    if (origin !== null) {
      setDestination(place);
      return;
    }

    setOrigin(place);
  }

  function navigateToMapScreen() {
    if (origin === null || destination === null) return;

    if (
      origin.info.location.lat === destination.info.location.lat &&
      origin.info.location.lng === destination.info.location.lng
    )
      return;

    navigation.navigate('MapScreen', {
      origin,
      destination,
    });
  }

  function clearAll() {
    setOrigin(null);
    setDestination(null);
  }

  useEffect(() => {
    getStoragePlaces();
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isFocused = true;

      if (isFocused) {
        setOrigin(null);
        setDestination(null);
      }

      return () => {
        isFocused = false;
      };
    }, [])
  );

  const renderItem: ListRenderItem<PlaceProps> = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => selectPlace(item)}
      onLongPress={() => handleRemoveLocation(item)}
    >
      <PlaceItem>
        <PlaceItemImage
          source={{
            uri: item.info.photo,
          }}
        />
        <PlaceItemInfoArea>
          <PlaceItemName numberOfLines={1}>{item.title}</PlaceItemName>
          <PlaceItemDescription numberOfLines={2}>
            {item.info.name}
          </PlaceItemDescription>
        </PlaceItemInfoArea>
      </PlaceItem>
    </TouchableOpacity>
  );

  return (
    <Container>
      <HeaderArea>
        <TitleArea>
          <Title>Book Now</Title>
          <Subtitle>Your New Trip</Subtitle>
        </TitleArea>
        <TouchableOpacity onPress={toggleForm}>
          <Icon name={formActive ? 'close' : 'plus'} />
        </TouchableOpacity>
      </HeaderArea>

      {formActive && (
        <>
          <GooglePlacesAutocomplete
            placeholder="New Location..."
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            enablePoweredByContainer={false}
            minLength={2}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
            fetchDetails={true}
            onPress={(data, details = null) => {
              // @ts-ignore
              const imgUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${details?.photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`;
              const place = {
                name: data.description,
                photo: imgUrl,
                location: details?.geometry.location,
              } as MapPlaceProps;

              setMapLocation(place);
            }}
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
          />
          {mapLocation !== null && (
            <>
              <PlaceItem style={{ marginTop: 10 }}>
                <PlaceItemImage
                  source={{
                    uri: mapLocation.photo,
                  }}
                />
                <PlaceItemInfoArea>
                  <PlaceItemName numberOfLines={1}>
                    {title || 'Your location name'}
                  </PlaceItemName>
                  <PlaceItemDescription numberOfLines={2}>
                    {mapLocation.name}
                  </PlaceItemDescription>
                </PlaceItemInfoArea>
              </PlaceItem>
              <Input
                placeholder="Your location name"
                placeholderTextColor="#999"
                onChangeText={(text) => setTitle(text)}
                value={title}
                autoCapitalize="words"
              />
              <Button
                onPress={handleSaveLocation}
                disabled={!title ? true : false}
              >
                <ButtonText>Add Location</ButtonText>
              </Button>
            </>
          )}
        </>
      )}
      {!formActive && (
        <>
          <TitleSeparateArea>
            <TitleSeparateText>Your Locations</TitleSeparateText>
            <TitleSeparateLine />
          </TitleSeparateArea>
          <FlatList
            style={{ marginTop: 10 }}
            data={allPlaces}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
          <FooterArea>
            <FooterTextArea>
              <FooterTitleArea>
                <FooterTitle>Show Distance</FooterTitle>
                {(origin || destination) && (
                  <TouchableOpacity onPress={clearAll}>
                    <FooterClearText>Clear</FooterClearText>
                  </TouchableOpacity>
                )}
              </FooterTitleArea>
              <FooterText numberOfLines={2}>
                From {origin?.title || 'Origin'} to{' '}
                {destination?.title || 'Destination'}
              </FooterText>
            </FooterTextArea>
            <FooterBtn
              onPress={navigateToMapScreen}
              disabled={origin === null || destination === null ? true : false}
            >
              <FooterBtnText>Let's Go</FooterBtnText>
            </FooterBtn>
          </FooterArea>
        </>
      )}
    </Container>
  );
}
