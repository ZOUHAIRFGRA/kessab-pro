import "../../../global.css";
import React from "react";
import { View, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import BuyerCardView from "./BuyerCardView";
import { useGetBuyersQuery } from "../../services";
import type { Buyer } from "../../types/api";

interface BuyersListCardViewProps {
  searchText?: string;
  route?: any;
}

const BuyersListCardView: React.FC<BuyersListCardViewProps> = ({
  searchText: propSearchText,
  route
}) => {
  const { t } = useTranslation();

  // RTK Query hook with automatic refetch on focus
  const { data, isLoading, error } = useGetBuyersQuery(
    { search: propSearchText },
    { refetchOnFocus: true }
  );

  const buyers = data?.content || [];

  if (isLoading || !data) return <Loading />;
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
          keyExtractor={(buyer: Buyer) => buyer.id.toString()}
          renderItem={({ item }) => <BuyerCardView buyer={item} />}
          ItemSeparatorComponent={() => <View className="h-3" />}
          contentContainerClassName="py-2"
        />
      )}
    </View>
  );
};

export default BuyersListCardView;
