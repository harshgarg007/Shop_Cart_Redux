import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products from an API
export const fetchProducts = createAsyncThunk("cart/fetchProducts", async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    } catch (error) {
        // Handle errors, such as network issues or API errors
        throw new Error('Failed to fetch products.');
    }
});

// Initial state of the cart slice
const initialState = {
    products: [],
    cart: [],
    totalAmount: 0,
    status: 'idle', // Initial status of the async operation
    error: null // Initialize error state to null
};

// Create cart slice with reducers, extraReducers for async actions, and initial state
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Find the item in the cart array that matches the id of the payload
            const item = state.cart.find((item) => item.id === action.payload.id);
            console.log('Adding to cart:', action.payload);
            // If the item is already in the cart, increase its quantity
            if (item) {
                item.quantity += 1;
            } else {
                // If the item is not in the cart, add it with quantity 1
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            // Increase the total amount by the price of the added item
            state.totalAmount += Math.round(action.payload.price);
        },
        removeFromCart: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item) {
                // Check if quantity is greater than 1, decrement quantity
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    // If quantity is 1, remove the item from cart
                    state.cart = state.cart.filter((item) => item.id !== action.payload.id);
                }
                // Decrease the total amount by the price of the removed item
                state.totalAmount -= Math.round(action.payload.price);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle pending state while fetching products
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            // Handle fulfilled state after successful fetching of products
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            // Handle rejected state if there's an error fetching products
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Capture error message
            });
    }
});

// Export action creators for addToCart and removeFromCart
export const { addToCart, removeFromCart } = cartSlice.actions;

// Export the reducer function
export default cartSlice.reducer;
