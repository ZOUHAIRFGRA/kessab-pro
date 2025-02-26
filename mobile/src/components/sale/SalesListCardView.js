import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SaleCardView from "./SaleCardView";
import { getSales } from "../../features/saleSlice";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";



const SalesListCardView = ({ searchText: propSearchText, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  const { sales, loading, error } = useSelector(({ sales }) => sales);
  const [currentPage, setCurrentPage] = useState(0);

  if (loading) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;

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
