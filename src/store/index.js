import { configureStore } from "@reduxjs/toolkit";
import mailSlice from "./mailSlice";
import authReducer from "./auth";

const store = configureStore({
    reducer: { 
        user : authReducer,
        mail: mailSlice.reducer 
    }
});

export default store;

