import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTaskService, deleteTaskService, importCsv, updateTaskService } from "../services/tasks"
import { toast } from "sonner"
import type { AxiosError } from "axios"


export const useCreateUserMutation = (userId:any) =>{
    const query = useQueryClient()
    return useMutation({
        mutationFn:async (data:any) => await createTaskService(data),
        onSuccess: () => {
            toast.success("Task created successfully successfully");

            query.invalidateQueries({
                queryKey: [userId,'task']
            })
        },
        onError:(error:AxiosError<{message:string,error:any}>)=>{
              toast.error(
      error?.response?.data?.error[0]?.msg ||  error?.response?.data?.message    || "Failed to create task"
      );
        }
    })
}
export const useImportUserMutation = (userId:any) =>{
    const query = useQueryClient()
    return useMutation({
        mutationFn:async (data:any) => await importCsv(data),
        onSuccess: () => {
            toast.success("Task created successfully successfully");

            query.invalidateQueries({
                queryKey: [userId,'task']
            })
        },
        onError:(error:AxiosError<{message:string}>)=>{
              toast.error(
        error?.response?.data?.message || "Failed to create task"
      );
        }
    })
}
export const useUpdateUserMutation = (userId:any) =>{
    const query = useQueryClient()
    return useMutation({
        mutationFn:async (data:any) =>await updateTaskService(data),
        onSuccess:()=> {
                  toast.success("Task updated successfully");

query.invalidateQueries({
    queryKey:[userId,'task']
})
        },
        onError:(error:AxiosError<{message:string}>)=>{
    toast.error(
        error?.response?.data?.message || "Failed to create task"
      );
        }
    })
}
export const useDeleteUserMutation = (userId:any) =>{
    const query = useQueryClient()
    return useMutation({
        mutationFn:(id:any) => deleteTaskService(id),
        onSuccess:()=> {
                toast.success("Task Deleted successfully");

query.invalidateQueries({
    queryKey:[userId,'task']
})
        },
        onError:(error:AxiosError<{message:string}>)=>{
                 toast.error(
        error?.response?.data?.message || "Failed to delete task"
      );

        }
    })
}