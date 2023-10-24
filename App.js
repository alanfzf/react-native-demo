import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserList from './screens/user-list';
import DetailUser from './screens/detail-user';
import CreateUser from './screens/create-user';

const Stack = createNativeStackNavigator()

function MyStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name='UserListScreen' component={UserList}/>
      <Stack.Screen name='UserDetailScreen' component={DetailUser}/>
      <Stack.Screen name='UserCreateScreen' component={CreateUser}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}


