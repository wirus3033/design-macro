import fonts from "@/src/constants/assets/fonts";
import { Colors } from "@/src/constants/Colors";
import { hp } from "@/src/utils/responsive";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "../ui/PrimaryButton";

const { width, height } = Dimensions.get("window");

type Slide = {
  id: string;
  title: string;
  description: string;
  image: any;
};

const slides: Slide[] = [
  {
    id: "1",
    title: "CRÉDITS ACCESSIBLES ",
    description:
      "Obtenez un financement rapidement et sans complexité. Nos microcrédits sont conçus pour vous aider à lancer ou développer vos projets, avec des conditions flexibles et adaptées à vos revenus.",
    image: require("../../assets/images/transfer.png"),
  },
  {
    id: "2",
    title: "ÉPARGNE SIMPLE ET SÉCURISÉE",
    description:
      "Faites fructifier votre argent en toute confiance. Avec nos solutions d’épargne, vous bénéficiez de rendements avantageux, d’une totale transparence et d’un accès facile à vos fonds quand vous en avez besoin.",
    image: require("../../assets/images/organizing.png"),
  },
  {
    id: "3",
    title: "UN ACCOMPAGNEMENT DE PROXIMITÉ",
    description:
      "Parce que chaque client est unique, nous vous accompagnons pas à pas. Nos conseillers vous aident à mieux gérer votre budget, à planifier vos investissements et à atteindre vos objectifs en toute sérénité.",
    image: require("../../assets/images/revenu.png"),
  },
];

type OnboardingCarouselProps = {
  onFinish?: () => void;
};

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({
  onFinish,
}) => {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (flatListRef.current && currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else if (currentIndex === slides.length - 1) {
      onFinish?.();
    }
  };

  const onViewRef = useRef(({ viewableItems }: any) => {
    const index = viewableItems[0]?.index;
    if (typeof index === "number") {
      setCurrentIndex(index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.textSection}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
      <View style={[styles.container, { minHeight: hp(100) }]}>
        <Animated.FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />

        {/* Dots fixes en bas */}
        <View style={styles.pagination}>
          {slides.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.4, 1],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity: dotOpacity,
                    transform: [{ scale }],
                    backgroundColor: "#c2026d",
                  },
                ]}
              />
            );
          })}
        </View>
        <View style={[styles.bottomSection, { marginBottom: insets.bottom + 8 }]}>
          <PrimaryButton
            title={currentIndex === slides.length - 1 ? "Terminer" : "Suivant"}
            color={Colors.button.primary}
            onPress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingCarousel;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slide: {
    width: width,
    alignItems: "center",
  },
  imageContainer: {
    marginTop: "10%",
    width: width * 0.9,
    height: height * 0.35,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textSection: {
    width: width * 0.9,
    minHeight: 80,
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    // backgroundColor: "#eee",
    alignItems: "center",
  },
  title: {
    fontSize: Math.min(width * 0.08, 30),
    textAlign: "center",
    color: "#000",
    fontFamily: fonts.Poppins.SemiBold,
    marginBottom: 10,
  },
  description: {
    fontSize: Math.min(width * 0.04, 18),
    textAlign: "justify",
    color: "#000",
    fontFamily: fonts.Poppins.Light,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    marginTop: "5%",
    marginBottom: "5%",
    height: "5%",
    alignItems: "center",
  },
  dot: {
    height: 7,
    width: 7,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  bottomSection: {
    width: "100%",
    height: 56,
    paddingHorizontal: "8%",
    justifyContent: "center",
  },
});
