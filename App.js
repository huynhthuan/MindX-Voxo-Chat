/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConversationList from './src/screens/ConversationList';
import ChatBox from './src/screens/Chatbox';
import Login from './src/screens/Auth/Login';
import {QueryClientProvider, QueryClient, QueryCache} from 'react-query';
import {AppState, Platform} from 'react-native';
import {focusManager} from 'react-query';
import Toast from 'react-native-toast-message';

const me = {
  id: 'sale_15',
  name: 'Du Thung',
  email: 'sales2@gmail.com',
  photoUrl:
    'https://voxohub.xyz/wp-content/uploads/2022/05/08b0155f456f09ea8360de863e1b1bb2.jpg',
  welcomeMessage: 'Hey there! How are you? :-)',
  role: 'sale',
};

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onerror: error => {
      Toast.show({
        type: 'error',
        text1: error,
      });
    },
  }),
});

const App = () => {
  function onAppStateChange(status) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
          <Stack.Screen
            name="ChatBox"
            component={ChatBox}
            initialParams={{me}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </QueryClientProvider>
  );
};

export default App;
