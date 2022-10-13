import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    transacciones: []
}

export const transaccionesSlice = createSlice({
    name: "transaccionesSlice",
    initialState,
    reducers: {
       guardarTransacciones:(state, action) => {
        state.transacciones = action.payload;
       },
       agregarTransacciones:(state, action) => {
        state.transacciones.push(action.payload);
       },
       vaciarTransacciones:(state, action) => {
        state.transacciones = initialState;
       }
    }
})

export const { guardarTransacciones, agregarTransacciones, vaciarTransacciones } = transaccionesSlice.actions;
export default transaccionesSlice.reducer;