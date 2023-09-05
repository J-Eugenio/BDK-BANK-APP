import React from "react";
import { ButtonBox, Text } from "./styles";
import { ActivityIndicator } from "react-native";

interface ButtonProps {
  color?: string;
  title?: string;
  onPress: () => void;
  width?: number;
  loading?: boolean;
  disabled?: boolean;
}

function Button({ onPress, color, title, width, loading, disabled }: ButtonProps) {
  return (
    <ButtonBox 
      color={ disabled ? '#BBB' : color} 
      onPress={onPress} 
      width={width}
      disabled={disabled}
    >
      {loading === true ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text>{title || "Default"}</Text>
      )}
    </ButtonBox>
  );
}

export { Button };
