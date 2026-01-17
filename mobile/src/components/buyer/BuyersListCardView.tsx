import "../../../global.css";
import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import BuyerCardView from "./BuyerCardView";
import { getBuyers } from "../../features/buyerSlice";
import { useFocusEffect } from "@react-navigation/native";

interface Buyer {
  id: number;
  fullName: string;
  CIN: string;
  phone: string;
}

interface BuyersListCardViewProps {
  searchText?: string;
  route?: any;
}

interface RootState {
  buyers: {
    buyers: Buyer[];
    loading: boolean;
    error: any;
  };
}

const BuyersListCardView: React.FC<BuyersListCardViewProps> = ({ 
  searchText: propSearchText, 
  route 
}) => {
  const { t } = useTranslation();
  const { buyers, loading, error } = useSelector((state: RootState) => state.buyers);
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getBuyers({ q: propSearchText }) as any);
      return () => {};
    }, [propSearchText, dispatch])
  );

  if (loading || !buyers) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;

  return (
    <View className="flex-1 bg-surface-50">
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
          ItemSeparatorComponent={() => <View className="h-3" />}
          contentContainerClassName="py-2"
        />
      )}
    </View>
  );
};

export default BuyersListCardView;
