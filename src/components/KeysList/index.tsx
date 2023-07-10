import React, { useState } from "react";
import {
  BoxButtons,
  BoxNameAndKey,
  BtnCopyKey,
  BtnDeleteKey,
  Container,
  KeySubtitle,
  KeyTitle,
} from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { ExcludePix } from "../../service/ApiPaymentsRoutes";
import { showToast } from "../../utils/toast";

interface keyInfo {
  id: number;
  keyTitle?: string;
  keySubtitle?: string;
}

function KeysList({ id, keyTitle, keySubtitle }: keyInfo) {
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleDelete = () => {
    return console.log(id);
  };

  async function copyTextToClipboard(text: any) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = (copyText: any) => {
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
        showToast("Chave copiada");
      })
      .catch((err) => {
        showToast("Chave não copiada");
      });
  };

  const handleDeletePix = async (pix: number) => {
    setLoading(true);
    await ExcludePix(String(pix))
      .then((res) => {
        if (res.data.Sucess === true) {
          showToast(res.data.Message);
          window.location.reload();
        } else {
          showToast(res.data.Message);
        }
      })
      .catch(() => {
        showToast("Falha ao deletar o Pix");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <BoxNameAndKey>
        <KeyTitle>{keyTitle}</KeyTitle>
        <KeySubtitle>{keySubtitle}</KeySubtitle>
      </BoxNameAndKey>
      <BoxButtons>
        <BtnCopyKey
          onPress={() => handleCopyClick(keySubtitle)}
          disabled={loading}
        >
          <Icon name="copy" size={40} color="#F08E34" />
        </BtnCopyKey>
        <BtnDeleteKey onPress={() => handleDeletePix(id)} disabled={loading}>
          <Icon name="times-circle" size={40} color="#FF6666" />
        </BtnDeleteKey>
      </BoxButtons>
    </Container>
  );
}

export { KeysList };
