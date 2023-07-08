import { configureStore } from '@reduxjs/toolkit';
import PatientSlice from './Slices/PatientSlice';
import DeviceSlice from "./Slices/DeviceSlice";
import CartSlice from "./Slices/CartSlice";
import OrderSlice from "./Slices/OrderSlice";
import NurseSlice from "./Slices/NurseSlice";
import nurseProfileSlice from "./Slices/NurseProfileSlice";


export const store = configureStore({
  reducer: {
    NurseSlice,
    PatientSlice,
    nurseProfileSlice,
    DeviceSlice,
    CartSlice,
    OrderSlice,
  },
})