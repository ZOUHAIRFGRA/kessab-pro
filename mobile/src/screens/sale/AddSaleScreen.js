import { useState } from "react";
import AddAnimal from "../../components/Animal/AddAnimal";
import Button from "../../components/global/Button";
import { ScrollView } from "react-native";
import { generateIndexArray } from "../../utils/Global";
import Container from "../../components/global/Container";

const AddSaleScreen = ({ route }) => {
  const qte = route.params?.qte;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitData, setSubmitData] = useState([]);

  const handleIndividualSubmit = (index, data) => {
    setSubmitData((prev) => {
      const newData = [...prev];
      newData[index] = data;
      return newData;
    });
  };

  return (
    <ScrollView style={{ padding: 12 }}>
      <Container sx={{ flexDirection: "column", gap: 12 }}>
        {generateIndexArray(qte).map((_, index) => (
          <AddAnimal
            key={index}
            index={index}
            isSubmitting={isSubmitting}
            handleSubmit={(data) => handleIndividualSubmit(index, data)}
          />
        ))}
      </Container>

      <Button
        onPress={() => {
          setIsSubmitting(true);
          console.log({ submitData });
        }}
      >
        click
      </Button>
    </ScrollView>
  );
};

export default AddSaleScreen;
