import React from 'react';
import {View, Text, Button, Incubator} from 'react-native-ui-lib';
const {TextField} = Incubator;
export default function Login() {
  return (
    <View flex centerH centerV>
      <View style={{width: '100%'}}>
        <Text
          center
          marginB-40
          style={{
            fontSize: 18,
          }}>
          Voxo Chat
        </Text>

        <View paddingH-40>
          <TextField
            placeholder={'Enter your email'}
            floatingPlaceholder={false}
            onChangeText={() => console.log('changed')}
            enableErrors
            validate={['required', 'email', value => value.length > 6]}
            validationMessage={[
              'Field is required',
              'Email is invalid',
              'Password is too short',
            ]}
            showCharCounter={false}
            label="Email"
          />
          <TextField
            placeholder={'Enter your password'}
            floatingPlaceholder={false}
            onChangeText={() => console.log('changed')}
            enableErrors
            validate={['required']}
            validationMessage={['Field is required']}
            showCharCounter={false}
            label="Password"
          />
          <Button label="Login" />
        </View>
      </View>
    </View>
  );
}
