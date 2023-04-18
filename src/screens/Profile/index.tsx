import * as React from 'react';
import { Header } from '../../components/Header';
import {
  Container,
  ImageContainer,
  Image,
  Title,
  Main,
  UserName,
  AccInfoText,
  UserData
} from './styles';
import UserIMG from '../../assets/user-img.png';

import { TabView, SceneMap, TabBar  } from 'react-native-tab-view';
import { TabBarItem } from '../../components/TabBarItem';

const FirstRoute = () => (
  <UserData>
    <TabBarItem />
    <TabBarItem />
    <TabBarItem />
  </UserData>
);

const SecondRoute = () => (
  <UserData />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

function Profile(){
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'first', title: 'Dados' },
    { key: 'second', title: 'Dados' },
  ]);

  return (
    <Container>
      <Header />

      <Title>Minha conta</Title>

      <Main>
        <ImageContainer>
          <Image 
            source={UserIMG}
            resizeMode="contain"
          />
        </ImageContainer>

        <UserName>Usuário</UserName>

        <AccInfoText>Agência: 00000</AccInfoText>
        <AccInfoText>Conta: 00000</AccInfoText>
      </Main>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 30 }}
        renderTabBar={props => <TabBar  {...props} />}
      />
    </Container>
  )
}

export {
  Profile
}