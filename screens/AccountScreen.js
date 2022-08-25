import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Overlay, Input, Button } from "@rneui/themed";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { connect } from "react-redux";
import { TabActions } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

function AccountScreen(props) {

  const [overlayVisible, setOverlayVisible] = useState(false);
  
  // INPUTS STATES pour 'modifier ses informations'
  const [lastnameInput, setLastnameInput] = useState("");
  const [firstnameInput, setFirstnameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");

  // Bouton DECONNEXION
  const jumpToAction = TabActions.jumpTo("Restaurant");
  const navigation = useNavigation();

  var logOut = () => {
    navigation.dispatch(jumpToAction);
  }
//// TESTS [
  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}),[]);
  // useFocusEffect(
  //   useCallback(() => {
  //     console.log('oui')
  //     updateState({})
  //   }, [])
  // );
  // console.log(token)

  // useEffect(() => {
  //   console.log("Etape 1: On rentre dans le UseEffect ");
  //   // Récupération du token
  //   // const getData = async () => {
  //   //   try {
  //   //     const token =  await AsyncStorage.getItem('userToken')
  //   //     if(token){
  //   //       console.log('Etape 2: getData effectuée')
  //   //       setToken(token)
  //   //     }
  //   //   } catch (error) {
  //   //     console.log(error)
  //   //   }
  //   // }
  //   // getData();
  //   console.log("Etape 2: token");
  //   setToken(props.myToken);
  //   console.log("Mon Token");
  //   console.log(token);
  //   // props.navigation.navigate('Restaurant')
  //   // props.navigation.navigate('Restaurant', {screen: HomeScreen})

  //   // A l'aide du token on récupère les infos du user
  //   // var userInfos = async () => {
  //   //   console.log('Etape 3: userInfos effectuée')
  //   //   let privateAdressIP = "172.20.10.8";

  //   //   // Récupérer les infos BDD du User à partir du token obtenu
  //   //   //// Requête
  //   //   const getUserInfosFromBDD = await fetch("http://" + privateAdressIP + ":3000/account-screen", {
  //   //     method: "POST",
  //   //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //   //     body: `tokenFromFront=${token}`,
  //   //   });
  //   //   //// Réponse
  //   //   const userInfosFromBDD = await getUserInfosFromBDD.json();
  //   //   // console.log()
  //   //   //// Pré-remplissage

  //   //   setLastnameInput(userInfosFromBDD.userFromBDD.userName);
  //   //   setFirstnameInput(userInfosFromBDD.userFromBDD.userFirstName);
  //   //   setEmailInput(userInfosFromBDD.userFromBDD.userEmail);
  //   //   setPhoneNumberInput(userInfosFromBDD.userFromBDD.userPhone);
  //   // };
  //   // userInfos();
  // }, [token]);

  // Alternative à async/await
  // const getData = () => {
  //   try {
  //     AsyncStorage.getItem('userToken')
  //     .then(value => {
  //       if (value != null) {
  //         console.log('getData OK')
  //         setToken(value)
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // var userInfos = async () => {
  //   console.log("Etape 3: userInfos effectuée");
  //   let privateAdressIP = "172.20.10.8";

  //   // Récupérer les infos BDD du User à partir du token obtenu
  //   //// Requête
  //   const getUserInfosFromBDD = await fetch(
  //     "http://" + privateAdressIP + ":3000/account-screen",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       body: `tokenFromFront=${token}`,
  //     }
  //   );
  //   //// Réponse
  //   const userInfosFromBDD = await getUserInfosFromBDD.json();
  //   console.log(userInfosFromBDD);
  //   //// Pré-remplissage

  //   setLastnameInput(userInfosFromBDD.userFromBDD.userName);
  //   setFirstnameInput(userInfosFromBDD.userFromBDD.userFirstName);
  //   setEmailInput(userInfosFromBDD.userFromBDD.userEmail);
  //   setPhoneNumberInput(userInfosFromBDD.userFromBDD.userPhone);
  // };
  // // On récupère userFromBDD à chaque fois que l'on va sur l'onglet Mon compte
  // useFocusEffect(
  //   useCallback(() => {
  //     userInfos();
  //     console.log("UseFocusEffect OK");
  //     console.log(token);
  //   }, [token])
  // );

  // // Change le pré-remplissage des inputs si modification par le user
  // useEffect ( () => {
  //   if(hasModified) {
  //     AsyncStorage.getItem('userEmail', function(error, userEmail){
  //       if(true){
  //         setLastnameInput('modif');
  //         setFirstnameInput('modif');
  //         setEmailInput('modif');
  //         setPhoneNumberInput('modif');
  //       } else {
  //         console.log('No modification done !')
  //       }
  //     })
  //   }
  // }, [hasModified])

  // // On est pas gentil on se deconnecte de l'app
  // const deconnexion = () => {
  //   // await AsyncStorage.removeItem('userToken', (err) => console.log('userToken', err));
  //   AsyncStorage.clear()
  //   props.navigation.navigate('Home')
  //   console.log('DECONNECTER')
  //   // console.log(token)
  // }

  // useEffect(() => {
  //   AsyncStorage.clear();
  //   console.log(token)
  // }, [token])

  // useEffect(() => {
  //    console.log('useEffect')
  //    console.log(props.myToken)
  //   }, [])

  // console.log('Je suis le token du mapState dans AccountScreen')
  // console.log(props.userConnected.userBDD.userFirstName);
  // console.log('STATETOPROPS')
  // console.log(props.userConnected);

  return (
    <View style={styles.container}>

      {/* OVERLAY POUR MODIFIER SES DONNEES */}
        <Overlay
          overlayStyle={styles.overlayContainer}
          isVisible={overlayVisible}
          onBackdropPress={() => setOverlayVisible(false)}
        >
          {/* overlay title */}
          <Text style={styles.overlayTitle}>Modifier mes informations</Text>
          
          {/* overlay inputs */}
          <View style={styles.overlayInputsContainer}>
            
            <View>
              <Text style={{ fontSize: 15 }}>Nom :</Text>
              <Input
                type="text"
                value={props.userConnected.userFromBDD.userName}
                onChangeText={ (value) => { setLastnameInput(value);} }
              ></Input>
            </View>

            <View>
              <Text style={{ fontSize: 15 }}>Prénom :</Text>
              <Input
                type="text"
                value={props.userConnected.userFromBDD.userFirstName}
                onChangeText={ (value) => {setFirstnameInput(value);} }
              ></Input>
            </View>

            <View>
              <Text style={{ fontSize: 15 }}>Adresse e-mail :</Text>
              <Input
                type="email"
                value={props.userConnected.userFromBDD.userEmail}
                onChangeText={ (value) => {setEmailInput(value);} }
              ></Input>
            </View>

            <View>
              <Text style={{ fontSize: 15 }}>Numéro de téléphone :</Text>
              <Input
                keyboardType="numeric"
                type="tel"
                value={props.userConnected.userFromBDD.userPhone.toString()}
                onChangeText={ (value) => {setPhoneNumberInput(value);} }
              ></Input>
            </View>

          </View>

          {/* overlay buttons */}
          <View
            style={styles.overlayButtonsContainer}
          >
            <Button
              title="Annuler"
              type="outline"
              buttonStyle={styles.overlayCancelButton}
              titleStyle={{ color: "red" }}
              onPress={() => setOverlayVisible(false)}
            />
            <Button
              title="Valider"
              containerStyle={{}}
              buttonStyle={{ height: 56, width: 130, borderRadius: 40 }}
              titleStyle={{}}
              onPress={() => {setOverlayVisible(false); console.log("User has modified !");}}
            />
          </View>
        </Overlay>

      {/* FRONT */}
      
        {/* title */}
        <Text style={{ paddingBottom: 10, paddingTop: 10, fontSize: 30 }}>
          Vos informations
        </Text>

        {/* floating label inputs */}
        <View style={{ flex: 1, marginTop: 30, marginBottom: 80 }}>

          <FloatingLabelInput
            labelStyles={styles.labelStyle}
            containerStyles={styles.inputStyle}
            staticLabel
            label="Nom"
            editable={false}
            value={props.userConnected.userFromBDD.userName}
          ></FloatingLabelInput>
          
          <FloatingLabelInput
            labelStyles={styles.labelStyle}
            containerStyles={styles.inputStyle}
            staticLabel
            label="Prénom"
            editable={false}
            value={props.userConnected.userFromBDD.userFirstName}
          ></FloatingLabelInput>

          <FloatingLabelInput
            labelStyles={styles.labelStyle}
            containerStyles={styles.inputStyle}
            staticLabel
            label="Adresse e-mail"
            editable={false}
            value={props.userConnected.userFromBDD.userEmail}
          ></FloatingLabelInput>

          <FloatingLabelInput
            labelStyles={styles.labelStyle}
            containerStyles={styles.inputStyle}
            staticLabel
            label="Numéro de téléphone"
            editable={false}
            value={props.userConnected.userFromBDD.userPhone.toString()}
          ></FloatingLabelInput>

        </View>

        {/* buttons */}
        <Button
          buttonStyle={{ height: 56, marginTop: 20, borderRadius: 40 }}
          titleStyle={{ fontSize: 17 }}
          title="Modifier mes informations"
          onPress={() => setOverlayVisible(true)}
        />

        <Button
          buttonStyle={{ height: 56, marginTop: 20, marginBottom: 20 }}
          titleStyle={{ color: "red", fontSize: 15 }}
          type="clear"
          onPress={() => logOut()}
        >
          SE DÉCONNECTER
        </Button>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: "#fff"
  },
  // OVERLAY
  overlayContainer: {
    width: "90%",
    height: "auto",
    borderRadius: 20
  },
  overlayTitle: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 30,
    fontSize: 20,
  },
  overlayInputsContainer: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 30,
    marginBottom: 30,
  },
  overlayButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 30,
  },
  overlayCancelButton: {
    borderColor: "red",
    height: 56,
    width: 130,
    borderRadius: 40,
  },
  // FRONT
  labelStyle: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginTop: 20,
    color: "grey",
  },
  inputStyle: {
    height: 56,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: "grey",
    borderRadius: 10,
    marginTop: 20,
  },
})

function mapStateToProps(state) {
  return { userConnected: state.user };
}

export default connect(
  mapStateToProps,
  null
)(AccountScreen);
