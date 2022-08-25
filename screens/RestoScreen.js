import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MyTabs from "../Components/RestoScreen/TabScreen";
import { Overlay } from "@rneui/themed";
import { AntDesign } from '@expo/vector-icons';


function RestoScreen(props) {

  // YELLOW STARS ACCORDING TO GLOBAL RATING
  var starsGlobalRating = []
  for (var i=0; i<5; i++) {
    var color = {};
    if(i<Math.round(props.restoSelected[0].rating)) {
      color = '#f1c40f'
    } else {
      color = '#F5F5F5'
    }
    starsGlobalRating.push(<FontAwesome key={i} name="star" size={20} color={color} />)
  }

  const navigation = useNavigation();

  // OVERLAY 'tous les avis'
  const [isVisible, setIsVisible] = useState(false);

  var ratings = []
  for (var i=0; i<10; i++) {
    ratings.push(
      <View style={{marginHorizontal: 20, marginBottom: 15}}>
        <Text style={{fontWeight: '600', marginBottom: 5}}>John Doe</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome name="star" size={20} color='#f1c40f' />
            <FontAwesome name="star" size={20} color='#f1c40f' />
            <FontAwesome name="star" size={20} color='#f1c40f' />
            <FontAwesome name="star" size={20} color='#f1c40f' />
            <FontAwesome name="star" size={20} color='#f1c40f' />
          </View>
          <Text>le 1 août 2022</Text>
        </View>
        <Text>Enim nisi nostrud laborum sit quis cillum fugiat officia veniam aliquip adipisicing culpa. Aliquip et ea anim aute nulla exercitation. Adipisicing voluptate officia magna excepteur elit sunt occaecat. Culpa reprehenderit esse anim nisi cupidatat consectetur labore non.</Text>
      </View>
    )
}

  return (
    <View style={{backgroundColor:'white', flex:1}}>

        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri : props.restoSelected[0].logo}}/>
          </View>
          <View style={styles.restoInfosContainer}>
            <Text style={styles.restoName}>{props.restoSelected[0].name}</Text>
            <Text style={styles.restoAddress}>{props.restoSelected[0].address}{'\n'}{props.restoSelected[0].ZIPcode} {props.restoSelected[0].city}</Text>
            <Text style={styles.restoPhone}>{props.restoSelected[0].phoneNumber}</Text>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            <View style={styles.stars}>
              { starsGlobalRating }
            </View>
            <Text style={styles.nbVote}>({props.restoSelected[0].voteNumber})</Text>
          </View>

          <Text style={styles.seeAll} onPress={() => setIsVisible(true)}>Voir tous les avis</Text>
        </View>

        {/* Overlay 'tous les avis' */}
        <Overlay isVisible={isVisible} onBackdropPress={() => setIsVisible(false)} overlayStyle={{width: '90%', height: '50%', borderRadius: 20}}>
          <AntDesign name="closecircle" size={24} color="#005249" style={{alignSelf: 'flex-end', right: 5, top: 5, marginBottom: 10}} onPress={() => setIsVisible(false)} />
          <ScrollView style={{marginHorizontal: 0, marginBottom: 20}}>
            {ratings}
          </ScrollView>
        </Overlay>

        {/* Button */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() =>  navigation.navigate('Reservation')}>
            <Text style={styles.buttonTitle}>Réserver ce restaurant</Text>
          </TouchableOpacity>      
        </View>

        {/* Tab Navigation */}
        <View style={{ flex:1 }}>
            <MyTabs/>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  // Header
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
  },
  image: {
    flex:1,
    resizeMode: 'stretch',
    borderRadius: 40,
  },
  restoInfosContainer: {
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'center'
  },
  restoName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  restoAddress: {
    fontSize: 13,
  },
  restoPhone: {
    fontSize: 13,
    fontWeight: '600'
  },
  // Rating
  ratingContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 18,
    justifyContent: 'space-between',

  },
  starsContainer: {
    flexDirection: 'row',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 10,
  },
  nbVote: {
    fontSize: 12,
    alignSelf: 'center'
  },
  seeAll: {
    color: 'grey',
    fontStyle: 'italic',
    textDecorationLine: 'underline'
  },
  // Buttons
  buttonsContainer: {
    marginHorizontal: 16,
    marginVertical: 15,
  },
  touchableOpacity: {
    height: 56,
    backgroundColor: '#FDCF08',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  // Menu overlay
  menuOverlay: {
    flex:1,
    backgroundColor: 'white',
    marginTop: 200,
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: -10},
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

function mapStateToProps(state) {
  return { restoSelected: state.restoSelected }
}

export default connect(
  mapStateToProps,
  null
)(RestoScreen);