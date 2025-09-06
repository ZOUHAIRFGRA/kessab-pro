import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    RefreshControl,
} from "react-native";
import { styled } from "dripsy";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../utils/Colors";
import { fetchListings, searchListings, setFilters } from "../features/marketplaceSlice";

export default function MarketplaceScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isRTL = t("dir") === "rtl";

    const [activeTab, setActiveTab] = useState("buy");
    const [searchText, setSearchText] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Redux state
    const { listings, loading, error, pagination, filters } = useSelector(
        (state) => state.marketplace
    );

    const categories = [
        { id: "all", name: t("marketplace.all"), icon: "apps" },
        { id: "sheep", name: t("marketplace.sheep"), icon: "sheep" },
        { id: "cow", name: t("marketplace.cow"), icon: "cow" },
        { id: "goat", name: t("marketplace.goat"), icon: "goat" },
        { id: "poultry", name: t("marketplace.poultry"), icon: "bird" },
    ];

    // Load listings on component mount
    useEffect(() => {
        dispatch(fetchListings({ page: 0, size: 10 }));
    }, [dispatch]);

    // Handle search
    useEffect(() => {
        if (searchText.length > 2) {
            dispatch(searchListings({ searchTerm: searchText, filters }));
        } else if (searchText.length === 0) {
            dispatch(fetchListings({ page: 0, size: 10 }));
        }
    }, [searchText, dispatch, filters]);

    // Handle category filter
    useEffect(() => {
        if (selectedCategory !== "all") {
            dispatch(setFilters({ animalType: selectedCategory }));
            dispatch(fetchListings({ page: 0, size: 10, animalType: selectedCategory }));
        } else {
            dispatch(setFilters({ animalType: "" }));
            dispatch(fetchListings({ page: 0, size: 10 }));
        }
    }, [selectedCategory, dispatch]);

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(fetchListings({ page: 0, size: 10 }))
            .finally(() => setRefreshing(false));
    };

    const handleListingPress = (listing) => {
        navigation.navigate("ListingDetail", { listing });
    };

    const handleCreateListing = () => {
        navigation.navigate("CreateListing");
    };

    const renderListing = ({ item }) => {
        const images = item.animal?.imagePaths || [];
        const firstImage = images.length > 0 ? images[0] : null;
      
        return (
          <ListingCard onPress={() => handleListingPress(item)}>
            {firstImage ? (
              <ListingImage source={{ uri: firstImage }} />
            ) : (
              <ListingImage source={require("../../assets/placeholder.png")} />
            )}
      
            <ListingContent>
              <ListingHeader>
                <FarmerName>{item.farmer?.username || "Unknown Farmer"}</FarmerName>
                <VerifiedBadge>
                  <Icon name="check-circle" size={16} color={Colors.success} />
                </VerifiedBadge>
              </ListingHeader>
      
              <AnimalInfo>
                <Icon name={item.animalType} size={20} color={Colors.primary} />
                <AnimalType>{t(`marketplace.${item.animalType}`)}</AnimalType>
                <Quantity>({item.quantity})</Quantity>
              </AnimalInfo>
      
              <Price>{item.pricePerUnit} DH</Price>
              <Description>{item.description}</Description>
      
              <ListingFooter>
                <LocationInfo>
                  <Icon name="map-marker" size={14} color={Colors.muted} />
                  <LocationText>{item.location}</LocationText>
                </LocationInfo>
      
                <RatingInfo>
                  <Icon name="star" size={14} color="#FFD700" />
                  <RatingText>{item.rating || 0}</RatingText>
                </RatingInfo>
              </ListingFooter>
            </ListingContent>
          </ListingCard>
        );
      };
      


      return (
        <Container>
          <Header>
            <HeaderTitle isRTL={isRTL}>{t("marketplace.title")}</HeaderTitle>
            <CreateButton onPress={handleCreateListing}>
              <Icon name="plus" size={24} color={Colors.white} />
            </CreateButton>
          </Header>
      
          <SearchContainer>
            <SearchInput
              placeholder={t("marketplace.search_placeholder")}
              value={searchText}
              onChangeText={setSearchText}
              textAlign={isRTL ? "right" : "left"}
            />
            <SearchIcon>
              <Icon name="magnify" size={20} color={Colors.muted} />
            </SearchIcon>
          </SearchContainer>
      
          <TabContainer>
            <TabButton active={activeTab === "buy"} onPress={() => setActiveTab("buy")}>
              <TabText active={activeTab === "buy"}>{t("marketplace.buy")}</TabText>
            </TabButton>
            <TabButton active={activeTab === "sell"} onPress={() => setActiveTab("sell")}>
              <TabText active={activeTab === "sell"}>{t("marketplace.sell")}</TabText>
            </TabButton>
          </TabContainer>
      
          <CategoryContainer>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                <CategoryButton
                  key={category.id}
                  active={selectedCategory === category.id}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Icon
                    name={category.icon}
                    size={20}
                    color={selectedCategory === category.id ? Colors.white : Colors.primary}
                  />
                  <CategoryText active={selectedCategory === category.id}>
                    {category.name}
                  </CategoryText>
                </CategoryButton>
              ))}
            </ScrollView>
          </CategoryContainer>
      
          <FlatList
            data={listings}
            renderItem={renderListing}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
          />
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
});

