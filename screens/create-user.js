import React, { useState } from "react";
import { Button, View, StyleSheet, TextInput, ScrollView, } from "react-native";
import  { createUser } from '../database/firebase'


function CreateUser(props){

  const [state, setState] = useState({ name: "", email: "", phone: "", });
  const handleChangeText = (value, name) => { setState({ ...state, [name]: value }) };


  const saveNewUser = async () => {
    const {name, email, phone} = state
    if(!name || !email || !phone){ alert("Verifica los campos!"); return }

    try {
      await createUser(name,email,phone)
      props.navigation.navigate("UserListScreen")
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "email")}
          value={state.email}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone"
          onChangeText={(value) => handleChangeText(value, "phone")}
          value={state.phone}
        />
      </View>

      <View style={styles.button}>
        <Button title="Save User" onPress={() => saveNewUser()} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});


export default CreateUser
