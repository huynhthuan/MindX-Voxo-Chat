import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, Text} from 'react-native-ui-lib';
import {useLogin} from '../../../hooks/reactQueryHook';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../../redux/features/authSlice';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';

export default function Login() {
  const loginMutation = useLogin();
  const {mutate, isSuccess, data, isError, isLoading, error} = loginMutation;
  const dispatch = useDispatch();

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
      if (data) {
        if (data.data.status === 'error') {
          Toast.show({
            type: 'error',
            text1: 'Notice',
            text2: data.data.error,
          });
          loginMutation.reset();
          return;
        }

        const userData = data.data.user;

        dispatch(
          loginSuccess({
            id: userData.id,
            name: userData.displayname,
            email: userData.email,
            photoUrl: userData.avatar,
            welcomeMessage: 'Hey there! How are you? :-)',
            role: userData.role[0],
          }),
        );

        Toast.show({
          type: 'success',
          text1: 'Notice',
          text2: 'Login successfully',
        });
        loginMutation.reset();
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: 'Notice',
        text2: error,
      });
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
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                mode="outlined"
                label="Email"
                placeholder={'Enter your email'}
                error={errors.email}
                style={{
                  marginBottom: 20,
                }}
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
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                mode="outlined"
                label="Password"
                placeholder="Enter your password"
                secureTextEntry={true}
                error={errors.password}
                style={{
                  marginBottom: 20,
                }}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text marginB-10 marginT-5 style={{color: 'red'}}>
              This is required.
            </Text>
          )}

          <Button
            mode="contained"
            loading={isLoading}
            style={{marginTop: 20}}
            onPress={handleSubmit(onSubmit)}>
            Login
          </Button>
        </View>
      </View>
    </View>
  );
}
