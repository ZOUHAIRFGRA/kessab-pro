import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  Dimensions,
} from "react-native";
import { styled } from "dripsy";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/Colors";
import { fetchListingById, markAsSold } from "../../features/marketplaceSlice";

const { width } = Dimensions.get("window");

export default function ListingDetailScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const isRTL = t("dir") === "rtl";

  const { currentListing } = useSelector((state) => state.marketplace);
  const { user } = useSelector((state) => state.auth);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const listing = route.params?.listing || currentListing;

  useEffect(() => {
    if (listing?.id && !currentListing) {
      dispatch(fetchListingById(listing.id));
    }
  }, [dispatch, listing?.id, currentListing]);

  const displayListing = currentListing || listing;

  if (!displayListing) {
    return (
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={Colors.text} />
          </BackButton>
          <HeaderTitle isRTL={isRTL}>
            {t("marketplace.listing_details")}
          </HeaderTitle>
          <View style={{ width: 24 }} />
        </Header>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>{t("common.loading")}</Text>
        </View>
      </Container>
    );
  }

  const images = displayListing.animal?.imagePaths || [];
  const isOwner = user?.id === displayListing.farmer?.id;

  const handleCall = () => {
    if (displayListing.contactPhone) {
      Linking.openURL(`tel:${displayListing.contactPhone}`);
    } else {
      Alert.alert(t("common.error"), t("marketplace.no_phone_number"));
    }
  };

  const handleMessage = () => {
    if (displayListing.contactPhone) {
      Linking.openURL(`sms:${displayListing.contactPhone}`);
    } else {
      Alert.alert(t("common.error"), t("marketplace.no_phone_number"));
    }
  };

  const handleMarkAsSold = () => {
    Alert.alert(
      t("marketplace.mark_as_sold"),
      t("marketplace.mark_as_sold_confirmation"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.confirm"),
          onPress: () => {
            dispatch(markAsSold(displayListing.id))
              .unwrap()
              .then(() => {
                Alert.alert(
                  t("marketplace.success"),
                  t("marketplace.listing_marked_sold")
                );
                navigation.goBack();
              })
              .catch((error) => {
                Alert.alert(
                  t("common.error"),
                  error || t("common.something_went_wrong")
                );
              });
          },
        },
      ]
    );
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text} />
        </BackButton>
        <HeaderTitle isRTL={isRTL}>
          {t("marketplace.listing_details")}
        </HeaderTitle>
        <View style={{ width: 24 }} />
      </Header>

      <ScrollView>
        {/* Image Gallery */}
        {images.length > 0 && (
          <ImageContainer>
            <Image
              source={{ uri: images[currentImageIndex] }}
              style={{ width: "100%", height: 250 }}
              resizeMode="cover"
            />
          </ImageContainer>
        )}

        <Content>
          {/* Header Info */}
          <HeaderInfo>
            <FarmerInfo>
              <FarmerName>
                {displayListing.farmer?.username || "Unknown Farmer"}
              </FarmerName>
              <VerifiedBadge>
                <Icon name="check-circle" size={16} color={Colors.success} />
                <Text style={{ marginLeft: 4, fontSize: 12, color: Colors.success }}>
                  {t("marketplace.verified")}
                </Text>
              </VerifiedBadge>
            </FarmerInfo>
            <StatusBadge status={displayListing.status}>
              <Text
                style={{ color: Colors.white, fontSize: 12, fontWeight: "bold" }}
              >
                {displayListing.status}
              </Text>
            </StatusBadge>
          </HeaderInfo>

          {/* Animal Info */}
          <AnimalInfo>
            <AnimalTypeRow>
              <Icon name={displayListing.animalType} size={24} color={Colors.primary} />
              <AnimalTypeText>
                {t(`marketplace.${displayListing.animalType}`)}
              </AnimalTypeText>
              <QuantityText>({displayListing.quantity})</QuantityText>
            </AnimalTypeRow>
            <PriceText>{displayListing.pricePerUnit} DH</PriceText>
          </AnimalInfo>

          {/* Description */}
          {displayListing.description && (
            <Section>
              <SectionTitle>{t("marketplace.description")}</SectionTitle>
              <DescriptionText>{displayListing.description}</DescriptionText>
            </Section>
          )}

          {/* Contact Information */}
          <Section>
            <SectionTitle>{t("marketplace.contact")}</SectionTitle>
            {displayListing.contactPhone && (
              <ContactButton onPress={handleCall}>
                <Icon name="phone" size={20} color={Colors.white} />
                <Text style={{ color: Colors.white, marginLeft: 8, fontSize: 16 }}>
                  {t("marketplace.call_farmer")}
                </Text>
              </ContactButton>
            )}
            {displayListing.contactPhone && (
              <ContactButton onPress={handleMessage} style={{ marginTop: 12 }}>
                <Icon name="message" size={20} color={Colors.white} />
                <Text style={{ color: Colors.white, marginLeft: 8, fontSize: 16 }}>
                  {t("marketplace.send_message")}
                </Text>
              </ContactButton>
            )}
          </Section>

          {/* Owner Actions */}
          {isOwner && displayListing.status === "ACTIVE" && (
            <Section>
              <OwnerActions>
                <ActionButton
                  onPress={handleMarkAsSold}
                  style={{ backgroundColor: Colors.success }}
                >
                  <Icon name="check" size={20} color={Colors.white} />
                  <Text style={{ color: Colors.white, marginLeft: 8, fontSize: 16 }}>
                    {t("marketplace.mark_as_sold")}
                  </Text>
                </ActionButton>
              </OwnerActions>
            </Section>
          )}
        </Content>
      </ScrollView>
    </Container>
  );
}

