import { persistor, store } from '@/src/store/store';
import { PortalProvider } from '@gorhom/portal';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, PixelRatio, Text, TextInput } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import GlobalComponent from '../components/globale/GlobalComponent';
import { AppRunProvider } from '../context/AppRunContext';


const FIGMA_WIDTH = 360;
const FIGMA_HEIGHT = 640;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Renvoie une valeur en pourcentage de la largeur de l'écran
const widthPercent = (figmaValue: number): string => {
  const percent = (figmaValue / FIGMA_WIDTH) * 100;
  return `${percent.toFixed(2)}%`;
};

// Renvoie une valeur en pourcentage de la hauteur de l'écran
const heightPercent = (figmaValue: number): string => {
  const percent = (figmaValue / FIGMA_HEIGHT) * 100;
  return `${percent.toFixed(2)}%`;
};
const widthPercentParent = (parentWidth: number, figmaValue: number): string => {
  const percent = (figmaValue / parentWidth) * 100;
  return `${percent.toFixed(2)}%`;
};

// Renvoie une valeur en pourcentage de la hauteur de l'écran
const heightPercentParent = (parenHeight: number, figmaValue: number): string => {
  const percent = (figmaValue / parenHeight) * 100;
  return `${percent.toFixed(2)}%`;
};

function pixelsToDpi(pixelCount: number): number {
  const { width: screenWidthPx } = Dimensions.get('screen');
  const screenWidthInches = screenWidthPx / PixelRatio.getPixelSizeForLayoutSize(screenWidthPx);
  const dpi = pixelCount / screenWidthInches;
  return dpi;
}

export default function Layout() {
  const pathname = usePathname();
  const [loaded, error] = useFonts({
    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-BlackItalic': require('../assets/fonts/Roboto-BlackItalic.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-BoldItalic': require('../assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Italic': require('../assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-LightItalic': require('../assets/fonts/Roboto-LightItalic.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-MediumItalic': require('../assets/fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
    'Roboto-ThinItalic': require('../assets/fonts/Roboto-ThinItalic.ttf'),
    'Roboto-condensed': require('../assets/fonts/RobotoCondensed-VariableFont_wght.ttf'),
    'Roboto-CondensedItalic': require('../assets/fonts/RobotoCondensed-Italic-VariableFont_wght.ttf'),
    'BarlowCondensed-Black': require('../assets/fonts/BarlowCondensed-Black.ttf'),
    'BarlowCondensed-Light': require('../assets/fonts/BarlowCondensed-Light.ttf'),
    'BarlowCondensed-Medium': require('../assets/fonts/BarlowCondensed-Medium.ttf'),
    'BarlowCondensed-Regular': require('../assets/fonts/BarlowCondensed-Regular.ttf'),
    'BarlowCondensed-SemiBold': require('../assets/fonts/BarlowCondensed-SemiBold.ttf'),
    'BarlowCondensed-Thin': require('../assets/fonts/BarlowCondensed-Thin.ttf'),
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Thin': require('../assets/fonts/Montserrat-Thin.ttf'),
  });



  const responsiveFontSize = (figmaFontSize: number): number => {
    const scale = SCREEN_WIDTH / FIGMA_WIDTH;
    return figmaFontSize * scale;
  };
  //@ts-ignore
  Text.defaultProps = {
    //@ts-ignore
    ...(Text.defaultProps || {}),
    allowFontScaling: false,
  };
  //@ts-ignore
  TextInput.defaultProps = {
    //@ts-ignore
    ...(TextInput.defaultProps || {}),
    allowFontScaling: false,
  };

  // console.log('dppiiiiii:',responsiveFontSize(18))
  console.log("Veritale valueheight : ", heightPercent(57))
  // console.log("Veritale valueheight : ", heightPercent(275))
  // console.log("Veritale valuewidth : ", widthPercent(337))
  // console.log('Veritale valueFFFFhh : ', heightPercentParent(540, 42));
  // console.log("horizontale withd parent  : ", widthPercentParent(386, 23))

  useEffect(() => {
    // console.log('📍 Nouvelle route :', pathname);
  }, [pathname]);

  return (
    <AppRunProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PortalProvider>
            <GlobalComponent>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </GlobalComponent>
          </PortalProvider>
        </PersistGate>

        {/* <StatusBar hidden={true} backgroundColor='transparent' />  */}
      </Provider>
    </AppRunProvider>
  );
}
