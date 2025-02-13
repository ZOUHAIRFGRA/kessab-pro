import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styled } from "dripsy";
import Icon from "react-native-vector-icons/FontAwesome";
import AnimalsList from "../components/AnimalsList";
import AddTransaction from "../components/AddTransaction";
import AddAnimalModal from "./AddAnimalModal";
import { useDebounce } from "use-debounce";
import { getAnimals, resetAnimals } from "../features/animalSlice";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function ManagementScreen() {
  // const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const { t } = useTranslation();
  const [addAnimalModalVisible, setAddAnimalModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 1000);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const resetSearchText = () => {
    setSearchText("");
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("ManagementScreen focused - resetting state");
      dispatch(resetAnimals());
      dispatch(getAnimals({ page: 0, search: "", filterType: "tag" }));
    }, [dispatch])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("ManagementScreen re-entered - resetting state");
      dispatch(resetAnimals());
      setSearchText("");
      dispatch(getAnimals({ page: 0, search: "", filterType: "tag" }));
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  return (
    <Container>
      <SectionTitle>{t("common.quick_actions")}</SectionTitle>
      <QuickActionList>
        {[
          {
            name: t("common.add_animal"),
            key: "AddAnimal",
            icon: "plus",
            action: () => setAddAnimalModalVisible(true),
          },
          // {
          //   name: "+ Transaction",
          //   icon: "dollar",
          //   action: () => setTransactionModalVisible(true),
          // },
        ].map((action, index) => (
          <QuickActionItem key={index} onPress={action.action}>
            <Icon name={action.icon} color="#4A90E2" size={36} />
            <Text>{action.name}</Text>
          </QuickActionItem>
        ))}
      </QuickActionList>

      <SearchInput
        placeholder={t("common.search_by_tag")}
        value={searchText}
        onChangeText={handleSearchChange}
        placeholderTextColor="black"
        onSubmitEditing={() => {
          dispatch(resetAnimals());
          dispatch(
            getAnimals({ page: 0, search: searchText, filterType: "tag" })
          );
         
        }}
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <AnimalsList searchText={debouncedSearchText} />

        {/* {transactionModalVisible && (
          <AddTransaction
            onClose={() => {
              setTransactionModalVisible(false);
              resetSearchText();
            }}
          />
        )} */}

        {addAnimalModalVisible && (
          <AddAnimalModal
            visible={addAnimalModalVisible}
            onClose={() => {
              setAddAnimalModalVisible(false);
              resetSearchText();
            }}
          />
        )}
      </ScrollView>
    </Container>
  );
}

const Container = styled(View)({
  flex: 1,
  padding: 16,
  backgroundColor: "background",
});

const SearchInput = styled(TextInput)({
  borderWidth: 1,
  borderColor: "border",
  padding: 12,
  borderRadius: 8,
  marginBottom: 16,
  height: 48,
  backgroundColor: "inputBackground",
});

const SectionTitle = styled(Text)({
  fontSize: 18,
  fontWeight: "bold",
  color: "text",
  marginBottom: 12,
});

const QuickActionList = styled(View)({
  flexDirection: "row",
  gap: 16,
  marginBottom: 16,
});

const QuickActionItem = styled(TouchableOpacity)(({ isLast }) => ({
  backgroundColor: "#f9f9f9",
  padding: 12,
  borderRadius: 16,
  width: 120,
  height: 100,
  justifyContent: "space-around",
  alignItems: "center",
  marginRight: isLast ? 0 : 16,
  borderWidth: 1,
  borderColor: "#ddd",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
}));
