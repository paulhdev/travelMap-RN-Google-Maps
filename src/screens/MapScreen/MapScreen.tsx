import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View } from 'react-native';
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
  RideArea,
  RideInfo,
  RideName,
  RidePrice,
  TitleRide,
} from './MapScreenStyles';

type TravelInfoProps = {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  status: string;
};

type CarProps = {
  id: string;
  title: string;
  multiplier: number;
};

type ScreenProps = NativeStackScreenProps<AppStackParamList, 'MapScreen'>;

const SURGE_CHARGE_RATE = 1.5;

const CAR_OPTIONS = [
  {
    id: 'car-x',
    title: 'CarX',
    multiplier: 1,
  },
  {
    id: 'car-xl',
    title: 'Car XL',
    multiplier: 1.2,
  },
  {
    id: 'car-lux',
    title: 'Car LUX',
    multiplier: 1.3,
  },
] as CarProps[];

export function MapScreen({ navigation, route }: ScreenProps) {
  const { origin, destination } = route.params;

  const [travelInformation, setTravelInformation] =
    useState<TravelInfoProps | null>(null);

  const mapRef = useRef<MapView | null>(null);

  useLayoutEffect(() => {
    if (!origin || !destination || !mapRef.current) return;

    const fitToMarkers = () => {
      mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    };

    setTimeout(fitToMarkers, 1000);

    // @ts-ignore
    return () => clearTimeout(fitToMarkers);
  }, [origin, destination, mapRef]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.info.name}&destinations=${destination.info.name}&key=${GOOGLE_MAPS_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          const infos = data.rows[0].elements[0];
          if (infos.status === 'OK') {
            setTravelInformation(infos);
          }
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);

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
        {travelInformation !== null && (
          <>
            <TitleRide>
              Ride Options - {travelInformation.distance.text}
            </TitleRide>
            {CAR_OPTIONS.map((car) => (
              <RideArea key={car.id}>
                <View>
                  <RideName>{car.title}</RideName>
                  <RideInfo>
                    {travelInformation.duration.text} - Travel Time
                  </RideInfo>
                </View>
                <RidePrice>
                  {new Intl.NumberFormat('en-us', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(
                    (travelInformation.duration.value *
                      SURGE_CHARGE_RATE *
                      car.multiplier) /
                      100
                  )}
                </RidePrice>
              </RideArea>
            ))}
          </>
        )}
        <Button onPress={() => navigation.goBack()}>
          <ButtonText>Go to Main Screen</ButtonText>
        </Button>
      </DetailsArea>
    </Container>
  );
}
