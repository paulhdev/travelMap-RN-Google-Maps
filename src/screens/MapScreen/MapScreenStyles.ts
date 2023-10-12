import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const MapArea = styled.View`
  width: 100%;
  height: 55%;
`;

export const DetailsArea = styled.View`
  width: 100%;
  height: 45%;
  padding: 5%;
`;

export const TitleRide = styled.Text`
  font-size: 16px;
  font-family: 'Poppins_500Medium';
  color: #020202;
`;

export const RideArea = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-color: #eee;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

export const RideName = styled.Text`
  font-size: 14px;
  font-family: 'Poppins_700Bold';
  color: #020202;
  margin-bottom: -5px;
`;

export const RideInfo = styled.Text`
  font-size: 12px;
  font-family: 'Poppins_400Regular';
  color: #020202;
`;

export const RidePrice = styled.Text`
  font-size: 20px;
  font-family: 'Poppins_500Medium';
  color: #020202;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  background: #fbbe41;
  border-radius: 5px;
  margin: 30px 0;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-family: 'Poppins_500Medium';
  color: #020202;
`;
