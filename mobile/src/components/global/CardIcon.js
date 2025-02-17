import React from "react";
import { Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import Card from "./Card";
import Container from "./Container";
import Header from "./Header";
import Colors from "../../utils/Colors";

const CardIcon = ({ style,text, icon, subText = null,iconType = "ionicon" ,hideIcon=false}) => {
  return (
    <Card
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        ...style
      }}
    >
      <Container style={{ flex: 5, justifyContent: "space-between" }}>
        <Text style={styles.text}>{text}</Text>
        {subText && <Header level={"h3"}>{subText}</Header>}
      </Container>

      {
        !hideIcon && <Container style={styles.iconContainer}>
        <Icon containerStyle={{opacity : 0.9}} reverse name={icon} type={iconType} color={Colors.primary} />
      </Container>
     }
    </Card>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    height: 40,
    width: 40,
  },
});

export default CardIcon;
