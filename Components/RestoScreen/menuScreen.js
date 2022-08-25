import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { connect } from "react-redux";


function menuScreen(props) {

  var menuStartersFromJSON = props.restoSelected[0].menu.map((menu) => {
    if(menu.category == 'Entrées') {
      return (
        menu.dishes.map((value, i) => {
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

  var menuDishFromJSON = props.restoSelected[0].menu.map((menu) => {
    if(menu.category == 'Plats') {
      return (
        menu.dishes.map((value, i) => {
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

  var menuDessertFromJSON = props.restoSelected[0].menu.map((menu) => {
    if(menu.category == 'Desserts') {
      return (
        menu.dishes.map((value, i) => {
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

  var filtersAlimentation = props.restoSelected[0].features.map((filtre, i) => {
    if(filtre.property == 'Alimentation') {
      return (
        filtre.values.map((value, i) => {
          return (
            <View key={i} style={styles.filter}><Text style={styles.filterText}>{value}</Text></View>
          )
        })
      )
    }
  });

  var filtersAllergenes = props.restoSelected[0].features.map((filtre) => {
    if(filtre.property == 'Allergènes') {
      return (
        filtre.values.map((value, i) => {
          return (
            <View key={i} style={styles.filter}><Text style={styles.filterText}>{value}</Text></View>
          )

          // var text=[];
          // for(var j=0; j<filtre.values.length; j++) {
          //   text.push(<Text key={i} style={styles.filters}>{filtre.values[j]}</Text>)
          //   console.log(text)
          // }
        })
      )
    }
  });

  return (
    <ScrollView style={{backgroundColor:'white'}}>

      <View style={styles.container}>

        {/* Régime alimentaire */}
        <Text style={styles.regime}>Ce restaurant propose des plats :</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          { filtersAlimentation }
        </ScrollView>

        {/* Menu */}
        <View style={styles.menuContainer}>
          <Text style={styles.title}>Entrées</Text>
            { menuStartersFromJSON }

          <Text style={styles.title}>Plats</Text>
            { menuDishFromJSON }

          <Text style={styles.title}>Desserts</Text>
            { menuDessertFromJSON }
        </View>

        {/* Allergènes */}
        <Text style={styles.allergenes}>Ce menu peut contenir les allergènes suivants :</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          { filtersAllergenes }
        </ScrollView>

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
)(menuScreen);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  // Les filtres ronds
  filter: {
    borderRadius: 30,
    backgroundColor: "#F5F5F5",
    marginRight: 6,
    // backgroundColor: 'red',
  },
  filterText: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  // Les textes 'plus d'infos'
  regime: {
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 5,
  },
  allergenes: {
    marginBottom: 10,
  },
  // Le menu
  menuContainer: {
    marginBottom: 50,
    marginTop: 20,
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