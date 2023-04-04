import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  Container,
  TextInput,
  ShowPassword,
  Main,
  OverTitle
} from './styles';

interface InputProps {
  value?: string;
  setValue?: () => void;
  placeholder?: string;
  isPassword?: boolean;
  overTitle?: string
}
function Input({ value, setValue, placeholder, isPassword, overTitle }: InputProps){
  const [showPassword, setShowPassword] = useState(true);

  return(
    <Container>
      {
        overTitle && (
          <OverTitle>{overTitle}</OverTitle>
        )
      }
      
      <Main>
        <TextInput 
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#7F8192"
          secureTextEntry={isPassword && showPassword}
        />
        {
          isPassword && (
            <ShowPassword
              activeOpacity={0.5}
              onPress={() => setShowPassword(oldValue => !oldValue)}
            >
              <Icon 
                name={showPassword ? "eye-slash" : "eye"}
                size={30}
                color="#7F8192"
              />
            </ShowPassword>
          )
        }
      </Main>
    </Container>
  )
}

export { Input }

