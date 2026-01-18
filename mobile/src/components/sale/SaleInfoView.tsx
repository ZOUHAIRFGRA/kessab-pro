import "../../../global.css";
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { User, Calendar, Handshake, Wallet, ShoppingCart, Trash2, Share2, Info } from "lucide-react-native";
import { useGetSaleByIdQuery, useCloseSaleMutation, useGetSaleInvoiceMutation } from "../../services";
import { getPickedUpRatio } from "../../helpers/AnimalHelpers";
import { useToast } from "../../hooks/useToast";
import { getValue } from "../../helpers/gloablHelpers";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import ConfirmationModal from "../global/ConfirmationModal";

interface SaleInfoViewProps {
  id: string; // UUID
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
    <View className="flex-1 bg-surface-50">
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
              IconComponent: Trash2,
            },
            btnText: t("common.confirm"),
          }}
          bodyText={t("modal.close_sale_confirmation")}
        />
      )}

      {/* Header */}
      <LinearGradient
        colors={["#334e68", "#243b53"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 24, paddingTop: 48, paddingBottom: 24 }}
      >
        <View className="flex-row items-center gap-3">
          <View className="bg-white/20 rounded-full p-3">
            <Info size={24} color="#ffffff" strokeWidth={2} />
          </View>
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">
              {t("common.Info")}
            </Text>
            <Text className="text-white/80 text-sm mt-1">
              {t("common.sale_details")}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1">
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
                {getValue((sale as any).agreedAmount || "0")}
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
              {getValue((sale as any).paymentDetail?.remainingAmount || "0")}
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
                {t(`payment_type.${(sale as any).paymentStatus || "PENDING"}`)}
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
        <TouchableOpacity
          className="bg-amber-500 rounded-xl p-4 flex-row items-center justify-center gap-2"
          onPress={() => setIsCloseConfirmationModalOpen(true)}
          disabled={(sale as any)?.paymentStatus === "FULLY_PAID"}
          activeOpacity={0.8}
          style={{
            opacity: (sale as any)?.paymentStatus === "FULLY_PAID" ? 0.5 : 1,
          }}
        >
          <Handshake size={20} color="#ffffff" strokeWidth={2} />
          <Text className="text-white font-bold text-center text-base">
            {t("common.close_sale")}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="bg-slate-700 rounded-xl p-4 flex-row items-center justify-center gap-2"
          onPress={handleExportInvoice}
          activeOpacity={0.8}
        >
          <Share2 size={20} color="#ffffff" strokeWidth={2} />
          <Text className="text-white font-bold text-center text-base">
            {t("common.share_print")}
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

export default SaleInfoView;
