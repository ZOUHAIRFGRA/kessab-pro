import "../../../global.css";
import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";
import SaleCardView from "./SaleCardView";
import { getSales, getSalesByBuyerId } from "../../features/saleSlice";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";

interface Sale {
  id: number;
  [key: string]: any;
}

interface RootState {
  sales: {
    sales: Sale[];
    loading: boolean;
    error: any;
  };
}

interface SalesListCardViewProps {
  fullNameFilter?: string;
  categoryIdFilter?: string;
  paymentStatusFilter?: string;
  saleDate?: string;
  route?: any;
  type?: "buyer" | null;
  id?: number;
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
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  useFocusEffect(
    useCallback(() => {
      if (type === "buyer" && id) {
        dispatch(getSalesByBuyerId(id) as any);
      }

      if (!type) {
        dispatch(
          getSales({
            paymentStatus: paymentStatusFilter,
            categoryId: categoryIdFilter,
            fullName: fullNameFilter,
            saleDate,
          }) as any
        );
      }

      return () => {};
    }, [
      paymentStatusFilter,
      categoryIdFilter,
      fullNameFilter,
      saleDate,
      dispatch,
      type,
      id,
    ])
  );

  const { sales, loading, error } = useSelector((states: RootState) => states.sales);

  if (loading) return <Loading />;
  if (error || !sales) return <FallBack />;

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
