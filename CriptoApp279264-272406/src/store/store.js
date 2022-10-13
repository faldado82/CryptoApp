import { configureStore } from "@reduxjs/toolkit";
import monedasReducer from "../features/monedasSlice.js";
import transaccionesReducer from "../features/transaccionesSlice.js";

export const store = configureStore({
    reducer:{
        monedasStore: monedasReducer,
        transaccionesStore: transaccionesReducer
    }
})