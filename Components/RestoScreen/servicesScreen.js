import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { connect } from "react-redux";


function servicesScreen(props) {

  var filtersPayment = props.restoSelected[0].features.map((filtre) => {
    if(filtre.property == 'Moyens de paiement') {
      return (
        filtre.values.map((value, i) => {
          return (
            <View key={i} style={styles.filter}><Text style={styles.filterText}>{value}</Text></View>
          )
        })
      )
    }
  });

  var filtersEquipment = props.restoSelected[0].features.map((filtre, i) => {
    if(filtre.property == 'Équipements') {
      return (
        filtre.values.map((value, i) => {
          return (
            <View key={i} style={styles.filter}><Text style={styles.filterText}>{value}</Text></View>
          )
        })
      )
    }
  });

  var filtersAccess = props.restoSelected[0].features.map((filtre, i) => {
    if(filtre.property == 'Accessibilité') {
      return (
        filtre.values.map((value, i) => {
          return (
            <View key={i} style={styles.filter}><Text style={styles.filterText}>{value}</Text></View>
          )
        })
      )
    }
  });

  return (
    <ScrollView style={{backgroundColor:'white'}} >

      <View style={styles.container}>

        <Text style={styles.title}>Moyens de paiement</Text>
        <View style={styles.filtersContainer}>
          { filtersPayment }
        </View>

        <Text style={styles.title}>Équipements</Text>
        <View style={styles.filtersContainer}>
          { filtersEquipment }
        </View>

        <Text style={styles.title}>Accessibilité</Text>
        <View style={styles.filtersContainer}>
          { filtersAccess }
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
)(servicesScreen);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
    // marginBottom: 10,
    marginTop: 16,
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },
  filter: {
    width: 'auto',
    height: 50,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: "#F5F5F5",
    alignItems: 'center',
    marginTop: 10,
    marginEnd: 10
  },
  filterText: {
    fontSize: 16,
    padding: 15,
  }
})