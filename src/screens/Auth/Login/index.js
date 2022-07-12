import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, Text, Button, Incubator} from 'react-native-ui-lib';
import {useLogin} from '../../../hooks/reactQueryHook';
const {TextField} = Incubator;

export default function Login() {
  const loginMutation = useLogin();
  const {mutate, isSuccess, data, isError, isLoading, error} = loginMutation;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = data => {
    mutate(data);
  };

  useEffect(() => {
    if (!isLoading) {
      console.log(data);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isError) {
      console.log(error);
    }
  }, [isError]);

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
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextField
                marginB-10
                placeholder={'Enter your email'}
                floatingPlaceholder={false}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                showCharCounter={false}
                label="Email"
              />
            )}
            name="email"
          />
          {errors.email && errors.email.type === 'required' && (
            <Text marginB-10 style={{color: 'red'}}>
              This is required.
            </Text>
          )}

          {errors.email && errors.email.type === 'pattern' && (
            <Text marginB-10 style={{color: 'red'}}>
              Email format invalid.
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextField
                marginB-10
                placeholder={'Enter your password'}
                floatingPlaceholder={false}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                showCharCounter={false}
                label="Password"
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text marginB-10 style={{color: 'red'}}>
              This is required.
            </Text>
          )}
          <Button marginT-20 label="Login" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  );
}