// Styled Components
const Container = styled(View)({
  flex: 1,
  backgroundColor: "background",
});

const Header = styled(View)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 16,
  backgroundColor: Colors.white,
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
});

const BackButton = styled(TouchableOpacity)({
  padding: 8,
});

const HeaderTitle = styled(Text)(({ isRTL }) => ({
  fontSize: 18,
  fontWeight: "bold",
  color: Colors.text,
  textAlign: isRTL ? "right" : "left",
}));

const ImageContainer = styled(View)({
  position: "relative",
  height: 250,
});

const Content = styled(View)({
  padding: 16,
});

const HeaderInfo = styled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 16,
});

const FarmerInfo = styled(View)({
  flex: 1,
});

const FarmerName = styled(Text)({
  fontSize: 18,
  fontWeight: "bold",
  color: Colors.text,
  marginBottom: 4,
});

const VerifiedBadge = styled(View)({
  flexDirection: "row",
  alignItems: "center",
});

const StatusBadge = styled(View)(({ status }) => ({
  backgroundColor: status === "ACTIVE" ? Colors.success : Colors.muted,
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 12,
}));

const AnimalInfo = styled(View)({
  marginBottom: 20,
});

const AnimalTypeRow = styled(View)({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 8,
});

const AnimalTypeText = styled(Text)({
  fontSize: 20,
  fontWeight: "bold",
  color: Colors.text,
  marginLeft: 8,
});

const QuantityText = styled(Text)({
  fontSize: 16,
  color: Colors.muted,
  marginLeft: 8,
});

const PriceText = styled(Text)({
  fontSize: 24,
  fontWeight: "bold",
  color: Colors.primary,
});

const Section = styled(View)({
  marginBottom: 24,
});

const SectionTitle = styled(Text)({
  fontSize: 18,
  fontWeight: "bold",
  color: Colors.text,
  marginBottom: 12,
});

const DescriptionText = styled(Text)({
  fontSize: 16,
  color: Colors.text,
  lineHeight: 24,
});

const ContactButton = styled(TouchableOpacity)({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: Colors.primary,
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 8,
  marginBottom: 8,
});

const OwnerActions = styled(View)({
  marginTop: 20,
});

const ActionButton = styled(TouchableOpacity)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 8,
});
