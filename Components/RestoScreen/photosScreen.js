import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, View, ScrollView } from 'react-native';
import { Overlay } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";

// let deviceWidth = Dimensions.get('window').width;
// let deviceHeight = Dimensions.get('window').height;

function photosScreen(props) {

  const [overlayIsVisible, setOverlayIsVisible] = useState(false);
  const [imgPressed, setImgPressed] = useState();
  
  // Function for onPress options of TouchableOpacity
  var imgFullScreen = (resto) => {
    setOverlayIsVisible(true);
    setImgPressed(resto);
  }

  // map function to iterate img from resto selected
  var imgFromJSONFile = props.restoSelected[0].images.map((resto, i) => {
    return (
      <TouchableOpacity key={i} style={styles.imgContainer} onPress={() => {imgFullScreen(resto.uri)}}>
        <Image style={styles.image} source={{ uri: resto.uri }}/>
      </TouchableOpacity>
    )
  })

  return (
    <ScrollView style={{backgroundColor:'white'}}>

      <View>
        <Overlay style={styles.imgOverlay} isVisible={overlayIsVisible} onPress={() => setOverlayIsVisible(false)} onBackdropPress={() => setOverlayIsVisible(false)}>
          <Image style={{width: '100%', aspectRatio: 5/3}} source={{ uri: imgPressed }}/>
          <Ionicons name="arrow-back-circle" size={45} color='white' style={styles.iconContainer} onPress={() => setOverlayIsVisible(false)} />
        </Overlay>
      </View>

      <View style={styles.gallery}>
        { imgFromJSONFile }
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
)(photosScreen);

const styles = StyleSheet.create({
  gallery:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginVertical: 10,
    // marginHorizontal: 1,
    // justifyContent: 'center',
    // width: deviceWidth,
  },
  imgContainer: {
    backgroundColor: 'lightgrey',
    height: 108,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 8,
    // marginVertical: 5,
  },
  image: {
    flex:1,
    aspectRatio: 1 / 1,
    borderRadius: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: -250,
    left: 10,
  },
  imgOverlay: {
    flex:1,
    width: 'auto',
  }
})