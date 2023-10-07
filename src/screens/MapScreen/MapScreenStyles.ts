import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const MapArea = styled.View`
  width: 100%;
  height: 80%;
`;

export const DetailsArea = styled.View`
  width: 100%;
  height: 20%;
  padding: 5%;
`;

export const PlacesLine = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PlacesColumn = styled.View`
  width: 45%;
`;

export const Title = styled.Text`
  font-size: 12px;
  font-family: 'Poppins_700Bold';
  color: #020202;
  margin-bottom: -5px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  font-family: 'Poppins_400Regular';
  color: #999;
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
