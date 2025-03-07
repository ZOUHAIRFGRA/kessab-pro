import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import Text from "./Text";

export const Pagination = ({ pages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page) => {
    if (page < 0 || page >= pages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.navButton, currentPage === 0 && styles.disabledButton]}
        onPress={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <Text style={styles.navText}>{`<`}</Text>
      </TouchableOpacity>

      {[...Array(pages)].map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.pageButton,
            currentPage === index && styles.activePageButton,
          ]}
          onPress={() => handlePageChange(index)}
        >
          <Text
            style={[
              styles.pageText,
              currentPage === index && styles.activePageText,
            ]}
          >
            {index + 1}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[
          styles.navButton,
          currentPage === pages - 1 && styles.disabledButton,
        ]}
        onPress={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pages - 1}
      >
        <Text style={styles.navText}>{`>`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Colors.secondaryLight,
    paddingVertical: 10,
    borderRadius: 8,
  },
  navButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: Colors.primaryLight,
    opacity: 0.5,
  },
  navText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  pageButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  activePageButton: {
    backgroundColor: Colors.secondary,
  },
  pageText: {
    color: Colors.primary,
    fontSize: 16,
  },
  activePageText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});
