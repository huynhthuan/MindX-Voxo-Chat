import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: null,
    name: '',
    email: '',
    photoUrl: '',
    welcomeMessage: '',
    role: '',
  },
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = {...action.payload};
      state.isLogin = true;
    },
    logOut: state => Object.assign({}, state, initialState),
  },
});

// Action creators are generated for each case reducer function
export const {loginSuccess, logOut} = authSlice.actions;

export default authSlice.reducer;
