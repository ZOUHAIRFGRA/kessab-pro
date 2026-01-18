import "../../../global.css";
import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Wallet, Trash2, Share2, Plus } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useToast } from "../../hooks/useToast";
import { useDeleteTransactionMutation, useGetTransactionInvoiceMutation } from "../../services";
import Dialogs from "../global/Dialog";
import ConfirmationModal from "../global/ConfirmationModal";

interface Transaction {
  id: string; // UUID
  transactionDate: string;
  method: string;
  amount: number;
}

interface TransactionCardViewProps {
  transaction: Transaction;
  id?: string; // UUID
  type?: "sale" | "buyer";
}

const TransactionCardView: React.FC<TransactionCardViewProps> = ({
  transaction,
  id,
  type = "sale",
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { showSuccessToast, showErrorToast } = useToast();

  const [deleteTransaction] = useDeleteTransactionMutation();
  const [getTransactionInvoice] = useGetTransactionInvoiceMutation();

  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleTransactionClick = () => {
    setIsVisible(true);
  };

  const handleExportInvoice = async () => {
    try {
      await getTransactionInvoice(transaction.id).unwrap();
      showSuccessToast();
    } catch (error) {
      showErrorToast();
    }
  };

  const onDeleteConfirmation = async () => {
    try {
      await deleteTransaction(transaction.id).unwrap();
      showSuccessToast();
      setIsVisible(false);
    } catch (error) {
      showErrorToast();
    }
  };

  return (
    <>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          visible={isConfirmationModalOpen}
          toggleVisible={setIsConfirmationModalOpen}
          action={onDeleteConfirmation}
          title={t("common.confirmation modal")}
          closable
          btnParams={{
            type: "danger",
            icon: {
              name: "trash",
              IconComponent: Trash2,
            },
            btnText: t("common.confirm"),
          }}
          bodyText={t("common.are you sure you want to delete?")}
        />
      )}
      <Dialogs
        title={t("common.Transaction details")}
        visible={isVisible}
        toggleDialog={() => setIsVisible(false)}
      >
        <View className="flex-col gap-2 p-2">
          <TouchableOpacity
            className="bg-primary-700 rounded-2xl p-4 flex-row items-center justify-center gap-3 shadow-sm"
            onPress={handleExportInvoice}
          >
            <Share2 size={20} color="#ffffff" strokeWidth={2.5} />
            <Text className="text-white font-bold text-center text-base">
              {t("common.Share / Print")}
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
              {t("common.Delete")}
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
