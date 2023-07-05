import React from 'react'
import { BoxNameAndKey, BtnDeleteKey, Container, KeySubtitle, KeyTitle } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";

interface contactInfo {
  contactid?: string;
  contactTitle?: string;
  contactSubtitle?: string;
}

function ContactsList({ contactid, contactTitle, contactSubtitle }: contactInfo) {

  const handleRepeatPix = () => {
    return console.log(contactid)
  }

  const handleDelete = () => {
    return console.log(contactid)
  }

  return (
    <Container>
      <BoxNameAndKey>
        <KeyTitle>{contactTitle}</KeyTitle>
        <KeySubtitle>{contactSubtitle}</KeySubtitle>
      </BoxNameAndKey>
      <BtnDeleteKey onPress={() => handleRepeatPix()}>
        <Icon name="repeat" size={30} color="#6EA965" />
      </BtnDeleteKey>
      <BtnDeleteKey onPress={() => handleDelete()}>
        <Icon name="times-circle" size={30} color="#FF6666" />
      </BtnDeleteKey>
    </Container>
  );
}

export { ContactsList };
