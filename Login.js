import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, View } from "react-native";

const sendText = async (phoneNumber) => {

  // using fetch do a POST to https://dev.stedi.me/twofactorlogin/9497933305
  console.log("Phone Number: ",phoneNumber);
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers: {
      'content-type':'application/text'
    }
  });
  const loginResponseText = await loginResponse.text(); //converts the promise to a string by using await
  console.log('Login Response',loginResponseText);//print the response
}

const getToken = async({phoneNumber,otp}) =>{//THIS CODE IS NOT COMPLETE
  console.log('PhoneNumber',phoneNumber);
  console.log('OTP',oneTimePassword);
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    headers: {
      'content-type':'application/text'
    },
    body:{
      phoneNumber,
      oneTimePassword
    }
  });
  const token = await loginResponse.text();
  console.log(token);
}

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="801-555-1212"
      />
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin: {
    marginTop:100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export default Login;