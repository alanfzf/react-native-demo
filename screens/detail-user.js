import React, { useEffect, useState } from "react";
import { ScrollView, Button, View, Alert, ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { deleteUser, editUser, getUserById } from "../database/firebase";


const DetailUser = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ id: "", name: "", email: "", phone: "", });
  const handleTextChange = (value, prop) => { setUser({ ...user, [prop]: value }); };


  const openConfirmationAlert = () => {
      Alert.alert(
        "Removing the User",
        "Are you sure?",
        [
          { text: "Yes", onPress: 
          async () => {
            const id = props.route.params.userId
            await deleteUser(id)
            props.navigation.navigate("UserListScreen")
          }
        },
          { text: "No", onPress: () => {}},
        ],
        { cancelable: true, }
      );
  };

  const updateUser = async () => {
    const {id, name,email,phone} = user
    await editUser(id, name,email,phone)
    props.navigation.navigate("UserListScreen");
  };


  useEffect(() => { 
    getUserById(props.route.params.userId).then(x =>{
      setUser(x)
      setLoading(false)
    })
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          autoCompleteType="username"
          style={styles.inputGroup}
          value={user.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="email"
          placeholder="Email"
          style={styles.inputGroup}
          value={user.email}
          onChangeText={(value) => handleTextChange(value, "email")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Phone"
          autoCompleteType="tel"
          style={styles.inputGroup}
          value={user.phone}
          onChangeText={(value) => handleTextChange(value, "phone")}
        />
      </View>
      <View style={styles.btn}>
        <Button title="Delete" onPress={() => openConfirmationAlert()} color="#E37399" />
      </View>
      <View>
        <Button title="Update" onPress={updateUser} color="#19AC52" />
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default DetailUser;
