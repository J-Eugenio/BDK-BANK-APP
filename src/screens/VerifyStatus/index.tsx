import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import loginAsset from "../../assets/login-page-asset.png";
import { ActivityIndicator, ImageBackground } from "react-native";
import {
  Container,
  PrimaryTitle,
  SecondTitle,
  TextContainer,
  Confirm,
  ConfirmText,
  CodeGroup,
  Code,
  Flex,
  FlexEnd,
  Back,
  TextBox,
} from "./styles";
import {
  confirmEmail,
  confirmPhone,
  resendEmail,
  resendPhone,
  updateEmail,
  updatePhone,
} from "../../service/Apiroutes";
import { useAuth } from "../../hooks/auth";
import { ScreenProp } from "../../../App";
import { showToast } from "../../utils/toast";
import RegressiveCounter from "../../components/RegressiveCounter";
import { Input } from "../../components/Input";
import { phoneRemoveMask, phoneWithDDDMask } from '../../utils/phone-mask';

interface VerifyProps {
  route?: {
    params: {
      id: string;
    };
  };
}

function VerifyStatus({ route }: VerifyProps) {
  const [loading, setLoading] = useState(false);
  const [routeInfoParam, setRouteInfoParam] = useState(0);
  const [codeForPhone01, setcodeForPhone01] = useState("");
  const [codeForPhone02, setcodeForPhone02] = useState("");
  const [codeForPhone03, setcodeForPhone03] = useState("");
  const [codeForPhone04, setcodeForPhone04] = useState("");
  const [codeForPhone05, setcodeForPhone05] = useState("");
  const [codeForEmail01, setcodeForEmail01] = useState("");
  const [codeForEmail02, setcodeForEmail02] = useState("");
  const [codeForEmail03, setcodeForEmail03] = useState("");
  const [codeForEmail04, setcodeForEmail04] = useState("");
  const [codeForRegister, setCodeForRegister] = useState("");
  const [codeForRegisterEmail, setCodeForRegisterEmail] = useState("");
  const [showInput, setShowInput] = useState(0);
  const [phoneUpdate, setphoneUpdate] = useState("");
  const [emailUpdate, setemailUpdate] = useState("");
  const [counterOut, setCounterOut] = useState(false);
 
  //Refs

  const codeForPhone01Ref = useRef();
  const codeForPhone02Ref = useRef();
  const codeForPhone03Ref = useRef();
  const codeForPhone04Ref = useRef();
  const codeForPhone05Ref = useRef();
  const codeForEmail01Ref = useRef();
  const codeForEmail02Ref = useRef();
  const codeForEmail03Ref = useRef();
  const codeForEmail04Ref = useRef();

  const { token, signOut } = useAuth();

  const navigation = useNavigation<ScreenProp>();

  useEffect(() => {
    if (route) {
      if (route.params?.id === "email") {
        setRouteInfoParam(1);
      } else {
        setRouteInfoParam(2);
      }
    }
  }, []);

  
  const redirect = () => {
    navigation.navigate("Login");
  };

  const resendPhoneAndEmail = async (type: number) => {
    if (type === 2) {
      await resendPhone(token);
    }

    if (type === 1) {
      await resendEmail(token);
    }
  };

  const sendPhoneSms = async () => {
    setLoading(true);
    const response = await confirmPhone(Number(codeForRegister), token);
    setLoading(false);
    if (response.data.Sucess === false) {
      showToast(response.data.Message);
    } else {
      navigation.navigate("VerifyStatus", { id: 1 });
      setShowInput(2);
      setRouteInfoParam(1)
    }
  };

  const sendEmail = async () => {
    setLoading(true);
    const response = await confirmEmail(Number(codeForRegisterEmail), token);
    if (response.data.Sucess === false) {
      showToast(response.data.Message);
    } else {
      showToast(response.data.Message);
      redirect();
    }
    setLoading(false);
  };

  const handleupdateEmail = async () => {
    setLoading(true);
    const response = await updateEmail(emailUpdate, token);
    if (response.data.Sucess === true) {
      showToast(response.data.Message);
      setemailUpdate("");
      resendEmail(token);
    } else {
      showToast(response.data.Message);
    }
    setLoading(false);
  };

  const handleupdatePhone = async () => {
    setLoading(true);
    const response = await updatePhone(phoneRemoveMask(phoneUpdate), token);
    if (response.data.Sucess === true) {
      showToast(response.data.Message);
      setphoneUpdate("");
      resendPhone(token);
      setShowInput(2);
    } else {
      showToast(response.data.Message);
    }
    setLoading(false);
  };

  useEffect(() => {
    setCodeForRegister(
      [
        codeForPhone01,
        codeForPhone02,
        codeForPhone03,
        codeForPhone04,
        codeForPhone05,
      ]
        .join()
        .replaceAll(",", "")
    );
  }, [
    codeForPhone01,
    codeForPhone02,
    codeForPhone03,
    codeForPhone04,
    codeForPhone05,
  ]);

  useEffect(() => {
    setCodeForRegisterEmail(
      [codeForEmail01, codeForEmail02, codeForEmail03, codeForEmail04]
        .join()
        .replaceAll(",", "")
    );
  }, [codeForEmail01, codeForEmail02, codeForEmail03, codeForEmail04]);

  return (
    <Container>
      <ImageBackground
        source={loginAsset}
        imageStyle={{
          resizeMode: "contain",
        }}
      >
        <TextContainer>
          {showInput === 2 ? (
            <PrimaryTitle>Atualização de Telefone</PrimaryTitle>
          ) : (
            ""
          )}
          {showInput === 1 ? (
            <PrimaryTitle>Atualização de E-mail</PrimaryTitle>
          ) : (
            ""
          )}
          {showInput === 0 && routeInfoParam === 2 ? (
            <PrimaryTitle>Confirmação de SMS</PrimaryTitle>
          ) : (
            ""
          )}
          {showInput === 0 && routeInfoParam === 1 ? (
            <PrimaryTitle>Confirmação de Email</PrimaryTitle>
          ) : (
            ""
          )}
        </TextContainer>

        {showInput === 2 ? (
          <SecondTitle>Atualize seu Telefone abaixo</SecondTitle>
        ) : (
          ""
        )}
        {showInput === 1 ? (
          <SecondTitle>Atualize seu E-mail abaixo</SecondTitle>
        ) : (
          ""
        )}
        {showInput === 0 && routeInfoParam === 2 ? (
          <SecondTitle>Digite o código que recebeu por SMS</SecondTitle>
        ) : (
          ""
        )}
        {showInput === 0 && routeInfoParam === 1 ? (
          <SecondTitle>Digite o código que recebeu por Email</SecondTitle>
        ) : (
          ""
        )}

        <Flex>
          {routeInfoParam === 2 ? (
            <>
              {showInput === 2 ? (
                <Flex>
                  <TextBox>Telefone</TextBox>
                  <Input
                    value={phoneWithDDDMask(phoneUpdate)}
                    placeholder="Celular"
                    keyboardType="numeric"
                    setValue={setphoneUpdate}
                    onChange={setphoneUpdate}
                  />
                </Flex>
              ) : (
                <>
                  {loading === true ? (
                    <ActivityIndicator color={"#FFF"} size="large" />
                  ) : (
                    <CodeGroup>
                      <Code
                        //@ts-ignore
                        ref={(ref) => (codeForPhone01Ref.current = ref)}
                        keyboardType="decimal-pad"
                        maxLength={1}
                        onChangeText={(e) => {
                          setcodeForPhone01(e)
                          if(e?.length == 1){
                            //@ts-ignore
                            codeForPhone02Ref.current.focus()
                          }
                        }}
                      />
                      <Code
                        //@ts-ignore
                        ref={(ref) => (codeForPhone02Ref.current = ref)}
                        keyboardType="decimal-pad"
                        maxLength={1}
                        onChangeText={(e) => {
                          setcodeForPhone02(e)
                          if(e?.length === 1){
                            //@ts-ignore
                            codeForPhone03Ref.current.focus()
                          } else {
                            //@ts-ignore
                            codeForPhone01Ref.current.focus()
                          }
                        }}
                      />
                      <Code
                        //@ts-ignore
                        ref={(ref) => (codeForPhone03Ref.current = ref)}
                        keyboardType="decimal-pad"
                        maxLength={1}
                        onChangeText={(e) => {
                          setcodeForPhone03(e)
                          if(e?.length === 1){
                            //@ts-ignore
                            codeForPhone04Ref.current.focus()
                          } else {
                            //@ts-ignore
                            codeForPhone02Ref.current.focus()
                          }
                        }}
                      />
                      <Code
                        //@ts-ignore
                        ref={(ref) => (codeForPhone04Ref.current = ref)}
                        keyboardType="decimal-pad"
                        maxLength={1}
                        onChangeText={(e) => {
                          setcodeForPhone04(e)
                          if(e?.length === 1){
                            //@ts-ignore
                            codeForPhone05Ref.current.focus()
                          } else {
                            //@ts-ignore
                            codeForPhone03Ref.current.focus()
                          }
                        }}
                      />
                      <Code
                        //@ts-ignore
                        ref={(ref) => (codeForPhone05Ref.current = ref)}
                        keyboardType="decimal-pad"
                        maxLength={1}
                        onChangeText={(e) => {
                          setcodeForPhone05(e)
                          if(e?.length === 0){
                            //@ts-ignore
                            codeForPhone04Ref.current.focus()
                          }
                        }}
                      />
                    </CodeGroup>
                  )}
                </>
              )}
            </>
          ) : (
            ""
          )}
          {routeInfoParam === 1 ? (
            <>
              {showInput === 1 ? (
                <Flex>
                  <TextBox>E-mail</TextBox>
                  <Input
                    value={emailUpdate}
                    placeholder="E-mail"
                    setValue={setemailUpdate}
                    onChange={setemailUpdate}
                  />
                </Flex>
              ) : (
                <>
                  {loading === true ? (
                    <ActivityIndicator color={"#FFF"} size="large" />
                  ) : (
                    <CodeGroup>
                      <Code
                        //@ts-ignore
                        ref={(ref) => (codeForEmail01Ref.current = ref)}
                        blurOnSubmit={false}
                        keyboardType="decimal-pad"
                        maxLength={1}
                        onChangeText={(e) => {
                          setcodeForEmail01(e)
                          if(e?.length == 1){
                            //@ts-ignore
                            codeForEmail02Ref.current.focus();
                          }
                        }}
                      />
                      <Code
                        //@ts-ignore
                        ref={(ref) => (codeForEmail02Ref.current = ref)}
                        keyboardType="decimal-pad"
                        blurOnSubmit={false}
                        maxLength={1}
                        onChangeText={(e) => {
                          setcodeForEmail02(e)
                          if(e?.length == 1){
                            //@ts-ignore
                            codeForEmail03Ref.current.focus();
                          } else {
                            //@ts-ignore
                            codeForEmail01Ref.current.focus();
                          }
                        }}
                      />
                      <Code
                        //@ts-ignore
                        ref={(ref) => (codeForEmail03Ref.current = ref)}
                        keyboardType="decimal-pad"
                        blurOnSubmit={false}
                        maxLength={1}
                        onChangeText={(e) => {
                          setcodeForEmail03(e)
                          if(e?.length == 1){
                            //@ts-ignore
                            codeForEmail04Ref.current.focus();
                          } else {
                            //@ts-ignore
                            codeForEmail02Ref.current.focus();
                          }
                        }}
                      />
                      <Code
                        //@ts-ignore
                        ref={(ref) => (codeForEmail04Ref.current = ref)}
                        keyboardType="decimal-pad"
                        blurOnSubmit={false}
                        maxLength={1}
                        onChangeText={(e) => {
                          setcodeForEmail04(e)
                          if(e?.length == 0){
                            //@ts-ignore
                            codeForEmail03Ref.current.focus();
                          }
                        }}
                      />
                    </CodeGroup>
                  )}
                </>
              )}
            </>
          ) : (
            ""
          )}
        </Flex>

        <Flex>
          {showInput === 2 ? (
            ""
          ) : (
            <>
              {routeInfoParam === 2 ? (
                <Flex>
                  <RegressiveCounter onReturnTimerOut={setCounterOut} />
                  {counterOut === true ? (
                    <TextBox onPress={() => resendPhoneAndEmail(2)}>
                      Reenviar código
                    </TextBox>
                  ) : (
                    ""
                  )}
                  <FlexEnd>
                    <TextBox onPress={() => setShowInput(2)}>
                      Atualizar o Telefone
                    </TextBox>
                  </FlexEnd>
                </Flex>
              ) : (
                ""
              )}
            </>
          )}
          {showInput === 1 ? (
            ""
          ) : (
            <>
              {routeInfoParam === 1 ? (
                <Flex>
                  <RegressiveCounter onReturnTimerOut={setCounterOut} />
                  {counterOut === true ? (
                    <TextBox onPress={() => resendPhoneAndEmail(1)}>
                      Reenviar código
                    </TextBox>
                  ) : (
                    ""
                  )}
                  <FlexEnd>
                    <TextBox onPress={() => setShowInput(1)}>
                      Atualizar o E-mail
                    </TextBox>
                  </FlexEnd>
                </Flex>
              ) : (
                ""
              )}
            </>
          )}
        </Flex>

        <Flex>
          {showInput === 2 ? (
            ""
          ) : (
            <>
              {routeInfoParam === 2 ? (
                <Confirm disabled={loading} onPress={() => sendPhoneSms()}>
                  {loading ? (
                    <ActivityIndicator color={"#FFF"} size="large" />
                  ) : (
                    <ConfirmText>CONFIRMAR</ConfirmText>
                  )}
                </Confirm>
              ) : (
                ""
              )}
            </>
          )}

          {showInput === 1 ? (
            ""
          ) : (
            <>
              {routeInfoParam === 1 ? (
                <Confirm disabled={loading} onPress={() => sendEmail()}>
                  {loading ? (
                    <>
                      <ActivityIndicator color={"#FFF"} size="large" />
                    </>
                  ) : (
                    <>
                      <ConfirmText>CONFIRMAR</ConfirmText>
                    </>
                  )}
                </Confirm>
              ) : (
                ""
              )}
            </>
          )}

          {showInput === 2 ? (
            <Confirm disabled={loading} onPress={() => handleupdatePhone()}>
              {loading ? (
                <>
                  <ActivityIndicator color={"#FFF"} size="large" />
                </>
              ) : (
                <>
                  <ConfirmText>ATUALIZAR</ConfirmText>
                </>
              )}
            </Confirm>
          ) : (
            ""
          )}
          {showInput === 1 ? (
            <Confirm disabled={loading} onPress={() => handleupdateEmail()}>
              {loading ? (
                <>
                  <ActivityIndicator color={"#FFF"} size="large" />
                </>
              ) : (
                <>
                  <ConfirmText>ATUALIZAR</ConfirmText>
                </>
              )}
            </Confirm>
          ) : (
            ""
          )}
          {
            showInput != 1 && (
              <Back disabled={loading} onPress={() => setShowInput(1)}>
                <TextBox>VOLTAR</TextBox>
              </Back>
            )
          }
        </Flex>
      </ImageBackground>
    </Container>
  );
}

export { VerifyStatus };
