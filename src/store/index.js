import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from "./employeeSlice";

const store = configureStore({
    reducer: {
        employee: employeeSlice.reducer
    }
})

export default store