import { Button } from "../Button";
import { BoxButton, MainModal, ModalContainer, Success } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";

function SuccessStatus() {
  return (
    <>
      <ModalContainer>
        <MainModal>
          <Icon name="check-square-o" size={120} color="#6EA965" />

          <Success>Pix realizado!</Success>
        </MainModal>
      </ModalContainer>
    </>
  );
}

export { SuccessStatus };
