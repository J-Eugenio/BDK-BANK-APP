import * as React from "react";
import { Header } from "../../components/Header";
import {
  Container,
  ImageContainer,
  Image,
  Title,
  Main,
  UserName,
  AccInfoText,
  UserData,
  TabsContainer,
  TabText,
} from "./styles";
import UserIMG from "../../assets/user-img.png";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { TabBarItem } from "../../components/TabBarItem";
import { useAuth } from "../../hooks/auth";
import { phoneMask } from "../../utils/phone-mask";
import { formatMoney } from "../../utils/format-money";
import { cpfMask } from "../../utils/cfp-mask";

const FirstRoute = () => {
  const { user } = useAuth();
  const [arrayUserInfo, setArrayUserInfo] = React.useState([] as any);

  React.useEffect(() => {
    setArrayUserInfo([
      {
        id: 1,
        name: "CPF",
        info: cpfMask(user.CPF),
        icon: "file-text",
      },
      {
        id: 2,
        name: "E-mail",
        info: user.Email,
        icon: "mail",
      },
      {
        id: 3,
        name: "Telefone",
        info: phoneMask(user.Phone),
        icon: "phone",
      },
      {
        id: 4,
        name: "Data de Nascimento",
        info: new Date(user.DateBirth).toLocaleDateString(),
        icon: "calendar",
      },
      {
        id: 5,
        name: "Limite de transferências Pix",
        info: formatMoney.format(user.LimitPix),
        icon: "dollar-sign",
      },
      {
        id: 6,
        name: "Limite de transferências Ted",
        info: formatMoney.format(user.LimitTed),
        icon: "dollar-sign",
      },
    ]);
  }, []);

  return (
    <UserData>
      {arrayUserInfo &&
        arrayUserInfo.map((item: any) => {
          return (
            <TabBarItem
              key={item.id}
              name={item.name}
              value={item.info}
              icon={item.icon}
            />
          );
        })}
    </UserData>
  );
};

const SecondRoute = () => {
  const { user } = useAuth();
  const [arrayUserInfoSuport, setArrayUserInfoSuport] = React.useState(
    [] as any
  );

  React.useEffect(() => {
    setArrayUserInfoSuport([
      {
        id: 1,
        name: "E-mail para suporte",
        info: user.ContactSuportEmail,
        icon: "phone",
      },
      {
        id: 2,
        name: "Telefone para suporte",
        info: user.ContactSuportCell,
        icon: "mail",
      },
    ]);
  }, []);

  return (
    <UserData>
      {arrayUserInfoSuport &&
        arrayUserInfoSuport.map((item: any) => {
          return (
            <TabBarItem
              key={item.id}
              name={item.name}
              value={item.info}
              icon={item.icon}
            />
          );
        })}
    </UserData>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

function Profile() {
  const [index, setIndex] = React.useState(0);
  const { user } = useAuth();
  const [userInfo, setUserInfo] = React.useState({} as any);

  const [routes] = React.useState([
    { key: "first", title: "Dados Pessoais" },
    { key: "second", title: "Contatos para Suporte" },
  ]);

  React.useEffect(() => {
    setUserInfo(user);
  }, []);

  return (
    <Container>
      <Header />

      <Title>Minha conta</Title>

      <Main>
        <ImageContainer>
          <Image source={UserIMG} resizeMode="contain" />
        </ImageContainer>

        <UserName>{userInfo.Name}</UserName>

        <AccInfoText>Agência: {userInfo.Bank}</AccInfoText>
        <AccInfoText>Agência: {userInfo.Agency}</AccInfoText>
        <AccInfoText>Conta: {userInfo.Account}</AccInfoText>

        <TabsContainer>
          <TabText>Dados Pessoais</TabText>

          <FirstRoute />

          <TabText>Contatos para Suporte</TabText>

          <SecondRoute />
        </TabsContainer>
      </Main>
    </Container>
  );
}

export { Profile };
