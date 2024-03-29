import React, { useEffect, useState, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import DropDownPicker from "react-native-dropdown-picker";
import { Camera, CameraType } from "expo-camera";
import { Button } from "../../components/Button";
import { Row } from "../../components/Flex/Row";
import { Input } from "../../components/Input";
import {
  Container,
  Title,
  SubTitle,
  Main,
  PermissionContainer,
  PermissionTitle,
  DocumentContainer,
  MainDocuments,
  ImagePreview,
  ImagePreviewFile,
  CameraMain,
  FlipCamera,
  BoxError,
  Text,
  BoxPage1,
} from "./styles";
import { convertToBase64 } from "../../utils/convertToBase64 ";
import { useNavigation } from "@react-navigation/native";
import { ScreenProp } from "../../../App";
import validCPFForReal, {
  cpfMask,
  cpfMaskRemove,
  formatRG,
} from "../../utils/cfp-mask";
import { validadata } from "../../utils/validBirthdate";
import { saveClient, verifyEmail, verifyPhohe } from "../../service/Apiroutes";
import { showToast } from "../../utils/toast";
import { useAuth } from "../../hooks/auth";
import { AmountInput } from "../../components/AmountInput";
import { formatarDDD, phoneMask } from "../../utils/phone-mask";
import { formatCEP } from "../../utils/formatCep";
import { formatBirthDate } from "../../utils/format-birth-date";

interface TakePhotoProps {
  takeSelfie: () => Promise<void>;
  takeRGFront: () => Promise<void>;
  takeRGBack: () => Promise<void>;
  takeProofOfAddress: () => Promise<void>;
}

function Signup() {
  const navigation = useNavigation<ScreenProp>();
  const { setData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("Dados pessoais");
  const [openGenderPicker, setOpenGenderPicker] = useState(false);
  const [openStatePicker, setOpenStatePicker] = useState(false);
  const [openPoliticallyExposed, setOpenPoliticallyExposed] = useState(false);
  const [valueGender, setValueGender] = useState<any>(null);
  const [valueState, setValueState] = useState<any>(null);
  const [valuePoliticallyExposed, setValuePoliticallyExposed] = useState<any>(
    null
  );

  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);

  //Arquivos que serao enviados
  //--URI
  const [selfieUri, setSelfieUri] = useState<any>(null);
  const [rgFrontUri, setRGFrontUri] = useState<any>(null);
  const [rgBacktoUri, setRGBackUri] = useState<any>(null);
  const [proofOAddressUri, setProofOAddressUri] = useState<any>(null);
  //--BASE64
  const [selfieB64, setSelfieB64] = useState<any>(null);
  const [rgFrontB64, setRGFrontB64] = useState<any>(null);
  const [rgBacktoB64, setRGBackB64] = useState<any>(null);
  const [proofOAddressB64, setProofOAddressB64] = useState<any>(null);

  //Controla as funcoes do take do modal
  const [currentTake, setCurrentTake] = useState<any>();
  const [openTakeModal, setOpenTakeModal] = useState(false);
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [ddd, setddd] = useState("");
  const [gender, setgender] = useState([
    { label: "Feminino", value: "F" },
    { label: "Masculino", value: "M" },
    { label: "Outros", value: "O" },
  ]);
  const [phone, setphone] = useState("");
  const [balance, setBalance] = useState("");
  const [device, setdevice] = useState("");
  const [placeOfBirth, setplaceOfBirth] = useState("");
  const [monthlyIncome, setmonthlyIncome] = useState(0);
  const [maritalStatus, setmaritalStatus] = useState([
    { label: "Solteiro", value: "S" },
    { label: "Casado", value: "C" },
    { label: "Divorciado", value: "D" },
    { label: "Viúvo", value: "V" },
  ]);
  const [add_Address, setadd_Address] = useState("");
  const [add_Neighborhood, setadd_Neighborhood] = useState("");
  const [add_StreetNumber, setadd_StreetNumber] = useState("");
  const [add_ZipCode, setadd_ZipCode] = useState("");
  const [add_Complement, setadd_Complement] = useState("");
  const [add_City, setadd_City] = useState("");
  const [add_Province, setadd_Province] = useState("");
  const [rg, setrg] = useState("");
  const [documentId, setdocumentId] = useState("");
  const [birthDate, setbirthDate] = useState("");
  const [motherName, setmotherName] = useState("");
  const [isPoliticallyExposed, setisPoliticallyExposed] = useState([
    { label: "Sim", value: "s" },
    { label: "Não", value: "n" },
  ]);
  const [hashpass, sethashpass] = useState("");
  const [passwordInitial, setpasswordInitial] = useState("");
  const [hashpassAgain, sethashpassAgain] = useState("");
  const [passwordInitialAgain, setpasswordInitialAgain] = useState("");
  const [occupation, setoccupation] = useState("");
  const [base64Teste, setbase64Teste] = useState("");
  const [finishRegister, setfinishRegister] = useState(false);
  const [hashpassMessageError, sethashpassMessageError] = useState(false);
  const [
    passwordInitialMessageError,
    setpasswordInitialMessageError,
  ] = useState(false);
  const [isNotValidOne, setIsNotValidOne] = useState(false);
  const [isNotValidTwo, setIsNotValidTwo] = useState(false);
  const [orgaoEmissor, setOrgaoEmissor] = useState("");

  //Data Validate
  const [emailIsError, setEmailIsError] = useState(false);
  const [phoneIsError, setPhoneIsError] = useState(false);

  const cpfIsError = useMemo(
    () => validCPFForReal(documentId) || documentId === "",
    [documentId]
  );

  //Validate Steps
  const step1 = useMemo(
    () =>
      emailIsError ||
      phoneIsError ||
      fullName === "" ||
      email === "" ||
      birthDate === "" ||
      balance === "" ||
      phone === "" ||
      !valueGender ||
      !valueState,
    [
      emailIsError,
      phoneIsError,
      fullName,
      email,
      birthDate,
      balance,
      phone,
      valueGender,
      valueState,
    ]
  );

  const step2 = useMemo(
    () =>
      cpfIsError ||
      motherName === "" ||
      occupation === "" ||
      placeOfBirth === "" ||
      !valuePoliticallyExposed ||
      rg === "" ||
      orgaoEmissor === "",
    [
      cpfIsError,
      motherName,
      occupation,
      placeOfBirth,
      valuePoliticallyExposed,
      rg,
      orgaoEmissor,
    ]
  );

  const step3 = useMemo(
    () =>
      add_Address === "" ||
      add_Neighborhood === "" ||
      add_StreetNumber === "" ||
      add_ZipCode === "" ||
      add_Complement === "" ||
      add_City === "" ||
      add_Province === "",
    [
      add_Address,
      add_Neighborhood,
      add_StreetNumber,
      add_ZipCode,
      add_Complement,
      add_City,
      add_Province,
    ]
  );

  const step4 = useMemo(
    () => !selfieUri || !rgFrontUri || !rgBacktoUri || !proofOAddressUri,
    [selfieUri, rgFrontUri, rgBacktoUri, proofOAddressUri]
  );

  function formatOrgEmiss(input: string) {
    const regex = /(\w{3})(\w{2})/;
    const formatted = input.replace(regex, "$1/$2");
    return formatted.toUpperCase();
  }

  const states = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const screenTabs = [
    {
      id: 0,
      name: "Dados pessoais",
      isLast: false,
    },
    {
      id: 1,
      name: "Dados pessoais",
      isLast: false,
    },
    {
      id: 2,
      name: "Endereço",
      isLast: false,
    },
    {
      id: 3,
      name: "Documentos",
      isLast: false,
    },
    {
      id: 4,
      name: "Senha",
      isLast: true,
    },
  ];

  const handleVerifyEmail = async () => {
    const email_verify = await verifyEmail(email);

    if (!email_verify.Sucess) {
      setEmailIsError(true);
    } else {
      setEmailIsError(false);
    }
  };

  const handleVerifyPhone = async () => {
    const phone_verify = await verifyPhohe(ddd, phone);

    if (!phone_verify.Sucess) {
      setPhoneIsError(true);
    } else {
      setPhoneIsError(false);
    }
  };

  const formatBirthDateToISO = (value: string) => {
    return new Date(
      value.slice(3, 5) + "/" + value.slice(0, 2) + "/" + value.slice(6)
    )
  };

  const handleRegister = async () => {
    setLoading(true);

    const payload = {
      FullName: fullName,
      AccountType: "PF",
      Email: email.replace(/\s/g, ""),
      DDD: ddd,
      Phone: phone,
      Device: "DeviceMobile",
      Gender: valueGender,
      PlaceOfBirth: placeOfBirth,
      MonthlyIncome: monthlyIncome,
      MaritalStatus: valueState,
      Add_Address: add_Address,
      Add_Neighborhood: add_Neighborhood,
      Add_StreetNumber: add_StreetNumber,
      Add_ZipCode: add_ZipCode.replace("-", ""),
      Add_Complement: add_Complement,
      Add_City: add_City,
      Add_Province: add_Province,
      Rg: rg,
      DocumentId: cpfMaskRemove(documentId),
      BirthDate: String(formatBirthDateToISO(birthDate)),
      MotherName: motherName,
      IsPoliticallyExposed: valuePoliticallyExposed,
      Hashpass: hashpass,
      PasswordInitial: passwordInitial,
      Base64Self: selfieB64,
      Base64DocFront: rgFrontB64,
      Base64DoBack: rgBacktoB64,
      Base64Proofddress: proofOAddressB64,
      occupation: occupation,
      OrgaoEmissor: orgaoEmissor?.toUpperCase(),
    };

    try {
      const response = await saveClient(payload);
      if (!response.data.Sucess) {
        showToast(`${response.data.Message}`);
      } else {
        showToast(`${response.data.Message}`);
        const obj = {
          token: response.data.Object,
        };
        await AsyncStorage.setItem("@bdkbank:token", response.data.Object);
        setData(obj);
        if (obj) {
          navigation.navigate("VerifyStatus", { id: "phone" });
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      showToast(`Falha no cadastro`);
      setLoading(false);
    }
  };

  const comparePasswordInitial = (pass: string) => {
    const passInit = passwordInitial;
    const passInitTwo = passwordInitialAgain;
    if (String(passInit) === String(pass)) {
      setpasswordInitial(passInit);
      setpasswordInitialMessageError(false);
    } else if (String(pass) === passInitTwo) {
      setpasswordInitial(pass);
      setpasswordInitialMessageError(false);
    } else {
      setpasswordInitialMessageError(true);
    }
  };

  const compareHashPass = (pass: string) => {
    const passInitHash = hashpass;
    const passInitHashTwo = hashpassAgain;
    if (String(passInitHash) === String(pass)) {
      sethashpass(passInitHash);
      sethashpassMessageError(false);
      setfinishRegister(true);
    } else if (String(passInitHashTwo) === String(pass)) {
      sethashpass(pass);
      sethashpassMessageError(false);
      setfinishRegister(true);
    } else {
      sethashpassMessageError(true);
    }
  };

  useEffect(() => {
    setCurrentTitle(() => screenTabs.find((i) => i.id === currentPage)!.name);
  }, [currentPage]);

  function nextPage() {
    if (currentPage >= 0 && currentPage < 4) {
      setCurrentPage((oldValue) => (oldValue += 1));
    }
  }

  function previousPage() {
    if (currentPage > 0 && currentPage <= 4) {
      setCurrentPage((oldValue) => (oldValue -= 1));
    }
  }

  const handlesTakePhoto: TakePhotoProps = {
    takeSelfie: async () => {
      if (cameraRef) {
        const selfie = await cameraRef.takePictureAsync({ quality: 0 });
        console.log(selfie)
        setSelfieUri(selfie.uri);
        const base64Image = await convertToBase64(selfie.uri);
        console.log(base64Image)
        setSelfieB64(base64Image);
        setOpenTakeModal(false);
      }
    },
    takeRGFront: async () => {
      if (cameraRef) {
        const rgFront = await cameraRef.takePictureAsync({ quality: 0 });
        setRGFrontUri(rgFront.uri);
        const base64Image = await convertToBase64(rgFront.uri);
        setRGFrontB64(base64Image);
        setOpenTakeModal(false);
      }
    },
    takeRGBack: async () => {
      if (cameraRef) {
        const rgBack = await cameraRef.takePictureAsync({ quality: 0 });
        setRGBackUri(rgBack.uri);
        const base64Image = await convertToBase64(rgBack.uri);
        setRGBackB64(base64Image);
        setOpenTakeModal(false);
      }
    },
    takeProofOfAddress: async () => {
      if (cameraRef) {
        const proofOfAddress = await cameraRef.takePictureAsync({ quality: 0 });
        setProofOAddressUri(proofOfAddress.uri);
        const base64Image = await convertToBase64(proofOfAddress.uri);
        setProofOAddressB64(base64Image);
        setOpenTakeModal(false);
      }
    },
  };

  function handleOpenCameraModal(currentTake: string) {
    setCurrentTake(currentTake);
    setOpenTakeModal(true);
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const verifyPasswordTwo = () => {};

  useEffect(() => {
    if (hashpass !== "") {
      if (hashpass === hashpassAgain) {
        setpasswordInitialMessageError(false);
      } else {
        setpasswordInitialMessageError(true);
      }
    }
  }, [hashpass, hashpassAgain, passwordInitialMessageError]);

  useEffect(() => {
    if (passwordInitial !== "") {
      if (passwordInitial === passwordInitialAgain) {
        sethashpassMessageError(false);
      } else {
        sethashpassMessageError(true);
      }
    }
  }, [passwordInitial, passwordInitialAgain, hashpassMessageError]);

  return (
    <Container onPress={() => Keyboard.dismiss()}>
      <Title>Registre-se</Title>

      <SubTitle>{currentTitle}</SubTitle>
      <Main>
        {currentPage === 0 && (
          <>
            <Input
              value={fullName}
              placeholder="Nome Completo"
              aria-autocomplete="none"
              setValue={setfullName}
              onChange={setfullName}
            />
            <Input
              value={email}
              placeholder="E-mail"
              setValue={setemail}
              aria-autocomplete="none"
              onChange={setemail}
              onBlur={() => handleVerifyEmail()}
              onFocus={() => setEmailIsError(false)}
              isError={emailIsError}
            />
            <Input
              value={formatBirthDate(birthDate)}
              placeholder="Data de nascimento"
              setValue={setbirthDate}
              aria-autocomplete="none"
              onChange={setbirthDate}
            />
            <Input
              keyboardType="decimal-pad"
              placeholder="DDD"
              value={formatarDDD(ddd)}
              aria-autocomplete="none"
              setValue={setddd}
              length={4}
            />
            <Input
              keyboardType="decimal-pad"
              placeholder="Telefone"
              value={phoneMask(phone)}
              onBlur={() => handleVerifyPhone()}
              onFocus={() => setPhoneIsError(false)}
              setValue={setphone}
              length={14}
              isError={phoneIsError}
            />
            <AmountInput
              placeholder="Renda mensal"
              value={balance}
              setValue={setBalance}
              keyboardType="number-pad"
            />

            <DropDownPicker
              placeholder="Gênero"
              placeholderStyle={{ color: "grey" }}
              open={openGenderPicker}
              value={valueGender}
              items={gender}
              setOpen={setOpenGenderPicker}
              setValue={setValueGender}
              aria-autocomplete="none"
              setItems={setgender}
              style={{ borderColor: "grey", marginBottom: 14 }}
              dropDownDirection="TOP"
            />

            <DropDownPicker
              placeholder="Estado Civil"
              placeholderStyle={{ color: "grey" }}
              open={openStatePicker}
              value={valueState}
              items={maritalStatus}
              aria-autocomplete="none"
              setOpen={setOpenStatePicker}
              setValue={setValueState}
              setItems={setmaritalStatus}
              style={{ borderColor: "grey", marginBottom: 14 }}
              dropDownDirection="TOP"
            />
          </>
        )}

        {currentPage === 1 && (
          <BoxPage1>
            <Input
              keyboardType="decimal-pad"
              placeholder="RG"
              value={formatRG(rg)}
              setValue={setrg}
            />
            <Input
              placeholder="SSP/SP"
              value={formatOrgEmiss(orgaoEmissor)}
              setValue={setOrgaoEmissor}
            />
            <Input
              value={cpfMask(documentId)}
              placeholder="Digite seu CPF"
              setValue={setdocumentId}
              aria-autocomplete="none"
              onChange={setdocumentId}
              keyboardType="decimal-pad"
            />
            <Input
              value={motherName}
              placeholder="Nome da Mãe"
              setValue={setmotherName}
              aria-autocomplete="none"
              onChange={setmotherName}
            />
            <Input
              value={occupation}
              placeholder="Profissões"
              aria-autocomplete="none"
              setValue={setoccupation}
              onChange={setoccupation}
            />
            <Input
              value={placeOfBirth}
              placeholder="Local de Nascimento"
              aria-autocomplete="none"
              setValue={setplaceOfBirth}
              onChange={setplaceOfBirth}
            />
            <DropDownPicker
              placeholder="É politicamente exposto"
              placeholderStyle={{ color: "grey" }}
              open={openPoliticallyExposed}
              value={valuePoliticallyExposed}
              aria-autocomplete="none"
              items={isPoliticallyExposed}
              setOpen={setOpenPoliticallyExposed}
              setValue={setValuePoliticallyExposed}
              setItems={setisPoliticallyExposed}
              style={{ borderColor: "grey", marginBottom: 65 }}
            />
          </BoxPage1>
        )}

        {currentPage === 2 && (
          <>
            <Input
              value={add_Address}
              placeholder="Endereço"
              aria-autocomplete="none"
              setValue={setadd_Address}
            />
            <Input
              value={add_Neighborhood}
              placeholder="Bairro"
              aria-autocomplete="none"
              setValue={setadd_Neighborhood}
            />
            <Input
              value={add_StreetNumber}
              placeholder="Número"
              aria-autocomplete="none"
              setValue={setadd_StreetNumber}
              keyboardType="numeric"
            />
            <Input
              value={formatCEP(add_ZipCode)}
              placeholder="CEP"
              setValue={setadd_ZipCode}
              aria-autocomplete="none"
              keyboardType="decimal-pad"
              length={9}
            />
            <Input
              value={add_Complement}
              placeholder="Complemento"
              aria-autocomplete="none"
              setValue={setadd_Complement}
            />
            <Input
              value={add_City}
              placeholder="Cidade"
              aria-autocomplete="none"
              setValue={setadd_City}
            />
            <Input
              value={add_Province}
              placeholder="UF"
              aria-autocomplete="none"
              setValue={setadd_Province}
              length={2}
            />
          </>
        )}

        {currentPage === 3 && permission!.granted ? (
          <MainDocuments>
            <DocumentContainer>
              <ImagePreview>
                <ImagePreviewFile
                  source={{ uri: selfieUri }}
                  style={{ flex: 1 }}
                />
              </ImagePreview>
              <Button
                width={135}
                color="#F08E34"
                title="Selfie"
                onPress={() => handleOpenCameraModal("takeSelfie")}
              />
            </DocumentContainer>
            <DocumentContainer>
              <ImagePreview>
                <ImagePreviewFile
                  source={{ uri: rgFrontUri }}
                  style={{ flex: 1 }}
                />
              </ImagePreview>
              <Button
                width={135}
                color="#F08E34"
                title="RG (Frente)"
                onPress={() => handleOpenCameraModal("takeRGFront")}
              />
            </DocumentContainer>
            <DocumentContainer>
              <ImagePreview>
                <ImagePreviewFile
                  source={{ uri: rgBacktoUri }}
                  style={{ flex: 1 }}
                />
              </ImagePreview>
              <Button
                width={135}
                color="#F08E34"
                title="RG (Verso)"
                onPress={() => handleOpenCameraModal("takeRGBack")}
              />
            </DocumentContainer>
            <DocumentContainer>
              <ImagePreview>
                <ImagePreviewFile
                  source={{ uri: proofOAddressUri }}
                  style={{ flex: 1 }}
                />
              </ImagePreview>
              <Button
                width={135}
                color="#F08E34"
                title="Comprovante"
                onPress={() => handleOpenCameraModal("takeProofOfAddress")}
              />
            </DocumentContainer>
            <>
              <Modal
                animationType={"slide"}
                transparent={false}
                visible={openTakeModal}
              >
                <Camera
                  style={{ flex: 1 }}
                  type={type}
                  ref={(ref) => setCameraRef(ref)}
                >
                  <CameraMain>
                    <Row align="space-around">
                      <Button
                        color="#6EA965"
                        title="Capturar"
                        //@ts-ignore
                        onPress={handlesTakePhoto[currentTake]}
                      />
                      <FlipCamera onPress={toggleCameraType}>
                        <Icon name="sync-alt" size={20} color="#FFF" />
                      </FlipCamera>
                    </Row>
                  </CameraMain>
                </Camera>
              </Modal>
            </>
          </MainDocuments>
        ) : currentPage === 3 && !permission?.granted ? (
          <>
            <PermissionContainer>
              <PermissionTitle>
                Voce precisa permitir acesso a camera para continuar.
              </PermissionTitle>
              <Button
                color="#F08E34"
                onPress={requestPermission}
                title="Permitir"
              />
            </PermissionContainer>
          </>
        ) : (
          <></>
        )}

        {currentPage === 4 && (
          <>
            <Input
              value={hashpass}
              placeholder="Digite..."
              overTitle="Senha (Com 6 números) *"
              overTitleColor="#FFF"
              isPassword
              keyboardType="decimal-pad"
              setValue={sethashpass}
              onChange={verifyPasswordTwo}
              length={6}
            />

            <Input
              value={hashpassAgain}
              placeholder="Digite..."
              overTitle="Digite novamente"
              overTitleColor="#FFF"
              isPassword
              keyboardType="decimal-pad"
              setValue={sethashpassAgain}
              length={6}
            />
            {passwordInitialMessageError ? (
              <>
                <Text color="#ff0000">Senhas não conferem</Text>
              </>
            ) : (
              ""
            )}
            <Input
              value={passwordInitial}
              placeholder="Digite..."
              overTitle="Senha transacional (Com 8 caracteres)"
              isPassword
              setValue={setpasswordInitial}
              keyboardType="decimal-pad"
              overTitleColor="#FFF"
              length={8}
            />
            <Input
              value={passwordInitialAgain}
              placeholder="Digite..."
              overTitle="Digite novamente a senha"
              overTitleColor="#FFF"
              isPassword
              keyboardType="decimal-pad"
              setValue={setpasswordInitialAgain}
              length={8}
            />
            {hashpassMessageError ? (
              <>
                <Text color="#ff0000">Senhas não conferem</Text>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </Main>

      <Row align={currentPage === 0 ? "flex-end" : "space-between"}>
        {currentPage > 0 && (
          <Button
            title="Voltar"
            color="#5266CE"
            onPress={() => {
              previousPage();
            }}
          />
        )}
        {currentPage === 4 ? (
          <>
            <Button
              title="Registrar"
              color="#6EA965"
              onPress={() => {
                handleRegister();
              }}
              disabled={
                hashpassMessageError ||
                passwordInitialMessageError ||
                hashpass === "" ||
                passwordInitial === "" ||
                loading
              }
              loading={loading}
            />
          </>
        ) : (
          <>
            <Button
              title="Próximo"
              color="#6EA965"
              onPress={() => {
                nextPage();
              }}
              disabled={
                currentPage === 0
                  ? step1
                  : currentPage === 1
                  ? step2
                  : currentPage === 2
                  ? step3
                  : currentPage === 3
                  ? step4
                  : false
              }
            />
          </>
        )}
      </Row>
    </Container>
  );
}

export { Signup };
