import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { 
  Container,
  ImageContainer,
  Text
 } from './styles';

interface SignInButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>
}

export function SignInSocialButton({title, svg: Svg, ...rest}: SignInButtonProps){
  return (
    <Container {...rest}>
      <ImageContainer>
        <Svg/>
      </ImageContainer>

      <Text>
        {title}
      </Text>
    </Container>
  );
}

export default SignInSocialButton;