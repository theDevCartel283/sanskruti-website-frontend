import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export type UserAuthType = {
  isAuthenticated: boolean;
};

export type Address = {
  id: string;
  fullName: string;
  contactNo: number;
  pincode: number;
  nearBy: string;
  landmark: string;
  city: string;
  state: string;
};

export type UserType = {
  username?: string;
  email?: string;
  email_verified?: boolean;
  address: Address[];
  Mobile_No?: number;
  Mobile_No_verified?: boolean;
  provider?: "Email/Number" | "google";
};

const initialState: UserAuthType & UserType = {
  isAuthenticated: true,
  // user
  username: "John Doe",
  Mobile_No: 1234567890,
  email: "Johndoe@email.com",
  address: [],
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    // user
    setUser: (state, action: PayloadAction<UserType>) => {
      state.email = action.payload.email;
      state.email_verified = action.payload.email_verified;
      state.username = action.payload.username;
      state.Mobile_No = action.payload.Mobile_No;
      state.Mobile_No_verified = action.payload.Mobile_No_verified;
      state.address = action.payload.address;
      state.provider = action.payload.provider;
    },
    setAddress: (state, action: PayloadAction<Address[]>) => {
      state.address = action.payload;
    },

    // login status
    loggedIn: (state) => {
      state.isAuthenticated = true;
    },
    loggedOut: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setAddress, loggedIn, loggedOut } = user.actions;

export const selectisAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectUser = (state: RootState) => state.user;

export default user.reducer;
