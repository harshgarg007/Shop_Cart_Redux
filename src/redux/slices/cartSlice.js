import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchProducts = createAsyncThunk("cart/fetchProducts", async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;

    
});



const initialState = {
    products: [],
    cart: [],
    totalAmount: 0,
    status: 'idle',
    console: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
              // Find the item in the cart array that matches the id of the payload
            const item = state.cart.find((item) => item.id === action.payload.id);
             // If the item is already in the cart
            if(item) {
                item.quantity += 1;
            } else {
                 // If the item is not in the cart, add it to the cart with a quantity of 1
                state.cart.push({...action.payload, quantity: 1})
            }
            // Increase the total amount by the price of the added item
            state.totalAmount  += action.payload.price
        }
    },
    removeFromCart: (state, action) => {
        const item = state.cart.find((item) => item.id === action.payload.id);
        if(item) {
            if(item > 1) {
                item.quantity -= 1;
            } else {
                state.cart = state.cart.filter((item) => item.id !== action.payload.id)
            }
            state.totalAmount  -= action.payload.price
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded',
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.error.message;
        })
    }
})


export const {addToCart, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer