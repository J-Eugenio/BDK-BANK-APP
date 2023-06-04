import { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import { Camera, CameraType } from 'expo-camera';
import { Button } from '../../components/Button';
import { Row } from '../../components/Flex/Row';
import { Input } from '../../components/Input';
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
  FlipCamera
} from './styles';
import { convertToBase64 } from '../../utils/convertToBase64 ';

interface TakePhotoProps {
  takeSelfie: () => Promise<void>;
  takeRGFront: () => Promise<void>;
  takeRGBack: () => Promise<void>;
  takeProofOfAddress: () => Promise<void>;
}

function Signup(){
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("Dados pessoais");
  const [openGenderPicker, setOpenGenderPicker] = useState(false);
  const [openStatePicker, setOpenStatePicker] = useState(false);
  const [openPoliticallyExposed, setOpenPoliticallyExposed] = useState(false);
  const [valueGender, setValueGender] = useState(null);
  const [valueState, setValueState] = useState(null);
  const [valuePoliticallyExposed, setValuePoliticallyExposed] = useState(null);
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
  const [currentTake, setCurrentTake] = useState<any>()
  const [openTakeModal, setOpenTakeModal] = useState(false)


  const [gender, setGender] = useState([
    {label: 'Feminino', value: 'F'},
    {label: 'Masculino', value: 'M'},
    {label: 'Outros', value: 'O'}
  ]);
  const [state, setState] = useState([
    {label: 'Solteiro', value: 'S'},
    {label: 'Casado', value: 'C'},
    {label: 'Divorciado', value: 'D'},
    {label: 'Viúvo', value: 'V'},
  ]);
  const [politicallyExposed, setPoliticallyExposed] = useState([
    {label: 'Sim', value: 's'},
    {label: 'Não', value: 'n'},
  ]);



  const screenTabs = [
    {
      id: 0,
      name: 'Dados pessoais',
      isLast: false
    },
    {
      id: 1,
      name: 'Dados pessoais',
      isLast: false
    },
    {
      id: 2,
      name: 'Endereço',
      isLast: false
    },
    {
      id: 3,
      name: 'Documentos',
      isLast: false
    },
    {
      id: 4,
      name: 'Senha',
      isLast: true
    }
  ]


  useEffect(() => {
    setCurrentTitle(() => screenTabs.find(i => i.id === currentPage)!.name)
  },[currentPage])

  function nextPage(){
    if(currentPage >= 0 && currentPage < 4){
      setCurrentPage(oldValue => oldValue+=1);
    }
  }

  function previousPage(){
    if(currentPage > 0 && currentPage <= 4){
      setCurrentPage(oldValue => oldValue-=1);
    }
  }

  const handlesTakePhoto: TakePhotoProps = {
    takeSelfie: async () => {
      if (cameraRef) {
        const selfie = await cameraRef.takePictureAsync({ quality: 1 });
        setSelfieUri(selfie.uri);
        const base64Image = await convertToBase64(selfie.uri);
        setOpenTakeModal(false)
      }
    },
    takeRGFront: async () => {
      if (cameraRef) {
        const rgFront = await cameraRef.takePictureAsync({ quality: 1 });
        setRGFrontUri(rgFront.uri);
        const base64Image = await convertToBase64(rgFront.uri);
        setOpenTakeModal(false)

      }
    },
    takeRGBack: async () => {
      if (cameraRef) {
        const rgBack = await cameraRef.takePictureAsync({ quality: 1 });
        setRGBackUri(rgBack.uri);
        const base64Image = await convertToBase64(rgBack.uri);
        setOpenTakeModal(false)

      }
    },
    takeProofOfAddress: async () => {
      if (cameraRef) {
        const proofOfAddress = await cameraRef.takePictureAsync({ quality: 1 });
        setProofOAddressUri(proofOfAddress.uri);
        const base64Image = await convertToBase64(proofOfAddress.uri);
        setOpenTakeModal(false)

      }
    },
  }

  function handleOpenCameraModal(currentTake: string){
    setCurrentTake(currentTake);
    setOpenTakeModal(true);
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  
  return (
    <Container>
      <Title>Registre-se</Title>
      
      <SubTitle>{currentTitle}</SubTitle>
      <Main>
        {
          currentPage === 0 && (
            <>
              <Input placeholder='Nome completo'/>
              <Input placeholder='E-mail'/>
              <Input 
                placeholder='Data de Nascimento' 
                isDateInput
                value={birthday}
                setValue={setBirthday}
              />
              <Input 
                keyboardType='decimal-pad'
                placeholder='DDD + Telefone'
              />

              <Input 
                icon
                iconName='wallet'
                placeholder='Renda Mensal'
              />

              <DropDownPicker
                placeholder='Gênero'
                placeholderStyle={{ color: 'grey' }}
                open={openGenderPicker}
                value={valueGender}
                items={gender}
                setOpen={setOpenGenderPicker}
                setValue={setValueGender}
                setItems={setGender}
                style={{ borderColor: 'grey', marginBottom: 14 }}
                dropDownDirection="TOP"
              />

              <DropDownPicker
                placeholder='Estado Civil'
                placeholderStyle={{ color: 'grey' }}
                open={openStatePicker}
                value={valueState}
                items={state}
                setOpen={setOpenStatePicker}
                setValue={setValueState}
                setItems={setState}
                style={{ borderColor: 'grey', marginBottom: 14 }}
                dropDownDirection="TOP"
              />
            </>
          )
        }

        {
          currentPage === 1 && (
            <>
              <Input placeholder='Digite seu RG'/>
              <Input placeholder='Digite seu CPF'/>
              <Input placeholder='Nome da Mãe'/>
              <Input placeholder='Profissões'/>
              <Input  placeholder='Local de Nascimento'/>
              <DropDownPicker
                placeholder='É politicamente exposto'
                placeholderStyle={{ color: 'grey' }}
                open={openPoliticallyExposed}
                value={valuePoliticallyExposed}
                items={politicallyExposed}
                setOpen={setOpenPoliticallyExposed}
                setValue={setValuePoliticallyExposed}
                setItems={setPoliticallyExposed}
                style={{ borderColor: 'grey', marginBottom: 14 }}
              />
            </>
          )
        }

        {
          currentPage === 2 && (
            <>
              <Input placeholder='Endereço'/>
              <Input placeholder='Bairro'/>
              <Input placeholder='Número'/>
              <Input placeholder='Digite o seu CEP'/>
              <Input  placeholder='Complemento'/>
              <Input  placeholder='Cidade'/>
              <Input  placeholder='Digite a UF do estado'/>
            </>
          )
        }

        {
          currentPage === 3 && permission!.granted  ? (
            <MainDocuments>
              <DocumentContainer>
                <ImagePreview>
                  <ImagePreviewFile source={{ uri: selfieUri }} style={{ flex: 1 }} />
                </ImagePreview>
                <Button 
                  width={135}
                  color='#F08E34' 
                  title='Selfie'
                  onPress={() => handleOpenCameraModal("takeSelfie")}
                />
              </DocumentContainer>
              <DocumentContainer>
                <ImagePreview>
                  <ImagePreviewFile source={{ uri: rgFrontUri }} style={{ flex: 1 }} />
                </ImagePreview>
                <Button 
                  width={135}
                  color='#F08E34' 
                  title='RG (Frente)'
                  onPress={() => handleOpenCameraModal("takeRGFront")}
                />
              </DocumentContainer>
              <DocumentContainer>
                <ImagePreview>
                  <ImagePreviewFile source={{ uri: rgBacktoUri }} style={{ flex: 1 }} />
                </ImagePreview>
                <Button 
                  width={135}
                  color='#F08E34' 
                  title='RG (Verso)'
                  onPress={() => handleOpenCameraModal("takeRGBack")}
                />
              </DocumentContainer>
              <DocumentContainer>
                <ImagePreview>
                  <ImagePreviewFile source={{ uri: proofOAddressUri }} style={{ flex: 1 }} />
                </ImagePreview>
                <Button 
                  width={135}
                  color='#F08E34' 
                  title='Comprovante'
                  onPress={() => handleOpenCameraModal("takeProofOfAddress")}
                />
              </DocumentContainer>
              <>
              <Modal
                animationType={'slide'}
                transparent={false}
                visible={openTakeModal}
              >
                <Camera
                  style={{ flex: 1 }}
                  type={type}
                  ref={ref => setCameraRef(ref)}
                >
                  <CameraMain>
                    <Row align='space-around'>
                      <Button 
                        color='#6EA965'
                        title='Capturar'
                        //@ts-ignore
                        onPress={handlesTakePhoto[currentTake]}
                      />
                      <FlipCamera
                        onPress={toggleCameraType}
                      >
                        <Icon 
                          name="sync-alt"
                          size={20}
                          color="#FFF"
                        />
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
                <PermissionTitle>Voce precisa permitir acesso a camera para continuar.</PermissionTitle>
                <Button color='#F08E34' onPress={requestPermission} title="Permitir" />
              </PermissionContainer>
            </>
          ) : (<></>)
        }
      </Main>
      

      <Row align={currentPage === 0 ? 'flex-end' : 'space-between'}>
        {
          currentPage > 0 && (
            <Button 
              title='Voltar'
              color='#5266CE'
              onPress={() => {
                previousPage()
              }}
            />
          )
        }
        <Button 
          title='Próximo'
          color='#6EA965'
          onPress={() => {
            nextPage()
          }}
          
        />
      </Row>

    </Container>
  )
}

export {
  Signup
}
