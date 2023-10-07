import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { AppStackParamList } from '../../routes/Routes';

// @ts-ignore
import { GOOGLE_MAPS_API_KEY } from '@env';

import {
  Button,
  ButtonText,
  Container,
  DetailsArea,
  MapArea,
  PlacesColumn,
  PlacesLine,
  Subtitle,
  Title,
} from './MapScreenStyles';
import { useFocusEffect } from '@react-navigation/native';

type ScreenProps = NativeStackScreenProps<AppStackParamList, 'MapScreen'>;

export function MapScreen({ navigation, route }: ScreenProps) {
  const { origin, destination } = route.params;

  const mapRef = useRef<MapView | null>(null);

  useLayoutEffect(() => {
    if (!origin || !destination || !mapRef.current) return;

    const fitToMarkers = () => {
      mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      });
    };

    setTimeout(fitToMarkers, 1000);

    // @ts-ignore
    return () => clearTimeout(fitToMarkers);
  }, [origin, destination, mapRef]);

  return (
    <Container>
      <MapArea>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          mapType="mutedStandard"
          initialRegion={{
            latitude: origin.info.location.lat,
            longitude: origin.info.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {origin && destination && (
            <MapViewDirections
              origin={{
                latitude: origin.info.location.lat,
                longitude: origin.info.location.lng,
              }}
              destination={{
                latitude: destination.info.location.lat,
                longitude: destination.info.location.lng,
              }}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              strokeColor="#020202"
            />
          )}

          {origin?.info.location && (
            <Marker
              coordinate={{
                latitude: origin.info.location.lat,
                longitude: origin.info.location.lng,
              }}
              title="Origin"
              description={origin.info.name}
              identifier="origin"
            />
          )}

          {destination?.info.location && (
            <Marker
              coordinate={{
                latitude: destination.info.location.lat,
                longitude: destination.info.location.lng,
              }}
              title="Destination"
              description={destination.info.name}
              identifier="destination"
            />
          )}
        </MapView>
      </MapArea>
      <DetailsArea>
        <PlacesLine>
          <PlacesColumn>
            <Title>From</Title>
            <Subtitle numberOfLines={2}>{origin?.title}</Subtitle>
          </PlacesColumn>
          <PlacesColumn>
            <Title>To</Title>
            <Subtitle numberOfLines={2}>{destination?.title}</Subtitle>
          </PlacesColumn>
        </PlacesLine>
        <Button onPress={() => navigation.goBack()}>
          <ButtonText>Go to Main Screen</ButtonText>
        </Button>
      </DetailsArea>
    </Container>
  );
}
