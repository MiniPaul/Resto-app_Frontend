import React from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TextInput, Image } from "react-native";
// import { Button } from "@rneui/themed";
// import { SearchIcon, AdjustmentsIcon } from "react-native-heroicons/outline";

import { connect } from "react-redux";
import Map from "../Components/Map";
import RestaurantCard from "../Components/RestaurantCard";

// import { GooglePlacesAutoComplete } from "react-native-google-places-autocomplete";
// import { GOOGLE_MAPS_APIKEY } from "@env";

export default function ResultScreen(props) {

  return (
    <SafeAreaView style={styles.container}>

      <Map />

      <View>
        <Text
          h5
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
            padding: 15,
          }}
        >
          Liste des restaurants disponibles
        </Text>
      </View>

      <ScrollView style={{ height: "0%" }}>
        <RestaurantCard />
      </ScrollView>
    </SafeAreaView>

    // <ScrollView>
    //   <Text h4 style={{ textAlign: "center" }}>
    //     RESULTSCREEN
    //   </Text>
    //   <Button
    //     title="Go to Resto page"
    //     onPress={() => props.navigation.navigate("Resto")}
    //   />
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

