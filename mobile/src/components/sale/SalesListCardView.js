import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SaleCardView from "./SaleCardView";
import {
  getSales,
  getSalesByBuyerId,
  resetSales,
} from "../../features/saleSlice";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import { getBuyers } from "../../features/buyerSlice";
import { useFocusEffect } from "@react-navigation/native";

const SalesListCardView = ({
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

  useFocusEffect(
    useCallback(() => {
      if (type === "buyer") {
        dispatch(getSalesByBuyerId(id));
      }

      if (!type) {
        dispatch(
          getSales({
            paymentStatus: paymentStatusFilter,
            categoryId: categoryIdFilter,
            fullName: fullNameFilter,
            saleDate,
          })
        );
      }

      return () => {};
    }, [
      paymentStatusFilter,
      categoryIdFilter,
      fullNameFilter,
      saleDate,
      dispatch,
    ])
  );

  const { sales, loading, error } = useSelector((states) => states.sales);

  const [currentPage, setCurrentPage] = useState(0);

  if (loading) return <Loading />;
  if (error || !sales) return <FallBack />;

  return (
    <View style={{ flex: 1 }}>
      {sales.length === 0 ? (
        <FallBack
          type={FALLBACK_TYPE.NO_RESULT}
          message="No sales found for this search."
        />
      ) : (
        <FlatList
          data={sales}
          keyExtractor={(sale) => sale.id.toString()}
          renderItem={({ item }) => <SaleCardView sale={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </View>
  );
};

export default SalesListCardView;
