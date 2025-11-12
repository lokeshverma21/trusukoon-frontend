// import { configureStore } from '@reduxjs/toolkit'
// import authReducer from "@/lib/store/features/auth/authSlice";

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//         auth: authReducer
//     },
//   })
// }

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']







import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "@/lib/features/auth/authSlice";
import staffReducer from "@/lib/features/staff/staffSlice";
import servicesReducer from "@/lib/features/service/serviceSlice";
import appointmentReducer from "@/lib/features/appointment/appointmentSlice";
import adminStatsReducer from "@/lib/features/adminStats/adminStatsSlice";
import appointmentFlowReducer from "@/lib/features/appointment/appointmentFlowSlice";
import patientsReducer from "@/lib/features/patient/patientSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  staff: staffReducer,
  services: servicesReducer,
  appointment: appointmentReducer,
  adminStats: adminStatsReducer,
  appointmentFlow: appointmentFlowReducer,
  patients: patientsReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // ✅ only persist auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
