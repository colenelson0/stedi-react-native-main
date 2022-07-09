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

const getToken = async({phoneNumber, oneTimePassword, setUserLoggedIn}) =>{
  console.log('Phone Number',phoneNumber);
  console.log('OTP',oneTimePassword);
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    body:JSON.stringify({oneTimePassword, phoneNumber}),
    headers: {
      'content-type':'application/text'
    }
  });

  const responseCode = tokenResponse.status;
  console.log('Response Code',responseCode);
  if (responseCode==200){
    setUserLoggedIn(true);
  }
  const tokenResponseString = await tokenResponse.text;
  getEmail(tokenResponseString);
}

const getEmail = async (token) => {
  const emailResponse = await fetch('https://dev.stedi.me/validate/'+token,{
      method: 'GET',
      headers: {
        'content-type':'application/text'
      }
  })
  const emailResponseText = await emailResponse.text();
  console.log('Response Email', emailResponseText);
};

const Login = (props) => {
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
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
      >
        <Text>Send Text</Text>
      </TouchableOpacity>
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
        onPress={()=>{
          getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn});
        }}
      >
        <Text>Login</Text>
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