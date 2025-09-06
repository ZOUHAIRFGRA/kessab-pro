import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
} from "react-native";
import { styled } from "dripsy";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/Colors";
import { createListing } from "../../features/marketplaceSlice";
import { getUnsoldAnimals } from "../../features/animalSlice";

export default function CreateListingScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isRTL = t("dir") === "rtl";

    const { unsoldAnimals, loading: animalsLoading } = useSelector(
        (state) => state.animals
    );
    const { loading: listingLoading } = useSelector((state) => state.marketplace);

    const [formData, setFormData] = useState({
        animalId: null,
        animalType: "",
        quantity: "",
        pricePerUnit: "",
        description: "",
        location: "",
        latitude: null,
        longitude: null,
        isNegotiable: true,
        contactPhone: "",
        contactEmail: "",
    });

    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [showAnimalSelector, setShowAnimalSelector] = useState(false);

    useEffect(() => {
        dispatch(getUnsoldAnimals());
    }, [dispatch]);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAnimalSelect = (animal) => {
        setSelectedAnimal(animal);
        setFormData((prev) => ({
            ...prev,
            animalId: animal.id,
            animalType: animal.category?.typeName || "",
        }));
        setShowAnimalSelector(false);
    };

    const handleSubmit = () => {
        if (!formData.animalId) {
            Alert.alert(t("common.error"), t("marketplace.select_animal_required"));
            return;
        }
        if (!formData.quantity || !formData.pricePerUnit || !formData.location) {
            Alert.alert(t("common.error"), t("marketplace.fill_required_fields"));
            return;
        }

        const listingData = {
            ...formData,
            quantity: parseInt(formData.quantity),
            pricePerUnit: parseFloat(formData.pricePerUnit),
            latitude: formData.latitude ? parseFloat(formData.latitude) : null,
            longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        };

        dispatch(createListing(listingData))
            .unwrap()
            .then(() => {
                Alert.alert(t("marketplace.success"), t("marketplace.listing_created"));
                navigation.goBack();
            })
            .catch((error) => {
                Alert.alert(t("common.error"), error || t("common.something_went_wrong"));
            });
    };

    const renderAnimalItem = (animal) => (
        <AnimalItem key={animal.id} onPress={() => handleAnimalSelect(animal)}>
            <AnimalImageContainer>
                {animal.imagePaths && animal.imagePaths.length > 0 ? (
                    <AnimalImage source={{ uri: animal.imagePaths[0] }} />
                ) : (
                    <AnimalImage source={require("../../../assets/placeholder.png")} />
                )}
            </AnimalImageContainer>
            <AnimalInfo>
                <AnimalTag>{animal.tag}</AnimalTag>
                <AnimalCategory>{animal.category?.typeName || "Unknown"}</AnimalCategory>
                <AnimalPrice>{animal.price} DH</AnimalPrice>
            </AnimalInfo>
            <Icon name="chevron-right" size={20} color={Colors.muted} />
        </AnimalItem>
    );

    return (
        <Container>
            <Header>
                <BackButton onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={Colors.text} />
                </BackButton>
                <HeaderTitle isRTL={isRTL}>{t("marketplace.create_listing")}</HeaderTitle>
                <View style={{ width: 24 }} />
            </Header>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {/* Animal Selection */}
                <Section>
                    <SectionTitle>{t("marketplace.select_animal")}</SectionTitle>
                    <AnimalSelector onPress={() => setShowAnimalSelector(true)}>
                        {selectedAnimal ? (
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {selectedAnimal.imagePaths && selectedAnimal.imagePaths.length > 0 ? (
                                    <AnimalImage source={{ uri: selectedAnimal.imagePaths[0] }} />
                                ) : (
                                    <AnimalImage source={require("../../../assets/placeholder.png")} />
                                )}
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                        {selectedAnimal.tag}
                                    </Text>
                                    <Text style={{ color: Colors.muted }}>
                                        {selectedAnimal.category?.typeName || "Unknown"}
                                    </Text>
                                </View>
                            </View>
                        ) : (
                            <Text style={{ color: Colors.muted }}>
                                {t("marketplace.select_animal_placeholder")}
                            </Text>
                        )}
                        <Icon name="chevron-down" size={20} color={Colors.muted} />
                    </AnimalSelector>
                </Section>

                {/* Quantity */}
                <Section>
                    <SectionTitle>{t("marketplace.quantity")} *</SectionTitle>
                    <Input
                        placeholder={t("marketplace.quantity_placeholder")}
                        value={formData.quantity}
                        onChangeText={(value) => handleInputChange("quantity", value)}
                        keyboardType="numeric"
                        textAlign={isRTL ? "right" : "left"}
                    />
                </Section>

                {/* Price */}
                <Section>
                    <SectionTitle>{t("marketplace.price")} *</SectionTitle>
                    <Input
                        placeholder={t("marketplace.price_placeholder")}
                        value={formData.pricePerUnit}
                        onChangeText={(value) => handleInputChange("pricePerUnit", value)}
                        keyboardType="numeric"
                        textAlign={isRTL ? "right" : "left"}
                    />
                </Section>

                {/* Location */}
                <Section>
                    <SectionTitle>{t("marketplace.location")} *</SectionTitle>
                    <Input
                        placeholder={t("marketplace.location_placeholder")}
                        value={formData.location}
                        onChangeText={(value) => handleInputChange("location", value)}
                        textAlign={isRTL ? "right" : "left"}
                    />
                </Section>

                {/* Description */}
                <Section>
                    <SectionTitle>{t("marketplace.description")}</SectionTitle>
                    <TextArea
                        placeholder={t("marketplace.description_placeholder")}
                        value={formData.description}
                        onChangeText={(value) => handleInputChange("description", value)}
                        multiline
                        numberOfLines={4}
                        textAlign={isRTL ? "right" : "left"}
                    />
                </Section>

                {/* Contact Information */}
                <Section>
                    <SectionTitle>{t("marketplace.contact")}</SectionTitle>
                    <Input
                        placeholder={t("common.phone")}
                        value={formData.contactPhone}
                        onChangeText={(value) => handleInputChange("contactPhone", value)}
                        keyboardType="phone-pad"
                        textAlign={isRTL ? "right" : "left"}
                    />
                    <Input
                        placeholder={t("common.email")}
                        value={formData.contactEmail}
                        onChangeText={(value) => handleInputChange("contactEmail", value)}
                        keyboardType="email-address"
                        textAlign={isRTL ? "right" : "left"}
                        style={{ marginTop: 12 }}
                    />
                </Section>

                {/* Submit Button */}
                <SubmitButton onPress={handleSubmit} disabled={listingLoading}>
                    <ButtonText>
                        {listingLoading ? t("common.loading") : t("marketplace.create_listing")}
                    </ButtonText>
                </SubmitButton>
            </ScrollView>

            {/* Animal Selector Modal */}
            {showAnimalSelector && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                {t("marketplace.select_animal")}
                            </Text>
                            <TouchableOpacity onPress={() => setShowAnimalSelector(false)}>
                                <Icon name="close" size={24} color={Colors.text} />
                            </TouchableOpacity>
                        </ModalHeader>
                        <ScrollView style={{ maxHeight: 400 }}>
                            {animalsLoading ? (
                                <Text style={{ textAlign: "center", padding: 20 }}>
                                    {t("common.loading")}
                                </Text>
                            ) : unsoldAnimals.length > 0 ? (
                                unsoldAnimals.map(renderAnimalItem)
                            ) : (
                                <Text
                                    style={{
                                        textAlign: "center",
                                        padding: 20,
                                        color: Colors.muted,
                                    }}
                                >
                                    {t("marketplace.no_animals_available")}
                                </Text>
                            )}
                        </ScrollView>
                    </ModalContent>
                </ModalOverlay>
            )}
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

