import { useAppRun } from '@/src/context/AppRunContext';
import Constants from 'expo-constants';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, Platform, SafeAreaView } from 'react-native';
// import CustomLoading from './CustomLoading';
import { AppDispatch, RootState } from '@/src/store/store';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  children: ReactNode;
}
const GlobalComponent: React.FC<Props> = ({ children }) => {
  const { isLoading, setIsLoading, isNfcOn, setIsNfcOn } = useAppRun();
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const backgroundTime = useRef<number | null>(null);
  const INACTIVITY_LIMIT_SECONDS = 300; // 5 minutes

  const statusBarHeight = Platform.OS === 'android' ? Constants.statusBarHeight : 0;
  const globalAppState = useSelector((state: RootState) => state.globalAppState);
  const dispatch = useDispatch<AppDispatch>();
  const [appIsReady, setAppIsReady] = useState(false);

//   SplashScreen.preventAutoHideAsync();


  useEffect(() => {
    async function prepare() {
      try {
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);



  return (
    <SafeAreaView style={{ flex: 1, paddingTop: statusBarHeight, backgroundColor: 'gray' }}>
      {children}
      {/* {isLoading && <CustomLoading text_one="Connexion en cours..." text_two="Veuillez patientez" />} */}
    </SafeAreaView>
  );
};

export default GlobalComponent;
