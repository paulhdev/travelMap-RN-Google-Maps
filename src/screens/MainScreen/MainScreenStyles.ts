import styled from 'styled-components/native';
import AntDesign from '@expo/vector-icons/AntDesign';

type ButtonProps = {
  disabled: boolean;
};

export const Container = styled.View`
  flex: 1;
  padding: 15% 5% 5% 5%;
  background: #fff;
`;

export const HeaderArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TitleArea = styled.View``;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'Poppins_400Regular';
  color: #020202;
  margin-bottom: -10px;
`;

export const Subtitle = styled.Text`
  font-size: 26px;
  font-family: 'Poppins_700Bold';
  color: #020202;
`;

export const TitleSeparateArea = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
`;

export const TitleSeparateText = styled.Text`
  font-size: 20px;
  font-family: 'Poppins_500Medium';
  color: #020202;
`;

export const TitleSeparateLine = styled.View`
  width: 75px;
  height: 3px;
  border-radius: 2px;
  background: #fbbe41;
`;

export const Icon = styled(AntDesign)`
  font-size: 32px;
  color: #020202;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  background: #eee;
  margin: 20px 0 10px 0;
  padding: 0 5px;
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  background: #fbbe41;
  border-radius: 5px;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-family: 'Poppins_500Medium';
  color: #020202;
`;

export const PlaceItem = styled.View`
  width: 100%;
  height: 75px;
  background: #eee;
  border-radius: 5px;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
`;

export const PlaceItemInfoArea = styled.View`
  width: 65%;
`;

export const PlaceItemName = styled.Text`
  font-size: 16px;
  font-family: 'Poppins_700Bold';
  color: #020202;
  margin-top: 5px;
  margin-bottom: -5px;
`;

export const PlaceItemDescription = styled.Text`
  font-size: 12px;
  font-family: 'Poppins_400Regular';
  color: #999;
`;

export const PlaceItemImage = styled.Image`
  width: 75px;
  height: 75px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const FooterArea = styled.View`
  width: 100%;
  height: 70px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #eee;
  border-radius: 5px;
`;

export const FooterTextArea = styled.View`
  width: 65%;
`;

export const FooterTitleArea = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: -5px;
`;

export const FooterTitle = styled.Text`
  font-size: 14px;
  font-family: 'Poppins_700Bold';
  color: #020202;
`;

export const FooterClearText = styled.Text`
  font-size: 12px;
  font-family: 'Poppins_700Bold';
  color: #999;
`;

export const FooterText = styled.Text`
  font-size: 12px;
  font-family: 'Poppins_400Regular';
  color: #020202;
`;

export const FooterBtn = styled.TouchableOpacity<ButtonProps>`
  width: 30%;
  height: 50px;
  align-items: center;
  justify-content: center;
  background: #fbbe41;
  border-radius: 5px;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;

export const FooterBtnText = styled.Text`
  font-size: 16px;
  font-family: 'Poppins_700Bold';
  color: #020202;
`;
