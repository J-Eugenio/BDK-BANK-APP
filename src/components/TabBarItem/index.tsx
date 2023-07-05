import React from "react";
import Icon from "react-native-vector-icons/Feather";

import { Container, IconContainer, Title, Value } from "./styles";
import { Col } from "../Flex/Col";

interface TabItemsProps {
  name: string;
  value: string;
  icon: string;
}

function TabBarItem({ name, value, icon }: TabItemsProps) {
  return (
    <Container>
      <IconContainer>
        <Icon name={icon} color="#151940" size={30} />
      </IconContainer>
      <Col>
        <Title>{name}</Title>
        <Value>{value}</Value>
      </Col>
    </Container>
  );
}

export { TabBarItem };
