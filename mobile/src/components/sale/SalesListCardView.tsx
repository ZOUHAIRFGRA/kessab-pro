import "../../../global.css";
import React from "react";
import { View, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import SaleCardView from "./SaleCardView";
import { useGetSalesQuery, useGetSalesByBuyerIdQuery } from "../../services";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import type { Sale } from "../../types/api";

interface SalesListCardViewProps {
  fullNameFilter?: string;
  categoryIdFilter?: string;
  paymentStatusFilter?: string;
  saleDate?: string;
  route?: any;
  type?: "buyer" | null;
  id?: string; // UUID
}

const SalesListCardView: React.FC<SalesListCardViewProps> = ({
  fullNameFilter = "",
  categoryIdFilter = "",
  paymentStatusFilter = "",
  saleDate = "",
  route,
  type = null,
  id,
}) => {
  const { t } = useTranslation();

  // Conditional RTK Query hooks
  const {
    data: salesData,
    isLoading: salesLoading,
    error: salesError,
  } = useGetSalesQuery(
    {
      status: paymentStatusFilter,
      search: fullNameFilter,
      startDate: saleDate || undefined,
    },
    { skip: type === "buyer", refetchOnFocus: true }
  );

  const {
    data: buyerSalesData,
    isLoading: buyerSalesLoading,
    error: buyerSalesError,
  } = useGetSalesByBuyerIdQuery(id!, {
    skip: type !== "buyer" || !id,
    refetchOnFocus: true,
  });

  const isLoading = type === "buyer" ? buyerSalesLoading : salesLoading;
  const error = type === "buyer" ? buyerSalesError : salesError;
  const sales: Sale[] = type === "buyer"
    ? (buyerSalesData || [])
    : (salesData?.content || []);

  if (isLoading) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;

  return (
    <View className="flex-1 bg-surface-50">
      {sales.length === 0 ? (
        <FallBack
          type={FALLBACK_TYPE.NO_RESULT}
          message={t(`common.noSalesFound`)}
        />
      ) : (
        <FlatList
          data={sales}
          keyExtractor={(sale) => sale.id.toString()}
          renderItem={({ item }) => <SaleCardView sale={item} />}
          ItemSeparatorComponent={() => <View className="h-2.5" />}
          contentContainerClassName="py-2"
        />
      )}
    </View>
  );
};

export default SalesListCardView;