const Section = styled(View)({
    marginBottom: 20,
});

const SectionTitle = styled(Text)({
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
});

const Input = styled(TextInput)({
    height: 50,
    borderRadius: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
});

const TextArea = styled(TextInput)({
    height: 100,
    borderRadius: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlignVertical: "top",
});

const AnimalSelector = styled(TouchableOpacity)({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
});

const SubmitButton = styled(TouchableOpacity)({
    backgroundColor: Colors.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
});

const ButtonText = styled(Text)({
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
});

// Modal Components
const ModalOverlay = styled(View)({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
});

const ModalContent = styled(View)({
    backgroundColor: Colors.white,
    borderRadius: 12,
    margin: 20,
    maxHeight: "80%",
    width: "90%",
});

const ModalHeader = styled(View)({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
});

const AnimalItem = styled(TouchableOpacity)({
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
});

const AnimalImageContainer = styled(View)({
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 12,
});

const AnimalImage = styled(Image)({
    width: "100%",
    height: "100%",
});

const AnimalInfo = styled(View)({
    flex: 1,
});

const AnimalTag = styled(Text)({
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
});

const AnimalCategory = styled(Text)({
    fontSize: 14,
    color: Colors.muted,
    marginTop: 2,
});

const AnimalPrice = styled(Text)({
    fontSize: 14,
    color: Colors.primary,
    marginTop: 2,
});