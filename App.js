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
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {logOut} from './src/redux/features/authSlice';
import {Button} from 'react-native-paper';

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
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();

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
        <Stack.Navigator
          screenOptions={{
            headerRight: () => (
              <Button
                mode="contained"
                onPress={() => {
                  dispatch(logOut());
                }}>
                Logout
              </Button>
            ),
          }}>
          {authState.isLogin ? (
            <>
              <Stack.Screen
                name="Conversation"
                component={ConversationList}
                initialParams={{me: authState.user}}
              />
              <Stack.Screen
                name="ChatBox"
                component={ChatBox}
                initialParams={{me: authState.user}}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </QueryClientProvider>
  );
};

export default App;
