import React, { useState } from "react";
import { View, Image, Touchable, TouchableOpacity } from "react-native";
import Card from "../global/Card";
import IconTag from "../global/IconTag";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import Container from "../global/Container";
import Text from "../../components/global/Text";
import { useTranslation } from "react-i18next";
import Dialogs from "../global/Dialog";
import Button from "../global/Button";
import Colors from "../../utils/Colors";
import {
  exportTransactionInvoice,
  getTransactionsByBuyer,
  getTransactionsBySale,
} from "../../features/transactionSlice";
import ConfirmationModal from "../global/ConfirmationModal";
import transactionApi from "../../api/transactionApi";
import { useDispatch } from "react-redux";
import { useToast } from "../../hooks/useToast";
import { getSale } from "../../features/saleSlice";
const TransactionCardView = ({ transaction, id, type = "sale" }) => {
  const { t } = useTranslation();
  const navigator = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const handleTransactionClick = () => {
    setIsVisible(true);
  };
  const { showSuccessToast, showErrorToast } = useToast();

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const dispatch = useDispatch();
  const onDeleteConfirmation = () => {
    console.log({ type, id });

    transactionApi
      .deleteTransaction(transaction.id)
      .then(() => {
        showSuccessToast();
        if (type === "sale") {
          console.log("triggred frin card view");
          dispatch(getTransactionsBySale(id));
          dispatch(getSale(id));
        }
        if (type === "buyer") {
          dispatch(getTransactionsByBuyer(id));
        }
      })
      .catch(() => {
        showErrorToast();
      })
      .finally(() => {
        setIsVisible(false);
      });
  };

  return (
    <>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          visible={isConfirmationModalOpen}
          toggleVisible={setIsConfirmationModalOpen}
          action={onDeleteConfirmation}
          title={"confirmation modal"}
          closable
          btnParams={{
            type: "danger",
            icon: {
              name: "trash",
            },
            btnText: "confirm",
          }}
          bodyText={"are you sure you want to delete?"}
        />
      )}
      <Dialogs
        title={"Transaction details"}
        visible={isVisible}
        toggleDialog={setIsVisible}
      >
        <Container
          style={{
            flexDirection: "column",
            gap: 8,
          }}
        >
          <Button
            type={"primary"}
            style={{
              padding: 12,
              marginRight: 12,
              marginLeft: 12,
              marginBottom: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            textStyle={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
            icon={{
              name: "share-alt",
              color: Colors.white,
            }}
            onPress={() => {
              exportTransactionInvoice(transaction.id);
            }}
          >
            Share / Print
          </Button>
          <Button
            type={"danger"}
            style={{
              padding: 12,
              marginRight: 12,
              marginLeft: 12,
              marginBottom: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            textStyle={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
            icon={{
              name: "trash",
              color: Colors.white,
            }}
            onPress={() => {
              setIsVisible(false);
              setIsConfirmationModalOpen(true);
            }}
          >
            Delete
          </Button>
        </Container>
      </Dialogs>
      <TouchableOpacity onPress={() => handleTransactionClick()}>
        <Card
          sx={{
            justifyContent: "space-between",
            padding: 15,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              flexDirection: t("dir") === "rtl" ? "row-reverse" : "row",
              gap: 6,
              alignItems: "center",
            }}
          >
            <Icon
              name="wallet-plus-outline"
              color={"green"}
              raised
              reverse
              type="material-community"
            />
            <Container>
              <Text style={{ fontSize: 16 }}>
                {transaction.transactionDate}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {t(`common.${transaction.method}`)}
              </Text>
            </Container>
          </View>

          <View>
            <IconTag
              tagName="plus"
              color="grey"
              content={transaction.amount}
              style={{ flex: 1, borderWidth: 0 }}
              textStyle={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            />
          </View>
        </Card>
      </TouchableOpacity>
    </>
  );
};

export default TransactionCardView;
