import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTaskService, deleteTaskService, importCsv, updateTaskService } from "../services/tasks"
import { toast } from "sonner"


export const useCreateUserMutation = (userId) =>{
    const query = useQueryClient()
    return useMutation({
        mutationFn:async (data:any) => await createTaskService(data),
        onSuccess: () => {
            toast.success("Task created successfully successfully");

            query.invalidateQueries({
                queryKey: [userId,'task']
            })
        },
        onError:(error)=>{
              toast.error(
        error?.response?.data?.message || "Failed to create task"
      );
        }
    })
}
export const useImportUserMutation = (userId) =>{
    const query = useQueryClient()
    return useMutation({
        mutationFn:async (data:any) => await importCsv(userId,data),
        onSuccess: () => {
            toast.success("Task created successfully successfully");

            query.invalidateQueries({
                queryKey: [userId,'task']
            })
        },
        onError:(error)=>{
              toast.error(
        error?.response?.data?.message || "Failed to create task"
      );
        }
    })
}
export const useUpdateUserMutation = (userId:string) =>{
    const query = useQueryClient()
    return useMutation({
        mutationFn:async (data:any) =>await updateTaskService(data),
        onSuccess:()=> {
                  toast.success("Task updated successfully");

query.invalidateQueries({
    queryKey:[userId,'task']
})
        },
        onError:(error)=>{
    toast.error(
        error?.response?.data?.message || "Failed to create task"
      );
        }
    })
}
export const useDeleteUserMutation = (userId:string) =>{
    const query = useQueryClient()
    return useMutation({
        mutationFn:(id) => deleteTaskService(id),
        onSuccess:()=> {
                toast.success("Task Deleted successfully");

query.invalidateQueries({
    queryKey:[userId,'task']
})
        },
        onError:(error)=>{
                 toast.error(
        error?.response?.data?.message || "Failed to delete task"
      );

        }
    })
}