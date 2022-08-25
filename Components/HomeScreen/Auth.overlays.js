import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { Button, Overlay } from "@rneui/themed";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Icon } from '@rneui/themed'
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function Authentification(props) {
  // let privateAdressIP = "172.20.10.8"; // Laurent
  // let privateAdressIP = "172.20.10.4"; // Pauline
  // let privateAdressIP = "192.168.1.14"; // Johann

  // Overlays Visibility
  const [visibleOverlaySub, setVisibleOverlaySub] = useState(false);
  const [visibleOverlayLog, setVisibleOverlayLog] = useState(false);
  const [visibleOverlayForget, setVisibleOverlayForget] = useState(false);
  const [visibleOpeningLogo, setVisibleOpeningLogo] = useState(true);

  // Display errors
  const [errorSignUp, setErrorSignUp] = useState([]);
  const [errorLogin, setErrorLogin] = useState([]);

  ///////// OPENING LOGO ///////////
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleOpeningLogo(false);
      setVisibleOverlaySub(true);
    }, 2000);
  }, []);

  ///////// SUBSCRIBE ///////////
  // Save inputs values
  const [signupLastName, setSignupLastName] = useState("");
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupTel, setSignupTel] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [emptyInput, setEmptyInput] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPhone, setInvalidPhone] = useState("");

  // Lancer le sign up après vérification de chaque input
  const handleSignUp = () => {
    if (
      signupLastName == "" ||
      signupFirstName == "" ||
      signupEmail == "" ||
      signupTel == "" ||
      signupPassword == ""
    ) {
      setEmptyInput("Un ou plusieurs champ(s) sont vide(s)");
    } else if (!signupEmail.match(/\S+@\S+\.\S+/)) {
      setInvalidEmail("Adresse e-mail incorrecte");
    } else if (signupTel.length !== 10) {
      setInvalidPhone("Numéro de téléphone incorrect");
    } else {
      signup();
    }
  };

  // Vider les useState au bout de quelques secondes
  setTimeout(() => {
    setEmptyInput("");
    setInvalidEmail("");
    setInvalidPhone("");
  }, 3000);

  // Connection with BackEnd to create a User in BDD
  var signup = async () => {
    // 1. Add new user in database using route from back end
    const saveUser = await fetch("https://resto-lacapsule.herokuapp.com/signup" /*"http://" + privateAdressIP + ":3000/signup"*/, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `firstNameFromFront=${signupFirstName}&nameFromFront=${signupLastName}&emailFromFront=${signupEmail}&passwordFromFront=${signupPassword}&phoneFromFront=${signupTel}`,
    });
    const body = await saveUser.json();
    // console.log('Voici le user sauvegardé')
    // console.log(body);

    // 2. Close overlay + Sauvegarder le user dans Redux
    if (body.result === true) {
      props.saveUser(body);
      setVisibleOverlaySub(false);
    } else {
      setErrorSignUp(body.error);
    }
  };

  ///////// LOGIN ///////////
  // Save inputs values
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Vider les useState au bout de quelques secondes
  setTimeout(() => {
    setErrorLogin("");
  }, 4000);

  // On vérifie dans le backend si le user existe déjà ou pas
  var checkConnectionInformation = async () => {
    try {
      // 1. On envoie les infos du user pour le connecter
      var connectionInfos = await fetch("https://resto-lacapsule.herokuapp.com/sign-in" /*"http://" + privateAdressIP + ":3000/sign-in"*/,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`,
        }
      );
      var bodyConnectionInfos = await connectionInfos.json();
      // console.log(bodyConnectionInfos)

      // 2. Close overlay + Sauvegarder le user dans Redux
      if (bodyConnectionInfos.result == true) {
        props.saveUser(bodyConnectionInfos);
        setVisibleOverlayLog(false);
      } else {
        setErrorLogin(bodyConnectionInfos.error);
      }
    } catch (err) {
      // Error si pas de user trouvé en BDD
      console.log("No user connected");
    }
  };

  ///////// FORGET PASSWORD ///////////
  // Save inputs values
  const [emailReset, setEmailReset] = useState("");
  const [passwordReset, setPasswordReset] = useState("");

  // Reset Password States
  const [confirmedPasswordReset, setConfirmedPasswordReset] = useState("");
  const [resetPsw, setResetPsw] = useState(false);

  // Connexion avec le BackEnd pour modifier le MDP du User en BDD
  var resetPassword = async () => {
    const dataResetPassword = await fetch("https://resto-lacapsule.herokuapp.com/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromResetPassword=${emailReset}&passwordFromResetPassword=${passwordReset}&passwordFromResetPasswordConfirmed=${confirmedPasswordReset}`,
    });

    const bodyResetPassword = dataResetPassword.json();

    // Si tout est ok en back, result = true, et donc on setResetPsw à true
    // et ensuite si resetPsw on revient sur l'overlay j'ai déjà un compte
    if (bodyResetPassword.result) {
      console.log("test resetPassword");
      setResetPsw(true);
    }
  };

  return (
    <View>
      {/* RESTO LOGO OPENING */}
      <Overlay
        isVisible={visibleOpeningLogo}
        overlayStyle={{
          flex: 1,
          width: "100%",
          height: "100%",
          backgroundColor: "#FDCF08",
        }}
      >
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../../assets/Logo.png")}
        />

        <View style={{ position: "absolute", bottom: 80, alignSelf: "center" }}>
          <ActivityIndicator size="small" color="#005249" />
        </View>
        {/* <TouchableOpacity
                style={{position: "absolute", bottom: 80, alignSelf: 'center', backgroundColor: '#005249', width: '100%', margintHorizo
            : 16, alignItems: 'center', justifyContent:'center', height: 44, borderRadius: 40 }}
                onPress={() => setVisibleOpeningLogo(false)}
            >
                <Text style={{color:'white', fontSize: 17}}>
                    Commencer
                </Text>
            </TouchableOpacity> */}

        </Overlay>
      
        {/* SUBSCRIBE */}
        <Overlay isVisible={visibleOverlaySub} overlayStyle={{width: '90%', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 30}}>
        <KeyboardAwareScrollView>
            {/* input Last Name */}
            <FloatingLabelInput
                onChangeText={(msg) => setSignupLastName(msg)}
                value={signupLastName.toUpperCase()}
                labelStyles={styles.labelStyles}
                containerStyles={styles.containerStyles}
                staticLabel
                label="Nom"
                placeholder="Nom"
            ></FloatingLabelInput>
            <Text></Text>

            {/* input First Name */}
            <FloatingLabelInput
                onChangeText={(msg) => setSignupFirstName(msg)}
                value={signupFirstName}
                labelStyles={styles.labelStyles}
                containerStyles={styles.containerStyles}
                staticLabel
                label="Prénom"
                placeholder="Prénom"
            ></FloatingLabelInput>
            <Text></Text>

            {/* input Email */}
            <FloatingLabelInput
                onChangeText={(msg) => setSignupEmail(msg)}
                value={signupEmail}
                keyboardType="email-address"
                labelStyles={styles.labelStyles}
                containerStyles={styles.containerStyles}
                staticLabel
                label="Email"
                placeholder="Email"
            ></FloatingLabelInput>
            <Text style={{paddingHorizontal:15, color: 'red', fontStyle: 'italic', fontSize:10}}>{invalidEmail}</Text>

            {/* input Phone Number */}
            <FloatingLabelInput
                onChangeText={(msg) => setSignupTel(msg)}
                value={signupTel}
                keyboardType="numeric"
                labelStyles={styles.labelStyles}
                containerStyles={styles.containerStyles}
                staticLabel
                label="Tel"
                placeholder="Tel"
            ></FloatingLabelInput>
            <Text style={{paddingHorizontal:15, color: 'red', fontStyle: 'italic', fontSize:10}}>{invalidPhone}</Text>

            {/* input Password */}
            <FloatingLabelInput
                isPassword={true}
                onChangeText={(msg) => setSignupPassword(msg)}
                value={signupPassword}
                labelStyles={styles.labelStyles}
                containerStyles={styles.containerStyles}
                staticLabel
                label="Mot de passe"
                placeholder="Mot de passe"
                customShowPasswordComponent={<Icon name="eye" type="entypo" />}
                customHidePasswordComponent={<Icon name="eye-with-line" type="entypo" />}
            ></FloatingLabelInput>
            <Text style={{paddingHorizontal:15, color: 'red', fontStyle: 'italic', fontSize:10}}>{emptyInput}</Text>
            <Text style={{paddingHorizontal:15, color: 'red', fontStyle: 'italic', fontSize:10}}>{errorSignUp}</Text>

            {/* Button Subscribe */}
            <Button
                buttonStyle={{backgroundColor: '#FDCF08'}}
                titleStyle={{color: 'black'}}
                containerStyle={{borderRadius: 40, marginTop: 20, marginBottom: 10}}
                title="S'inscrire"
                onPress={() => {
                    console.log("Click sur s'inscrire détécté !");
                    handleSignUp();
                    // signup();
            }}
            />

            {/* Button Google Connect */}
            {/* <Button

                buttonStyle={{backgroundColor: 'white'}}
                titleStyle={{color:'black'}}
                containerStyle={{borderRadius: 40, marginBottom: 10, borderWidth: 0.5}}
                title="Connexion via Google"
                onPress={() => console.log("s'inscrire via google")}
            /> */}


            {/* J'ai déjà un compte */}
            <Text style={{ textAlign: "center", marginTop: "4%", marginBottom: "2%" }}>
                J'ai déjà un compte
            </Text>

            <TouchableOpacity style={{marginTop: 10}} onPress={() => { setVisibleOverlaySub(false); setVisibleOverlayLog(true);}}>
                <Text style={{ textAlign: "center", color: "#005249", fontWeight: '600' }}>
                    SE CONNECTER
                </Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
        </Overlay>

        {/* LOGIN */}
        <Overlay isVisible={visibleOverlayLog} overlayStyle={{ width: "90%", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 30 }}>
            {/* Flèche retour */}
            <AntDesign name="arrowleft" size={24} color="black" onPress={() => {setVisibleOverlayLog(false); setVisibleOverlaySub(true)}}/>

            {/* Input Email */}
            <FloatingLabelInput
                keyboardType="email-address"
                onChangeText={(value) => setSignInEmail(value)}
                value={signInEmail}
                labelStyles={styles.labelStyles}
                containerStyles={styles.containerStyles}
                staticLabel
                label="Email"
                placeholder="Email"
            ></FloatingLabelInput>

            {/* Input Password */}
            <FloatingLabelInput
                onChangeText={(value) => setSignInPassword(value)}
                value={signInPassword}
                isPassword={true}
                customShowPasswordComponent={<Icon name="eye" type="entypo" />}
                customHidePasswordComponent={<Icon name="eye-with-line" type="entypo" />}
                labelStyles={styles.labelStyles}
                containerStyles={styles.containerStyles}
                staticLabel
                label="Mot de passe"
                placeholder="Mot de passe"
            ></FloatingLabelInput>

            {/* Button Forget Password */}
            <TouchableOpacity onPress={() => {setVisibleOverlayLog(false); setVisibleOverlayForget(true);}}>
                <Text
                    style={{textAlign: "right", color: "green", fontSize: 10, paddingRight: 20,}}
                >
                    Mot de passe oublié
                </Text>
            </TouchableOpacity>

            <Text style={{paddingHorizontal:15, marginTop: 8, color: 'red', fontStyle: 'italic', fontSize:10}}>{errorLogin}</Text>

            {/* Button Login */}
            <Button
                buttonStyle={{backgroundColor: '#FDCF08'}}
                titleStyle={{color: 'black'}}
                containerStyle={{borderRadius: 40, marginTop: 30, marginBottom: 10}}
                title="Se connecter"
                onPress={() => {
                    console.log('click sur Se Connecter détécté !');
                    checkConnectionInformation();
                }}
            />
        </Overlay>

        {/* FORGET PASSWORD */}
        <Overlay isVisible={visibleOverlayForget} overlayStyle={{ width: "90%", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 30 }}>
        <KeyboardAwareScrollView>
            {/* Flèche retour */}
            <AntDesign name="arrowleft" size={24} color="black" onPress={() => {setVisibleOverlayForget(false); setVisibleOverlayLog(true)}}/>

            {/* Input Email */}
            <FloatingLabelInput
                onChangeText={(msg) => setEmailReset(msg)}
                value={emailReset}
                labelStyles={styles.labelStyles}
                containerStyles={styles.containerStyles}
                staticLabel
                label="Email"
                placeholder="Email"
            ></FloatingLabelInput>

            {/* Input New Password */}
            <FloatingLabelInput
                onChangeText={(msg) => setPasswordReset(msg)}
                value={passwordReset}
                isPassword={true}
                customShowPasswordComponent={<Icon name="eye" type="entypo" />}
                customHidePasswordComponent={<Icon name="eye-with-line" type="entypo" />}
                labelStyles={styles.labelStyles}
                containerStyles={styles.containerStyles}
                staticLabel
                label="Nouveau mot de passe"
                placeholder="Nouveau mot de passe"
            ></FloatingLabelInput>

            {/* Input New Password Confirm */}
            <FloatingLabelInput
                onChangeText={(msg) => setConfirmedPasswordReset(msg)}
                value={confirmedPasswordReset}
                isPassword={true}
                customShowPasswordComponent={<Icon name="eye" type="entypo" />}
                customHidePasswordComponent={<Icon name="eye-with-line" type="entypo" />}
                labelStyles={styles.labelStyles}
                containerStyles={styles.containerStyles}
                staticLabel
                label="Confirmer le nouveau mot de passe"
                placeholder="Confirmer le nouveau mot de passe"
            ></FloatingLabelInput>

            
            <Button
                title="Valider"
                buttonStyle={{backgroundColor: '#FDCF08'}}
                titleStyle={{color: 'black'}}
                containerStyle={{borderRadius: 40, marginTop: 30, marginBottom: 10}}
                onPress={() => setVisibleOverlayForget(false)}
            />
        </KeyboardAwareScrollView>
        </Overlay>
        
    </View>
  );
}

const styles = StyleSheet.create({
  labelStyles: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginTop: 20,
    marginLeft: 15,
  },
  containerStyles: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "grey",
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    saveUser: function (user) {
      dispatch({ type: "saveUser", user: user });
    },
  };
}

export default connect(null, mapDispatchToProps)(Authentification);
