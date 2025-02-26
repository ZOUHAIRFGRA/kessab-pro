import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import BuyerCardView from "./BuyerCardView";
import { getBuyers } from "../../features/buyerSlice";

const BuyersListCardView = ({ searchText: propSearchText, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBuyers());
  }, [dispatch]);

  const { buyers, loading, error } = useSelector(({ buyers }) => buyers);
  const [currentPage, setCurrentPage] = useState(0);

  if (loading || !buyers) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;

  return (
    <View style={{ flex: 1 }}>
      {buyers.length === 0 ? (
        <FallBack
          type={FALLBACK_TYPE.NO_RESULT}
          message="No Buyers found for this search."
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
