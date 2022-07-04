/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as TalkRn from '@talkjs/react-native';
import ConversationList from './src/screens/ConversationList';
import ChatBox from './src/screens/Chatbox';
import Login from './src/screens/Auth/Login';

const me = {
  id: '1',
  name: 'huynievoxo',
  email: 'huynie007@gmail.com',
  photoUrl:
    'https://voxohub.xyz/wp-content/uploads/2022/05/08b0155f456f09ea8360de863e1b1bb2.jpg',
  welcomeMessage: 'Hey there! How are you? :-)',
  role: 'administrator',
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Conversation"
          component={ConversationList}
          initialParams={{me}}
        />
        <Stack.Screen name="ChatBox" component={ChatBox} initialParams={{me}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
