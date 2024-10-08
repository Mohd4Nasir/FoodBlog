
import {configureStore} from '@reduxjs/toolkit'
import authSlice from "./auth"
const Store=configureStore({
 reducer:
    {
     auth:authSlice,
     
    }
})
export default Store