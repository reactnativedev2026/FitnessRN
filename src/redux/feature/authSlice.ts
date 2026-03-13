import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoading: boolean;
  isError: boolean;
  isLogin: boolean;
  userData: any | null;
  token: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  isLogin: false,
  userData: null,
  token: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    loginSuccess(
      state,
      action: PayloadAction<{ userData: any; token: string }>
    ) {
      state.isLoading = false;
      state.isError = false;
      state.isLogin = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;

      AsyncStorage.setItem(
        'authData',
        JSON.stringify({
          userData: action.payload.userData,
          token: action.payload.token,
        })
      );
    },

    restoreLogin(
      state,
      action: PayloadAction<{ userData: any; token: string }>
    ) {
      state.isLogin = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
    },

    logout() {
      AsyncStorage.removeItem('authData');
      return initialState;
    },

    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
});

export const {
  loginSuccess,
  restoreLogin,
  logout,
  setLoading,
  setError,
} = AuthSlice.actions;

export default AuthSlice.reducer;
