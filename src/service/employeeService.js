import {api} from "./api";

const getDepartment = async (params) => {
    return api.get({url:`departments/${params.id}`})
}

const getDepartments = async () => {
    return(
      await api.get({url:`departments`})
    )
}

const getEmployees = async () => {
    return(
        await api.get({url:`employees`})
    )
}

const deleteEmployee = async (params) => {
    return(
        await api.remove({url:`employees/${params.id}`,method:'DELETE'})
    )
}

const updateEmployee = async (params) => {
    return(
        await api.post({url:`employees/${params.id}`,method:'PUT',body:params})
    )
}

const addEmployee = async (params) => {
    return(
        await api.post({url:`employees`,method:'POST',body:params})
    )
}

export const employeeService = {
    getDepartment,
    getDepartments,
    getEmployees,
    deleteEmployee,
    updateEmployee,
    addEmployee
}
