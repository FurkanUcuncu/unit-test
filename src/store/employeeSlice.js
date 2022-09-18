import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {employeeService} from "../service/employeeService";

export const fetchEmployees = createAsyncThunk('employee/employees',
    async () => {
        return await employeeService.getEmployees()
    }
)

export const fetchDepartments = createAsyncThunk('employee/departments',
    async () => {
        return await employeeService.getDepartments()
    }
)

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
        departments: [],
        messageText:''
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployees.fulfilled, (state, action) => {
            state.employees = action.payload.map((item)=> {
                return item.maritalStatus ? {...item, maritalStatus: "Evli"} : {...item, maritalStatus: "Bekar"}
            })
        })
        builder.addCase(fetchEmployees.pending, (state) => {
            state.employees = []
            state.messageText = "Veriler Yükleniyor..."
        })
        builder.addCase(fetchEmployees.rejected, (state) => {
            state.employees = []
            state.messageText = "Veriler Yüklenirken Bir Hata Oluştu."
        })
        builder.addCase(fetchDepartments.fulfilled, (state, action) => {
            state.departments = action.payload
        })
        builder.addCase(fetchDepartments.pending, (state) => {
            state.departments = []
            state.messageText = "Veriler Yükleniyor..."
        })
        builder.addCase(fetchDepartments.rejected, (state) => {
            state.departments = []
            state.messageText = "Veriler Yüklenirken Bir Hata Oluştu."
        })
    }
})

export default employeeSlice