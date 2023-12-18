import { configureStore } from "@reduxjs/toolkit";
import authslice from "../features/authslice";

const store=configureStore({
    reducer:{
        auth:authslice
    }
})
export default store