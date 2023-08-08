import React from "react";
import { useEffect, useState } from "react";
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
  Text
} from "./styles";
import { convertToBase64 } from "../../utils/convertToBase64 ";
import { useNavigation } from "@react-navigation/native";
import { ScreenProp } from "../../../App";
import validCPFForReal, { cpfMask, formatRG } from "../../utils/cfp-mask";
import { validadata } from "../../utils/validBirthdate";
import { saveClient, verifyEmail, verifyPhohe } from "../../service/Apiroutes";
import { showToast } from "../../utils/toast";
import { useAuth } from "../../hooks/auth";
import { AmountInput } from "../../components/AmountInput";
import { formatarDDD, phoneMask } from "../../utils/phone-mask";
import { formatCEP } from "../../utils/formatCep";

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
  const [valuePoliticallyExposed, setValuePoliticallyExposed] = useState<any>(null);
  const [birthday, setBirthday] = useState();

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
  const [birthDate, setbirthDate] = useState();
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

  const handleVerifyEmail = async (email: string) => {
    const email_verify = await verifyEmail(email);

    if (email_verify.data.Sucess === true) {
      return true;
    } else {
      showToast(`${email_verify.data.Message}`);
      setemail("");
    }
  };

  const handleVerifyPhone = async (phone: string) => {
    const phone_verify = await verifyPhohe(ddd, phone);

    if (phone_verify.data.Sucess === true) {
      return true;
    } else {
      setphone("");
      showToast(`${phone_verify.data.Message}`);
    }
  };

  const handleRegister = async () => {
    setLoading(true);

    const payload = {
      FullName: fullName,
      AccountType: "PF",
      Email: email.replace(/\s/g, ""),
      DDD: ddd,
      Phone: phone,
      Device: "DeviceWeb",
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
      DocumentId: documentId,
      BirthDate: birthDate,
      MotherName: motherName,
      IsPoliticallyExposed: valuePoliticallyExposed,
      Hashpass: hashpass,
      PasswordInitial: passwordInitial,
      Base64Self: selfieB64,
      Base64DocFront: rgFrontB64,
      Base64DoBack: rgBacktoB64,
      Base64Proofddress: proofOAddressB64,
      occupation: occupation,
    };

    console.log(birthDate)
    // try {
    //   const response = await saveClient(payload);
    //   if (response.data.Sucess === false) {
    //     showToast(`${response.data.Message}`);
    //   } else {
    //     const obj = {
    //       token: response.data.Object,
    //       user: response.data,
    //     };
    //     localStorage.setItem("@bdkbank:token", response.data.Object);
    //     localStorage.setItem("@bdkbank:user", JSON.stringify(response.data));
    //     setData(obj);
    //     navigation.navigate("VerifyStatus", { id: "phone" });
    //   }
    // } catch (error) {
    //   showToast(`Falha no cadastro`);
    // }

    setLoading(false);
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

  const validPasswordCaractersAndNumbers = async (
    pass: string,
    code: number
  ) => {
    if (code === 1) {
      // contain only numbers
      const validOne = /^\d+$/.test(pass);
      if (validOne === true) {
        await setpasswordInitial(pass);
        await setIsNotValidOne(false);
      } else {
        await setIsNotValidOne(true);
      }
    }
    if (code === 2) {
      // contain numbers and letters
      const validTwo = /^[A-Za-z0-9]*$/.test(pass);
      if (validTwo === true) {
        await sethashpass(pass);
        await setIsNotValidTwo(false);
      } else {
        await setIsNotValidTwo(true);
      }
    }
  };

  const validFieldsOfRegister = async (
    fieldName: string,
    field: any,
    ref: string
  ) => {
    let validRef = false;
    if (ref === "0") {
      switch (fieldName) {
        case "fullName":
          const validName = field.length > 5;
          if (validName) {
            validRef = true;
          } else {
            showToast("Digite um nome válido");
          }
          break;

        case "email":
          const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(field);
          const validEmailTwo = /\s/g.test(field);
          const validEmailThree = await handleVerifyEmail(field);
          if (validEmail && !validEmailTwo && validEmailThree) {
            validRef = true;
          } else {
            showToast("Digite um E-mail válido");
          }
          break;

        case "ddd":
          const validDdd = /^\d+$/.test(field);
          if (validDdd) {
            validRef = true;
          } else {
            showToast("Digite um DDD válido");
          }
          break;

        case "phone":
          const validphone = /^\d+$/.test(field);
          const verifyPhoneFunction = await handleVerifyPhone(ddd + field);
          if (validphone && verifyPhoneFunction) {
            validRef = true;
          } else {
            showToast("Digite um número de celular válido");
          }
          break;

        case "gender":
          const validgender = /^[A-Za-z]+$/.test(field);
          if (validgender) {
            validRef = true;
          } else {
            showToast("Selecione um gênero válido");
          }
          break;

        case "placeOfBirth":
          if (field) {
            validRef = true;
          } else {
            showToast("Selecione um local válido");
          }
          break;

        case "birthDate":
          const birthDateValid = validadata(field);
          if (birthDateValid) {
            validRef = true;
          } else {
            showToast("Menores de 18 anos não podem realizar o cadastro!");
          }
          break;
        case "maritalStatus":
          const validmaritalStatus = /^[A-Za-z]+$/.test(field);
          if (validmaritalStatus) {
            validRef = true;
          } else {
            showToast("Selecione um estado civil válido");
          }
          break;
        case "monthlyIncome":
          if (field > 0) {
            validRef = true;
          } else {
            showToast("Digite uma renda válida");
          }
          break;

        default:
          break;
      }
    }

    if (ref === "1") {
      switch (fieldName) {
        case "occupation":
          if (field) {
            validRef = true;
          } else {
            showToast("Digite uma profissão válida");
          }
          break;

        case "isPoliticallyExposed":
          if (field) {
            validRef = true;
          } else {
            showToast("Selecione corretamente se é politicamente exposto");
          }
          break;

        case "motherName":
          if (field) {
            validRef = true;
          } else {
            showToast("Digite um nome válido para o campo 'Nome da Mãe'");
          }
          break;

        case "documentId":
          const validdocumentId = validCPFForReal(field);
          if (validdocumentId) {
            validRef = true;
          } else {
            showToast("Digite seu CPF corretamente");
          }
          break;

        case "rg":
          const validrg = /^\d+$/.test(field);
          if (validrg) {
            validRef = true;
          } else {
            showToast("Digite seu RG corretamente");
          }
          break;

        default:
          break;
      }
    }

    if (ref === "2") {
      switch (fieldName) {
        case "add_Address":
          if (field) {
            validRef = true;
          } else {
            showToast("Digite seu endereço válido");
          }
          break;
        case "add_Neighborhood":
          if (field) {
            validRef = true;
          } else {
            showToast("Digite seu bairro válido");
          }
          break;
        case "add_StreetNumber":
          if (field) {
            validRef = true;
          } else {
            showToast("Digite seu número válido");
          }
          break;
        case "add_ZipCode":
          const validadd_ZipCode = /^\d+$/.test(field);
          const validadd_ZipCodeLength = field.length === 8;
          if (validadd_ZipCode) {
            validRef = true;
          } else {
            showToast("Digite seu CEP válido");
          }
          break;
        case "add_Complement":
          const validadd_Complement = field;
          if (validadd_Complement) {
            validRef = true;
          } else {
            showToast("Digite seu complemento válido");
          }
          break;
        case "add_City":
          if (field.length > 1) {
            validRef = true;
          } else {
            showToast("Digite seu cidade válido");
          }
          break;
        case "add_Province":
          const valiadd_Province = states.includes(field);
          if (valiadd_Province) {
            validRef = true;
          } else {
            showToast("Digite seu estado válido");
          }
          break;
        default:
          break;
      }
    }
    if (ref === "3") {
      switch (fieldName) {
        case "fileSelfie":
          if (field) {
            validRef = true;
          } else {
            showToast("Digite uma foto Selfie");
          }
          break;
        case "fileDocFront":
          if (field) {
            validRef = true;
          } else {
            showToast("Selecione um arquivo para o RG / CNH (FRENTE)");
          }
          break;
        case "fileDocBack":
          if (field) {
            validRef = true;
          } else {
            showToast("Selecione um arquivo para o RG / CNH (VERSO)");
          }
          break;
        case "fileProofddress":
          if (field) {
            validRef = true;
          } else {
            showToast("Selecione um arquivo para o comprovante de endereço");
          }
          break;

        default:
          break;
      }
    }
    if (ref === "4") {
      switch (fieldName) {
        case "hashpass":
          const valihashpass = field.length === 8;
          const validHashPass = String(hashpass) === String(hashpassAgain);
          if (valihashpass && validHashPass) {
            validRef = true;
          } else {
            showToast("Digite um uma senha transacional válida");
          }
          break;

        case "passwordInitial":
          const valipasswordInitial = field.length === 6;
          const validInitialPass =
            String(passwordInitial) === String(passwordInitialAgain);

          if (valipasswordInitial && validInitialPass) {
            validRef = true;
          } else {
            showToast("Digite um uma senha válida");
          }
          break;

        default:
          break;
      }
    }
    return validRef;
  };

  const validZeroStep = async () => {
    const fullNameValidation = await validFieldsOfRegister(
      "fullName",
      fullName,
      "0"
    );
    const emailValidation = await validFieldsOfRegister("email", email, "0");
    const dddValidation = await validFieldsOfRegister("ddd", ddd, "0");
    const phoneValidation = await validFieldsOfRegister("phone", phone, "0");
    const genderValidation = await validFieldsOfRegister("gender", gender, "0");
    const placeOfBirthValidation = await validFieldsOfRegister(
      "placeOfBirth",
      placeOfBirth,
      "0"
    );
    const birthDateValidation = await validFieldsOfRegister(
      "birthDate",
      birthDate,
      "0"
    );
    const monthlyIncomeValidation = await validFieldsOfRegister(
      "monthlyIncome",
      monthlyIncome,
      "0"
    );
    const maritalStatusValidation = await validFieldsOfRegister(
      "maritalStatus",
      maritalStatus,
      "0"
    );

    if (
      fullNameValidation &&
      emailValidation &&
      dddValidation &&
      phoneValidation &&
      genderValidation &&
      placeOfBirthValidation &&
      birthDateValidation &&
      monthlyIncomeValidation &&
      maritalStatusValidation
    ) {
      return true;
    } else {
      return false;
    }
  };

  const validFirstStep = async () => {
    const rgValidation = await validFieldsOfRegister("rg", rg, "1");
    const documentIdValidation = await validFieldsOfRegister(
      "documentId",
      documentId,
      "1"
    );
    const motherNameValidation = await validFieldsOfRegister(
      "motherName",
      motherName,
      "1"
    );
    const isPoliticallyExposedValidation = await validFieldsOfRegister(
      "isPoliticallyExposed",
      isPoliticallyExposed,
      "1"
    );
    const occupationValidation = await validFieldsOfRegister(
      "occupation",
      occupation,
      "1"
    );
    if (
      rgValidation &&
      documentIdValidation &&
      motherNameValidation &&
      isPoliticallyExposedValidation &&
      occupationValidation
    ) {
      return true;
    } else {
      return false;
    }
  };

  const validSecondStep = async () => {
    const add_AddressValidation = await validFieldsOfRegister(
      "add_Address",
      add_Address,
      "2"
    );
    const add_NeighborhoodValidation = await validFieldsOfRegister(
      "add_Neighborhood",
      add_Neighborhood,
      "2"
    );
    const add_StreetNumberValidation = await validFieldsOfRegister(
      "add_StreetNumber",
      add_StreetNumber,
      "2"
    );
    const add_ZipCodeValidation = await validFieldsOfRegister(
      "add_ZipCode",
      add_ZipCode.replace("-", ""),
      "2"
    );
    const add_ComplementValidation = await validFieldsOfRegister(
      "add_Complement",
      add_Complement,
      "2"
    );
    const add_CityValidation = await validFieldsOfRegister(
      "add_City",
      add_City,
      "2"
    );
    const add_ProvinceValidation = await validFieldsOfRegister(
      "add_Province",
      add_Province,
      "2"
    );

    if (
      add_AddressValidation &&
      add_NeighborhoodValidation &&
      add_StreetNumberValidation &&
      add_ZipCodeValidation &&
      add_ComplementValidation &&
      add_CityValidation &&
      add_ProvinceValidation
    ) {
      return true;
    } else {
      return false;
    }
  };

  const validThirdStep = async () => {
    const fileSelfieValidation = await validFieldsOfRegister(
      "selfieB64",
      selfieB64,
      "3"
    );
    const fileDocFrontValidation = await validFieldsOfRegister(
      "rgFrontB64",
      rgFrontB64,
      "3"
    );
    const fileDocBackValidation = await validFieldsOfRegister(
      "rgBacktoB64",
      rgBacktoB64,
      "3"
    );
    const fileProofddressValidation = await validFieldsOfRegister(
      "proofOAddressB64",
      proofOAddressB64,
      "3"
    );

    if (
      fileSelfieValidation &&
      fileDocFrontValidation &&
      fileDocBackValidation &&
      fileProofddressValidation
    ) {
      return true;
    } else {
      return false;
    }
  };

  const validFourthStep = async () => {
    const hashpassValidation = await validFieldsOfRegister(
      "hashpass",
      hashpass,
      "4"
    );
    const passwordInitialValidation = await validFieldsOfRegister(
      "passwordInitial",
      passwordInitial,
      "4"
    );

    if (hashpassValidation && passwordInitialValidation) {
      return true;
    } else {
      return false;
    }
  };

  const handleValidCurrentStep = async (step: number) => {
    if (step === 0) {
      const zeroStepValidate = await validZeroStep();
      if (zeroStepValidate) {
        setCurrentPage(1);
      } else {
        setCurrentPage(0);
      }
    }
    if (step === 1) {
      const firsthStepValidade = await validFirstStep();
      if (firsthStepValidade) {
        setCurrentPage(2);
      } else {
        setCurrentPage(1);
      }
    }
    if (step === 2) {
      const secondStepValidade = await validSecondStep();
      if (secondStepValidade) {
        setCurrentPage(3);
      } else {
        setCurrentPage(2);
      }
    }
    if (step === 3) {
      const thirthStepValidade = await validThirdStep();
      if (thirthStepValidade) {
        setCurrentPage(4);
      } else {
        setCurrentPage(3);
      }
    }
    if (step === 4) {
      const fourthStepValidate = await validFourthStep();
      if (fourthStepValidate) {
        handleRegister();
      } else {
        setCurrentPage(4);
      }
    }
  };

  useEffect(() => {
    setCurrentTitle(() => screenTabs.find((i) => i.id === currentPage)!.name);
  }, [currentPage]);

  function nextPage() {
    if (currentPage >= 0 && currentPage < 4) {
      handleValidCurrentStep(currentPage + 1);
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
        const selfie = await cameraRef.takePictureAsync({ quality: 1 });
        setSelfieUri(selfie.uri);
        const base64Image = await convertToBase64(selfie.uri);
        setSelfieB64(base64Image);
        setOpenTakeModal(false);
      }
    },
    takeRGFront: async () => {
      if (cameraRef) {
        const rgFront = await cameraRef.takePictureAsync({ quality: 1 });
        setRGFrontUri(rgFront.uri);
        const base64Image = await convertToBase64(rgFront.uri);
        setRGFrontB64(base64Image);
        setOpenTakeModal(false);
      }
    },
    takeRGBack: async () => {
      if (cameraRef) {
        const rgBack = await cameraRef.takePictureAsync({ quality: 1 });
        setRGBackUri(rgBack.uri);
        const base64Image = await convertToBase64(rgBack.uri);
        setRGBackB64(base64Image);
        setOpenTakeModal(false);
      }
    },
    takeProofOfAddress: async () => {
      if (cameraRef) {
        const proofOfAddress = await cameraRef.takePictureAsync({ quality: 1 });
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

  const verifyPasswordOne = () => {
    validPasswordCaractersAndNumbers(passwordInitial, 1);
    comparePasswordInitial(passwordInitial);
  };

  const verifyPasswordOneCompare = () => {
    comparePasswordInitial(passwordInitial);
  };

  const verifyPasswordTwo = () => {
    validPasswordCaractersAndNumbers(hashpass, 2);
  };

  const verifyPasswordTwoCompare = () => {
    sethashpassAgain(hashpassAgain);
    compareHashPass(hashpassAgain);
  };

  return (
    <Container
      onPress={() => Keyboard.dismiss()}
    >
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
            />
            <Input
              placeholder="Data de Nascimento"
              isDateInput
              value={birthDate}
              aria-autocomplete="none"
              setValue={setbirthDate}
              onChange={setbirthDate}
            />
            <Input
              keyboardType="decimal-pad"
              placeholder="DDD"
              value={formatarDDD(ddd)}
              aria-autocomplete="none"
              setValue={setddd}
              onChange={setddd}
              maxLenght={4}
            />
            <Input
              keyboardType="decimal-pad"
              placeholder="Telefone"
              value={phoneMask(phone)}
              aria-autocomplete="none"
              setValue={setphone}
              onChange={setphone}
              maxLenght={14}
            />
            <AmountInput
              placeholder="Renda mensal"
              value={balance}
              setValue={setBalance}
              onChange={setBalance}
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
          <>
            <Input
              keyboardType="decimal-pad"
              placeholder="RG"
              value={formatRG(rg)}
              setValue={setrg}
              aria-autocomplete="none"
              onChange={setrg}
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
              style={{ borderColor: "grey", marginBottom: 14 }}
            />
          </>
        )}

        {currentPage === 2 && (
          <>
            <Input
              value={add_Address}
              placeholder="Endereço"
              aria-autocomplete="none"
              setValue={setadd_Address}
              onChange={setadd_Address}
            />
            <Input
              value={add_Neighborhood}
              placeholder="Bairro"
              aria-autocomplete="none"
              setValue={setadd_Neighborhood}
              onChange={setadd_Neighborhood}
            />
            <Input
              value={add_StreetNumber}
              placeholder="Número"
              aria-autocomplete="none"
              setValue={setadd_StreetNumber}
              onChange={setadd_StreetNumber}
            />
            <Input
              value={formatCEP(add_ZipCode)}
              placeholder="CEP"
              setValue={setadd_ZipCode}
              aria-autocomplete="none"
              onChange={setadd_ZipCode}
              keyboardType="decimal-pad"
              maxLenght={9}
            />
            <Input
              value={add_Complement}
              placeholder="Complemento"
              aria-autocomplete="none"
              setValue={setadd_Complement}
              onChange={setadd_Complement}
            />
            <Input
              value={add_City}
              placeholder="Cidade"
              aria-autocomplete="none"
              setValue={setadd_City}
              onChange={setadd_City}
            />
            <Input
              value={add_Province}
              placeholder="UF"
              aria-autocomplete="none"
              setValue={setadd_Province}
              onChange={setadd_Province}
              maxLenght={2}
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
            {isNotValidOne === true ? (
              <BoxError>
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Senha não válida
                </Text> 
              </BoxError>
            ) : (
              ""
            )}

            {isNotValidTwo === true ? (
              <BoxError>
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Senha transacional não válida
                </Text> 
              </BoxError>
            ) : (
              ""
            )}

            <Input
              value={hashpass}
              placeholder="Senha"
              overTitle="Senha"
              isPassword
              setValue={sethashpass}
              onChange={verifyPasswordTwo}
            />
            <Text>(Com 6 letras / números) *</Text>

            <Input
              value={hashpassAgain}
              placeholder="Digite novamente a senha"
              isPassword
              setValue={sethashpassAgain}
              onChange={verifyPasswordTwoCompare}
            />
            {passwordInitialMessageError === true ? (
              <>
                <Text>Senhas não conferem</Text>
              </>
            ) : (
              ""
            )}
            <Input
              value={passwordInitialAgain}
              placeholder="Senha transacional (Apenas Numeros *)"
              overTitle="Senha transacional"
              isPassword
              setValue={setpasswordInitialAgain}
              onChange={verifyPasswordOneCompare}
            />
            <Text>(Com apenas 8 números) *</Text>
            <Input
              value={passwordInitialAgain}
              placeholder="Digite novamente a senha"
              isPassword
              setValue={setpasswordInitialAgain}
              onChange={verifyPasswordOneCompare}
            />
            {hashpassMessageError === true ? (
              <>
                <Text>Senhas não conferem</Text>
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
                handleRegister()
              }}
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
            />
          </>
        )}
      </Row>
    </Container>
  );
}

export { Signup };
