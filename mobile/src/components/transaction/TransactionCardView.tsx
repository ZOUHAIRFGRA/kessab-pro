import "../../../global.css";
import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Wallet, Trash2, Share2, Plus } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useToast } from "../../hooks/useToast";
import {
  exportTransactionInvoice,
  getTransactionsByBuyer,
  getTransactionsBySale,
} from "../../features/transactionSlice";
import { getSale } from "../../features/saleSlice";
import transactionApi from "../../api/transactionApi";
import Dialogs from "../global/Dialog";
import Button from "../global/Button";
import ConfirmationModal from "../global/ConfirmationModal";

interface Transaction {
  id: number;
  transactionDate: string;
  method: string;
  amount: number;
}

interface TransactionCardViewProps {
  transaction: Transaction;
  id: number;
  type?: "sale" | "buyer";
}

const TransactionCardView: React.FC<TransactionCardViewProps> = ({
  transaction,
  id,
  type = "sale",
}) => {
  const { t } = useTranslation();
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const { showSuccessToast, showErrorToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleTransactionClick = () => {
    setIsVisible(true);
  };

  const onDeleteConfirmation = () => {
    transactionApi
      .deleteTransaction(transaction.id)
      .then(() => {
        showSuccessToast();
        if (type === "sale") {
          dispatch(getTransactionsBySale(id) as any);
          dispatch(getSale(id) as any);
        }
        if (type === "buyer") {
          dispatch(getTransactionsByBuyer(id) as any);
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
        <View className="flex-col gap-2 p-2">
          <TouchableOpacity
            className="bg-primary-700 rounded-2xl p-4 flex-row items-center justify-center gap-3 shadow-sm"
            onPress={() => {
              exportTransactionInvoice(transaction.id);
            }}
          >
            <Share2 size={20} color="#ffffff" strokeWidth={2.5} />
            <Text className="text-white font-bold text-center text-base">
              Share / Print
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-danger-600 rounded-2xl p-4 flex-row items-center justify-center gap-3 shadow-sm"
            onPress={() => {
              setIsVisible(false);
              setIsConfirmationModalOpen(true);
            }}
          >
            <Trash2 size={20} color="#ffffff" strokeWidth={2.5} />
            <Text className="text-white font-bold text-center text-base">
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </Dialogs>

      <TouchableOpacity onPress={handleTransactionClick}>
        <View className="flex-row bg-white rounded-2xl shadow-sm border border-surface-200 p-4 mx-2 justify-between items-center">
          <View
            className={`flex-row gap-3 items-center ${
              t("dir") === "rtl" ? "flex-row-reverse" : ""
            }`}
          >
            <View className="bg-accent-500 rounded-full p-3">
              <Wallet size={28} color="#ffffff" strokeWidth={2} />
            </View>
            <View className="flex-col gap-1">
              <Text className="text-base text-primary-800 font-semibold">
                {transaction.transactionDate}
              </Text>
              <Text className="text-sm text-surface-600">
                {t(`common.${transaction.method}`)}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-1">
            <Plus size={20} color="#64748b" strokeWidth={2.5} />
            <Text className="text-2xl font-bold text-accent-600">
              {transaction.amount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default TransactionCardView;
