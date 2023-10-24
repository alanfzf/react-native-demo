import React, { useState, useEffect } from "react";
import { Button, StyleSheet} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { getUsers } from "../database/firebase";

function UserList(props){

  const [users, setUsers] = useState([])


  useEffect(()=>{
    getUsers().then(x =>{ setUsers(x) })
  }, [])


  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getUsers().then(x =>{ setUsers(x) })
    });
    return unsubscribe;
  }, [props.navigation]);


  return (
    <ScrollView style={styles.container}>
      <Button
        onPress={() => props.navigation.navigate("UserCreateScreen")}
        title="Crear usuario"
      />

      { 
        users.map((user) => {
          return (
            <ListItem key={user.id} 
              bottomDivider 
              onPress={() => { 
                props.navigation.navigate("UserDetailScreen", 
                  { userId: user.id, }); 
              }} 
            > 
              <ListItem.Chevron />
              <Avatar source={{ uri: "https://i.imgur.com/VI6Ahvp.jpg", }} rounded />
              <ListItem.Content>
                <ListItem.Title>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )})
      }
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
});

export default UserList
