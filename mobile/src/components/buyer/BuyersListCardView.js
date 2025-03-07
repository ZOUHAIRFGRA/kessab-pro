import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import BuyerCardView from "./BuyerCardView";
import { getBuyers, resetBuyers } from "../../features/buyerSlice";
import { useFocusEffect } from "@react-navigation/native";

const BuyersListCardView = ({ searchText: propSearchText, route }) => {
  const { t } = useTranslation();
  const { buyers, loading, error } = useSelector(({ buyers }) => buyers);
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getBuyers({ q: propSearchText }));
      return () => {};
    }, [propSearchText])
  );

  if (loading || !buyers) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;

  return (
    <View style={{ flex: 1 }}>
      {buyers.length === 0 ? (
        <FallBack
          type={FALLBACK_TYPE.NO_RESULT}
          message={t(`common.noBuyersFound`)}
        />
      ) : (
        <FlatList
          data={buyers}
          keyExtractor={(buyer) => buyer.id.toString()}
          renderItem={({ item }) => <BuyerCardView buyer={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </View>
  );
};

export default BuyersListCardView;