const HeaderTitle = styled(Text)(({ isRTL }) => ({
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: isRTL ? "right" : "left",
}));

const CreateButton = styled(TouchableOpacity)({
    backgroundColor: Colors.primary,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
});

const SearchContainer = styled(View)({
    position: "relative",
    margin: 16,
});

const SearchInput = styled(TextInput)({
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
    paddingHorizontal: 50,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
});

const SearchIcon = styled(View)({
    position: "absolute",
    left: 15,
    top: 15,
});

const TabContainer = styled(View)({
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
});

const TabButton = styled(TouchableOpacity)(({ active }) => ({
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: active ? Colors.primary : "transparent",
}));

const TabText = styled(Text)(({ active }) => ({
    fontSize: 16,
    fontWeight: active ? "bold" : "normal",
    color: active ? Colors.primary : Colors.muted,
}));

const CategoryContainer = styled(View)({
    marginBottom: 16,
});

const CategoryButton = styled(TouchableOpacity)(({ active }) => ({
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: active ? Colors.primary : Colors.white,
    borderWidth: 1,
    borderColor: active ? Colors.primary : "#ddd",
}));

const CategoryText = styled(Text)(({ active }) => ({
    marginLeft: 8,
    fontSize: 14,
    fontWeight: active ? "bold" : "normal",
    color: active ? Colors.white : Colors.text,
}));

const ListingCard = styled(TouchableOpacity)({
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
});

const ListingImage = styled(Image)({
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
});

const ListingContent = styled(View)({
    padding: 16,
});

const ListingHeader = styled(View)({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
});

const FarmerName = styled(Text)({
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
});

const VerifiedBadge = styled(View)({
    flexDirection: "row",
    alignItems: "center",
});

const AnimalInfo = styled(View)({
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
});

const AnimalType = styled(Text)({
    marginLeft: 8,
    fontSize: 16,
    color: Colors.text,
});

const Quantity = styled(Text)({
    marginLeft: 4,
    fontSize: 14,
    color: Colors.muted,
});

const Price = styled(Text)({
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
});

const Description = styled(Text)({
    fontSize: 14,
    color: Colors.muted,
    marginBottom: 12,
});

const ListingFooter = styled(View)({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
});

const LocationInfo = styled(View)({
    flexDirection: "row",
    alignItems: "center",
});

const LocationText = styled(Text)({
    marginLeft: 4,
    fontSize: 12,
    color: Colors.muted,
});

const RatingInfo = styled(View)({
    flexDirection: "row",
    alignItems: "center",
});

const RatingText = styled(Text)({
    marginLeft: 4,
    fontSize: 12,
    color: Colors.muted,
});