import "../../../global.css";
import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import Text from "./Text";

interface PaginationProps {
  pages: number;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pages,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= pages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  return (
    <View className="flex-row items-center justify-center gap-2.5 bg-slate-100 py-2.5 rounded-lg">
      <TouchableOpacity
        className={`bg-slate-700 rounded-full w-10 h-10 justify-center items-center ${
          currentPage === 0 ? "opacity-50" : ""
        }`}
        onPress={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <ChevronLeft size={20} color="white" />
      </TouchableOpacity>

      {[...Array(pages)].map((_, index) => (
        <TouchableOpacity
          key={index}
          className={`w-10 h-10 justify-center items-center rounded-full ${
            currentPage === index ? "bg-amber-500" : ""
          }`}
          onPress={() => handlePageChange(index)}
        >
          <Text
            className={`text-base ${
              currentPage === index
                ? "text-white font-bold"
                : "text-slate-700"
            }`}
          >
            {index + 1}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        className={`bg-slate-700 rounded-full w-10 h-10 justify-center items-center ${
          currentPage === pages - 1 ? "opacity-50" : ""
        }`}
        onPress={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pages - 1}
      >
        <ChevronRight size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
