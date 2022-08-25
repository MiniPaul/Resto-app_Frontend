import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { connect } from "react-redux";


function drinksScreen(props) {

  var drinksSoftFromJSON = props.restoSelected[0].boissons.map((menu) => {
    if(menu.category == 'Soft') {
      return (
        menu.drinks.map((value, i) => {
          return (
            <View key={i} style={styles.menu}>
              <Text>{value.name}</Text>
              <Text>{value.price} €</Text>
            </View>
          )
        })
      )
    }
  })

  var drinksBeersFromJSON = props.restoSelected[0].boissons.map((menu) => {
    if(menu.category == 'Bières') {
      return (
        menu.drinks.map((value, i) => {
          return (
            <View key={i} style={styles.menu}>
              <Text>{value.name}</Text>
              <Text>{value.price} €</Text>
            </View>
          )
        })
      )
    }
  })

  var drinksWineFromJSON = props.restoSelected[0].boissons.map((menu) => {
    if(menu.category == 'Vins') {
      return (
        menu.drinks.map((value, i) => {
          return (
            <View key={i} style={styles.menu}>
              <Text>{value.name}</Text>
              <Text>{value.price} €</Text>
            </View>
          )
        })
      )
    }
  })

  return (
    <ScrollView style={{backgroundColor:'white'}}>

      <View style={styles.container}>

        {/* Carte des boissons */}
        <View style={styles.menuContainer}>
          <Text style={styles.title}>Soft</Text>
            { drinksSoftFromJSON }

          <Text style={styles.title}>Bières</Text>
            { drinksBeersFromJSON }

          <Text style={styles.title}>Vins</Text>
            { drinksWineFromJSON }
        </View>

      </View> 

    </ScrollView>
  )
}

function mapStateToProps(state) {
  return { restoSelected: state.restoSelected }
}

export default connect(
  mapStateToProps,
  null
)(drinksScreen);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  // Le menu
  menuContainer: {
    // marginBottom: 50,
    // marginTop: 20,
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
    marginVertical: 10
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})