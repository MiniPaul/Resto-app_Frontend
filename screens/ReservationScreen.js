import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { Overlay } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { TabActions } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-modern-datepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AntDesign } from '@expo/vector-icons';


function ReservationScreen(props) {

  // Pour naviguer vers un screen du Bottom Tab Nav à partir d'un bouton
  const jumpToAction = TabActions.jumpTo("Mes réservations");
  const navigation = useNavigation();

  // INPUTS STATES
  const [counterAdults, setCounterAdults] = useState(0);
  const [counterChildren, setCounterChildren] = useState(0);
  const [counterBabies, setCounterBabies] = useState(0);
  const [date, setDate] = useState(props.userSearch[0].date);
  const [hour, setHour] = useState(props.userSearch[0].heure);
  const [name, setName] = useState(props.userConnected.userFromBDD.userName.toUpperCase());
  const [phone, setPhone] = useState('0'+props.userConnected.userFromBDD.userPhone);

  // Fonctions pour formatter la date au format local  
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  // DATE & TIME OVERLAYS
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [hourVisible, setHourVisible] = useState(false);

  const timePicker = ()=> {
    return (
      <DatePicker
        mode="time"
        minuteInterval={15}
        onTimeChange={selectedTime => {setHour(selectedTime); setHourVisible(false)}}
      />
    )
  }

  // Fonctions pour que le compteur convives ne soit pas < 0
  function minConvivesAdults() {
    if(counterAdults < 1) {
      setCounterAdults(0)
    } else {
      setCounterAdults(counterAdults-1)
    }
  }

  function minConvivesChildren() {
    if(counterChildren < 1) {
      setCounterChildren(0)
    } else {
      setCounterChildren(counterChildren-1)
    }
  }

  function minConvivesBabies() {
    if(counterBabies < 1) {
      setCounterBabies(0)
    } else {
      setCounterBabies(counterBabies-1)
    }
  }

//// SAVE RESERVATION IN BDD
  // let privateAdressIP = "172.20.10.8"; // Laurent
  // let privateAdressIP = "172.20.10.4"; // Pauline
  // let privateAdressIP = "192.168.1.14"; // Johann

  // Connection with BackEnd to create a User in BDD
  var saveReservation = async () => {
      // Add new reservation in database using route from back end
      const saveResa = await fetch("https://resto-lacapsule.herokuapp.com/reservation" /* "http://"+ privateAdressIP +":3000/reservation" */, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `restoName=${props.restoSelected[0].name}&restoAddress=${props.restoSelected[0].address}&restoZIPCode=${props.restoSelected[0].ZIPcode}&restoCity=${props.restoSelected[0].city}&restoPhone=${props.restoSelected[0].phoneNumber}&date=${date}&hour=${hour}&numberOfPeople=${counterAdults+counterChildren+counterBabies}&resaName=${name}&resaPhone=${parseInt(phone)}&status=${'En attente...'}&tokenFromRedux=${props.userConnected.userFromBDD.token}`,
      });
      const responseJson = await saveResa.json();
      // console.log('Voici la réservation sauvegardé')
      // console.log(responseJson)
  };

  // Vérification du numéro de téléphone avant sauvegarde en BDD
  const [emptyInput, setEmptyInput] = useState("")
  const [invalidPhone, setInvalidPhone] = useState("");

  const handleReservation = () => {
    if (date == "" || hour == "" || name == "" || phone == "") {
      setEmptyInput('Un ou plusieurs champ(s) sont vide(s)')
    } else if (phone.length !== 10) {
      setInvalidPhone('Numéro de téléphone incorrect')
    } else {
      saveReservation();
      setResaConfirmed(true);
      onceResaConfirmed();
      setTimeout(() => {
        setResaConfirmed(false);
        navigation.navigate('Recherche');
      }, 2000)
    }
  };

  // Vider les useState au bout de quelques secondes
  setTimeout(() => {
    setEmptyInput("");
    setInvalidPhone("");
  }, 3000);

  // Ajouter un overlay 'Réservation Validée'
  const [resaConfirmed, setResaConfirmed] = useState(false);

  const onceResaConfirmed = () => {
    setTimeout(() => {
      navigation.dispatch(jumpToAction);
    }, 3000);
  }

  return (
    <KeyboardAwareScrollView>
    <View behavior="padding" style={{backgroundColor:'white', flex:1}}>

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

        {/* CALENDAR OVERLAY */}
        <Overlay isVisible={calendarVisible} onBackdropPress={() => setCalendarVisible(false)} overlayStyle={{width: '90%'}}>
          <Calendar onDayPress={day => { setDate(day.dateString); setCalendarVisible(false) }}/>
        </Overlay>

        {/* TIME OVERLAY */}
        <Overlay isVisible={hourVisible} onBackdropPress={() => setHourVisible(false)} overlayStyle={{width: '90%', height: 'auto', borderRadius: 20}} >
        {timePicker()}
        </Overlay>

        {/* Inputs */}
        <View style={styles.inputsContainer}>
          {/* Date */}
          <View>
            <Text style={styles.inputHeader}>Date</Text>
            <TextInput editable={false} value={formatDate(new Date(date))} style={[styles.input, {paddingLeft: 10}]} onPressIn={() => setCalendarVisible(true)}/>
          </View>

          {/* Heure */}
          <View>
            <Text style={styles.inputHeader}>Heure</Text>
            <TextInput editable={false} value={hour} style={[styles.input, {paddingLeft: 10}]} onPressIn={() => setHourVisible(true)}/>
          </View>

          {/* Nombre de convives */}
          <View>
            <Text style={styles.inputHeader}>Nombre de convives</Text>

            <View style={styles.inputsConvivesContainer}>
              
              {/* Adultes */}
              <View style={styles.inputConvives}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>ADULTES</Text>
                <Text style={{fontSize: 12}}>13 ans et +</Text>

                {/* Stepper Input */}
                <View style={{flexDirection:'row'}}>
                  <View style={{zIndex : 1, position:'absolute', alignSelf:'center', left: 10}}>
                    <Ionicons name="remove-circle" size={24} color="lightgrey" onPress={() => minConvivesAdults()}/>
                  </View>
                  <TextInput
                    editable={false}
                    style={[styles.input, styles.inputStepper]}
                    value={counterAdults.toString()}
                    textAlign='center'
                  />
                  <View style={{position:'absolute', alignSelf:'center', right: 10}}>
                    <Ionicons name="add-circle" size={24} color="lightgrey" onPress={ () => setCounterAdults(counterAdults+1) }/>
                  </View>
                </View>

              </View>

              {/* Enfants */}
              <View style={styles.inputConvives}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>ENFANTS</Text>
                <Text style={{fontSize: 12}}>de 2 à 12 ans</Text>

                {/* Stepper Input */}
                <View style={{flexDirection:'row'}}>
                  <View style={{zIndex : 1, position:'absolute', alignSelf:'center', left: 10}}>
                    <Ionicons name="remove-circle" size={24} color="lightgrey" onPress={() => minConvivesChildren()}/>
                  </View>
                  <TextInput
                    editable={false}
                    style={[styles.input, styles.inputStepper]}
                    value={counterChildren.toString()}
                    textAlign='center'
                  />
                  <View style={{position:'absolute', alignSelf:'center', right: 10}}>
                    <Ionicons name="add-circle" size={24} color="lightgrey" onPress={ () => setCounterChildren(counterChildren+1) }/>
                  </View>
                </View>

              </View>

              {/* Bébé */}
              <View style={styles.inputConvives}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>BÉBÉ</Text>
                <Text style={{fontSize: 12}}>- de 2 ans</Text>
                
                {/* Stepper Input */}
                <View style={{flexDirection:'row'}}>
                  <View style={{zIndex : 1, position:'absolute', alignSelf:'center', left: 10}}>
                    <Ionicons name="remove-circle" size={24} color="lightgrey" onPress={() => minConvivesBabies()}/>
                  </View>
                  <TextInput
                    editable={false}
                    style={[styles.input, styles.inputStepper]}
                    value={counterBabies.toString()}
                    textAlign='center'
                  />
                  <View style={{position:'absolute', alignSelf:'center', right: 10}}>
                    <Ionicons name="add-circle" size={24} color="lightgrey" onPress={ () => setCounterBabies(counterBabies+1) }/>
                  </View>
                </View>
                
              </View>
            
            </View>
          </View>

          {/* Nom */}
          <View>
            <Text style={styles.inputHeader}>Nom associé</Text>
            <TextInput value={name} onChangeText={(value) => setName(value)} style={[styles.input, {paddingLeft: 10}]}/>
          </View>

          {/* Numéro de téléphone */}
          <View>
            <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
              <Text style={styles.inputHeader}>Numéro de téléphone</Text>
              <TouchableOpacity><Text style={{fontSize: 10, fontStyle:'italic', textDecorationLine: 'underline'}}>Changer de numéro</Text></TouchableOpacity>
            </View>

            <TextInput keyboardType='phone-pad' onChangeText={(value) => setPhone(value)} value={phone.toString()} style={[styles.input, {paddingLeft: 10}]}/>
          </View>
        </View>

        {/* Messages d'erreurs */}
        <Text style={{paddingHorizontal:15, color: 'red', fontStyle: 'italic', fontSize:10, marginTop: -20}}>{emptyInput}</Text>
        <Text style={{paddingHorizontal:15, color: 'red', fontStyle: 'italic', fontSize:10}}>{invalidPhone}</Text>

        {/* Button */}
        <View>
          <TouchableOpacity style={styles.button} onPress={() => handleReservation()}><Text style={styles.buttonTitle}>Je réserve</Text></TouchableOpacity>
        </View>

        {/* RESA VALIDEE OVERLAY */}
        <Overlay isVisible={resaConfirmed} overlayStyle={{width: '80%', alignItems: 'center', paddingVertical: 40, borderRadius: 20}}>
          <AntDesign name="checkcircleo" size={100} color="#005249" style={{}}/>
          <Text style={{marginTop: 30, marginBottom: 20, fontSize: 16, fontWeight: 'bold'}}>RÉSERVATION VALIDÉE !</Text>
          <Text style={{textAlign: 'center', fontStyle: 'italic'}}>Il ne vous reste plus qu'à attendre la confirmation du Restaurateur.</Text>
        </Overlay>
    
     </View>
     </KeyboardAwareScrollView>
  );
}

function mapStateToProps(state) {
  return { restoSelected: state.restoSelected, userConnected: state.user, userSearch: state.search }
}

export default connect(
  mapStateToProps,
  null
)(ReservationScreen);

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
    aspectRatio: 1 / 1,
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
  //Inputs
  inputsContainer: {
    paddingHorizontal: 16,
    marginTop: 12
  },
  inputHeader: {
    fontSize: 16,
    fontWeight: '400'
  },
  input:{
    height: 44,
    borderWidth: 0.3,
    borderColor: 'grey',
    marginVertical: 10,
    borderRadius: 20,
  },
  // Nombre de convives
  inputsConvivesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputConvives: {
    width: '30%',
    alignItems: 'center',
  },
  inputStepper: {
    width: '100%',
  },
  // Button
  button: {
    backgroundColor: '#FDCF08',
    height: 56,
    marginHorizontal: 16,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: 'bold'
  },
});
