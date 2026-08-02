import apiInterceptor from "./apiInterceptor";

const task = import.meta.env.VITE_TASK_URL
export const getTaskService = async(page:number, limit:number, search:string, status:any, sort:any, order:any) =>{
const user = await apiInterceptor.get(`${task}/get-tasks?page=${page}&limit=${limit}&search=${search}&sort=${sort}&order=${order}&status=${status}`);
return user.data
}
export const createTaskService = async(data:any) =>{
const user = await apiInterceptor.post(`${task}/create-task`,data);
return user.data
}
export const updateTaskService = async(data:any) =>{
    const {id, ...payload} = data
const user = await apiInterceptor.patch(`${task}/update-tasks/${id}`,payload);
return user.data
}
export const deleteTaskService = async(id:any) =>{
const user = await apiInterceptor.delete(`${task}/delete-tasks/${id}`);
return user.data
}
export const importCsv = async(data:any) =>{
    await apiInterceptor.post(`${task}/import-csv`,data);
}
export const exportCsvService = async() =>{
    const user = await apiInterceptor.get(`${task}/export-csv`);
    return  user.data.data
}

