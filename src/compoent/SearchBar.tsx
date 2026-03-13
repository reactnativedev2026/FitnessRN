import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
import imageIndex from "../assets/imageIndex";
import { color } from "../constant";

interface SearchBarProps {
  placeholder?: string;
  onSearchChange?: (text: string) => void;
  value?:string,
  searchBar1?:any
 }

const SearchBar: React.FC<SearchBarProps> = ({ searchBar1,placeholder = "Search", onSearchChange ,value}) => {
  return (
    <View style={[styles.searchBar,searchBar1]}>
      <Image source={imageIndex.search} style={styles.icon} resizeMode="cover" tintColor={'black'} />
      <TextInput 
       allowFontScaling={false} 
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="black"
        onChangeText={onSearchChange}
        value={value}
      />
      {/* <Image source={imageIndex.filter} style={styles.icon} resizeMode="cover"  /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
borderRadius: 10,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 10,
  paddingVertical: 5,
  height: 55,

  // Margins
  marginVertical: 10,
  marginTop: 30,
  marginBottom: 20,

  // Border
  borderWidth: 1,
  borderColor: "#FFFFFF",

  // Shadow (Android + iOS)
  elevation: 8,        // Android
  shadowColor: "#000", // iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.5,
  backgroundColor: "#FFF", 
  marginHorizontal:15

  
  
  },
  icon: {
    height: 22,
    width: 22,
    tintColor:"#F3178B"
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "black",
    marginLeft: 15,
  },
});

export default SearchBar;
