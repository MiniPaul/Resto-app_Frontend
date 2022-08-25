import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import RestaurantsData from "../assets/files-JSON/restaurant.json";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

function RestaurantCard(props) {
  const navigation = useNavigation();

  const toDo = (data) => {
    navigation.navigate("Resto");
    props.onRestoClick(data);
    // console.log(data)
  };

  var destinations = props.resultsDirection;

  var restaurantDataSet = [];

  for (var i = 0; i < RestaurantsData.length; i++) {
    restaurantDataSet.push({
      id: RestaurantsData[i].id,
      name: RestaurantsData[i].name,
      logo: RestaurantsData[i].logo,
    });
  }

  const distance = [];
  for (var i = 0; i < destinations.length; i++) {
    distance.push({
      distance: destinations[i].distance,
    });
  }
  // console.log(distance);

  var starsGlobalRating = [];
  for (var i = 0; i < 5; i++) {
    var color = {};
    if (i < Math.round(RestaurantsData[0].rating)) {
      color = "#f1c40f";
    } else {
      color = "#F5F5F5";
    }
    starsGlobalRating.push(
      <FontAwesome key={i} name="star" size={16} color={color} />
    );
  }

  // // // // // // // // // // // // // // // // // // // // // // // // // // //$
  var temporaire = [];

  props.searchInfos[1].map((data) => {
    RestaurantsData.map((dataResto) => {
      dataResto.features.map((dataFeatures) => {
        const found = dataFeatures.values.find(
          (element) => element == data.element
        );
        if (found) {
          temporaire.push({
            id: dataResto.id,
            name: dataResto.name,
            address: dataResto.address,
            ZIPcode: dataResto.ZIPcode,
            city: dataResto.city,
            phoneNumber: dataResto.phoneNumber,
            rating: dataResto.rating,
            voteNumber: dataResto.voteNumber,
            logo: dataResto.logo,
            images: dataResto.images,
            menu: dataResto.menu,
            boissons: dataResto.boissons,
            features: dataResto.features,
          });
        }
      });
    });
  });

  // Pour enlever les doublons dans le tableau d'objets
  let newArray = [];
  let uniqueObject = {};
  for (let i in temporaire) {
    objName = temporaire[i]["name"];
    uniqueObject[objName] = temporaire[i];
  }

  for (i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }
  // // // // // // // // // // // // // // // // // // // // // // // // // // //
  return (
    <View>
      {newArray.map((data, i) => {
        // const dest = destination[index];
        // console.log(dest);
        return (
          // chaque bouton de resto
          <TouchableOpacity
            onPress={() => {
              toDo(data);
            }}
            style={styles.touchableOpacity}
            key={data.id}
          >
            <Image
              source={{ uri: data.logo }}
              style={styles.restoLogo}
              resizeMode="stretch"
            />

            {/* RESTO INFOS */}
            <View style={styles.restoInfosContainer}>
              <Text style={styles.restoName}>{data.name}</Text>

              {/* RESTO AVIS */}
              <View style={styles.starsContainer}>
                <View style={styles.stars}>{starsGlobalRating}</View>
                <Text>({data.voteNumber})</Text>
              </View>
            </View>

            {/* <Text style={{marginRight: 10}}>à 450m</Text> */}

            <IonIcon
              name="chevron-forward-outline"
              size={20}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#DEDEDE",
    marginHorizontal: 10,
    marginTop: 8,
    borderRadius: 8,
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
  },
  restoLogo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "white",
    marginLeft: 10,
  },
  restoInfosContainer: {
    height: "100%",
    width: "45%",
    marginHorizontal: 20,
  },
  restoName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  starsContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
    marginRight: 30,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    onRestoClick: function (restoSelected) {
      dispatch({ type: "addRestoSelected", restoSelected: restoSelected });
      // console.log(JSON.stringify(restoSelected))
    },
  };
}

function mapStateToProps(state) {
  return {
    searchInfos: state.search,
    resultsDirection: state.resultsDirection,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantCard);
