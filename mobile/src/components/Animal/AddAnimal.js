import { Icon, Input } from "@rneui/base";
import Text from "../global/Text";
import { useEffect, useState } from "react";
import Container from "../global/Container";
import Card from "../global/Card";
import Collapsible from "react-native-collapsible";
import Colors from "../../utils/Colors";
import BaseDropdown from "../global/BaseDropdown";
import { useTranslation } from "react-i18next";

const AddAnimal = ({ isSubmitting, index, handleSubmit }) => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (isSubmitting) {
      handleSubmit({
        aa: "aaa",
        bb: "bbb",
        cc: "ccc",
      });
    }
  }, [isSubmitting]);

  const inputStyles = {
    inputStyle: {
      backgroundColor: Colors.secondaryLight,
      borderRadius: 8,
      paddingHorizontal: 10,
    },
  };

  return (
    <Card sx={{ flexDirection: "column", padding: 0 }}>
      <Container sx={{ padding: 16 }}>
        <Text onPress={() => setCollapsed(!collapsed)}>Animal {index + 1}</Text>
      </Container>
      <Collapsible collapsed={collapsed}>
        <Container sx={{ marginRight: 10, marginLeft: 10 }}>
          <Input
            leftIcon={
              <Icon
                name="pricetag"
                size={24}
                color={Colors.secondary}
                type="ionicon"
              />
            }
            placeholder="Tag..."
            {...inputStyles}
          />
          <Input
            leftIcon={
              <Icon
                name="cash-outline"
                type="ionicon"
                size={24}
                color={Colors.secondary}
              />
            }
            placeholder="Price..."
            {...inputStyles}
          />
          <Container sx={{ marginBottom: 10 }}>
            <BaseDropdown
              values={[{ label: "Sheep", value: "1" }]}
              label={t("common.category")}
              focusLabel={"..."}
              notFocusLabel={t("common.category")}
              searchLabel={t("common.category_placeholder")}
              containerStyle={inputStyles}
            />
          </Container>
        </Container>
      </Collapsible>
    </Card>
  );
};

export default AddAnimal;
