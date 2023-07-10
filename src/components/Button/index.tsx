import React from "react";
import { Container, Text } from "./styles";
import { ActivityIndicator } from "react-native";

interface ButtonProps {
  color?: string;
  title?: string;
  onPress: () => void;
  width?: number;
  loading?: boolean;
}

function Button({ onPress, color, title, width, loading }: ButtonProps) {
  return (
    <Container color={color} onPress={onPress} width={width}>
      {loading === true ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text>{title || "Default"}</Text>
      )}
    </Container>
  );
}

export { Button };
