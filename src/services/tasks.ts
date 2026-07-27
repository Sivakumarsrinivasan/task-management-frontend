import apiInterceptor from "./apiInterceptor";

const task = import.meta.env.VITE_TASK_URL
export const getTaskService = async() =>{
const user = await apiInterceptor.get(`${task}/get-tasks`);
return user.data
}
export const createTaskService = async(data) =>{
const user = await apiInterceptor.post(`${task}/create-task`,data);
return user.data
}
export const updateTaskService = async(data) =>{
    const {id, ...payload} = data
const user = await apiInterceptor.patch(`${task}/update-tasks/${id}`,payload);
return user.data
}
export const deleteTaskService = async(id) =>{
const user = await apiInterceptor.delete(`${task}/delete-tasks/${id}`);
return user.data
}

