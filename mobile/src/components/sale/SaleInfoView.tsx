import "../../../global.css";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { User, Calendar, Handshake, Wallet, ShoppingCart } from "lucide-react-native";
import { useGetSaleByIdQuery, useCloseSaleMutation, useGetSaleInvoiceMutation } from "../../services";
import { getPickedUpRatio } from "../../helpers/AnimalHelpers";
import { useToast } from "../../hooks/useToast";
import { getValue } from "../../helpers/gloablHelpers";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import Button from "../global/Button";
import ConfirmationModal from "../global/ConfirmationModal";

interface SaleInfoViewProps {
  id: number;
}

const SaleInfoView: React.FC<SaleInfoViewProps> = ({ id }) => {
  const { t } = useTranslation();
  const [isCloseConfirmationModalOpen, setIsCloseConfirmationModalOpen] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  // RTK Query hooks
  const { data: sale, isLoading: loading, error } = useGetSaleByIdQuery(id);
  const [closeSale] = useCloseSaleMutation();
  const [getSaleInvoice] = useGetSaleInvoiceMutation();

  const onCloseConfirmation = async () => {
    try {
      await closeSale(id).unwrap();
      showSuccessToast();
      setIsCloseConfirmationModalOpen(false);
    } catch (e) {
      showErrorToast();
    }
  };

  const handleExportInvoice = async () => {
    try {
      await getSaleInvoice(id).unwrap();
      showSuccessToast();
    } catch (error) {
      showErrorToast();
    }
  };

  if (loading || !sale) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.NOT_FOUND} />;

  return (
    <ScrollView className="flex-1 bg-surface-50">
      {isCloseConfirmationModalOpen && (
        <ConfirmationModal
          visible={isCloseConfirmationModalOpen}
          toggleVisible={setIsCloseConfirmationModalOpen}
          action={onCloseConfirmation}
          title={t("modal.confirmation")}
          closable
          btnParams={{
            type: "secondary",
            icon: {
              name: "trash",
            },
            btnText: t("common.confirm"),
          }}
          bodyText={t("modal.close_sale_confirmation")}
        />
      )}

      <View className="flex-1 gap-3 p-5">
        {/* Buyer Name Card */}
        <View className="bg-white rounded-2xl shadow-sm border border-surface-200 p-4">
          <View className="flex-row items-center gap-3">
            <View className="bg-primary-700 rounded-full p-2.5">
              <User size={20} color="#ffffff" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-surface-500 mb-1">
                {t("common.buyer_name")}
              </Text>
              <Text className="text-base font-semibold text-primary-800">
                {getValue((sale as any).buyer?.fullName || (sale as any).buyerName)}
              </Text>
            </View>
          </View>
        </View>

        {/* Sale Date Card */}
        <View className="bg-white rounded-2xl shadow-sm border border-surface-200 p-4">
          <View className="flex-row items-center gap-3">
            <View className="bg-primary-700 rounded-full p-2.5">
              <Calendar size={20} color="#ffffff" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-surface-500 mb-1">
                {t("common.sale_date")}
              </Text>
              <Text className="text-base font-semibold text-primary-800">
                {getValue(sale.saleDate)}
              </Text>
            </View>
          </View>
        </View>

        {/* Agreed Amount Card */}
        <View className="bg-white rounded-2xl shadow-sm border border-surface-200 p-4">
          <View className="flex-row items-center gap-3">
            <View className="bg-amber-600 rounded-full p-2.5">
              <Handshake size={20} color="#ffffff" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-surface-500 mb-1">
                {t("common.agreed_amount")}
              </Text>
              <Text className="text-base font-bold text-amber-600">
                {getValue((sale as any).agreedAmount || sale.totalAmount)}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Details Row */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-white rounded-2xl shadow-sm border border-surface-200 p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Wallet size={18} color="#64748b" strokeWidth={2} />
              <Text className="text-xs text-surface-500">
                {t("common.paid_amount")}
              </Text>
            </View>
            <Text className="text-base font-bold text-green-600">
              {getValue((sale as any).paymentDetail?.paidAmount)}
            </Text>
          </View>

          <View className="flex-1 bg-white rounded-2xl shadow-sm border border-surface-200 p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Wallet size={18} color="#64748b" strokeWidth={2} />
              <Text className="text-xs text-surface-500">
                {t("common.remaining_amount")}
              </Text>
            </View>
            <Text className="text-base font-bold text-red-600">
              {getValue((sale as any).paymentDetail?.remainingAmount)}
            </Text>
          </View>
        </View>

        {/* Payment Status Card */}
        <View className="bg-white rounded-2xl shadow-sm border border-surface-200 p-4">
          <View className="flex-row items-center gap-3">
            <View className="bg-primary-700 rounded-full p-2.5">
              <Wallet size={20} color="#ffffff" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-surface-500 mb-1">
                {t("common.payment_status")}
              </Text>
              <Text className="text-base font-semibold text-primary-800">
                {t(`payment_type.${(sale as any).paymentStatus || sale.status}`)}
              </Text>
            </View>
          </View>
        </View>

        {/* Picked Up Ratio Card */}
        <View className="bg-white rounded-2xl shadow-sm border border-surface-200 p-4">
          <View className="flex-row items-center gap-3">
            <View className="bg-primary-700 rounded-full p-2.5">
              <ShoppingCart size={20} color="#ffffff" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-surface-500 mb-1">
                {t("common.picked_up_ratio")}
              </Text>
              <Text className="text-base font-semibold text-primary-800">
                {getPickedUpRatio((sale as any).animals || [])}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="p-4 gap-3">
        <Button
          type="primary"
          style={{
            padding: 12,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          textStyle={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
          icon={{
            name: "handshake-o",
            color: "#ffffff",
          }}
          onPress={() => setIsCloseConfirmationModalOpen(true)}
          disabled={(sale as any)?.paymentStatus === "FULLY_PAID"}
        >
          {t("common.close_sale")}
        </Button>
        <Button
          type="secondary"
          style={{
            padding: 12,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          textStyle={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
          icon={{
            name: "share-alt",
            color: "#ffffff",
          }}
          onPress={handleExportInvoice}
        >
          {t("common.share_print")}
        </Button>
      </View>
    </ScrollView>
  );
};

export default SaleInfoView;
