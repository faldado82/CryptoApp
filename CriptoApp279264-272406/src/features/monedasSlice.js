import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    monedas: []
}

export const monedasSlice = createSlice({
    name: "monedasSlice",
    initialState,
    reducers: {
       guardarMonedas:(state, action) => {
        state.monedas = action.payload;
       },
       vaciarMonedas:(state) => {
        state.monedas = [];
       }
    }
})

export const { guardarMonedas,vaciarMonedas } = monedasSlice.actions;
export default monedasSlice.reducer;