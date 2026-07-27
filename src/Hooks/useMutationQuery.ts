import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTaskService, deleteTaskService, updateTaskService } from "../services/tasks"
import { toast } from "sonner"


export const useCreateUserMutation = () =>{
    const query = useQueryClient()
    return useMutation({
        mutationFn:async (data:any) => await createTaskService(data),
        onSuccess: () => {
            toast.success("Task created successfully successfully");

            query.invalidateQueries({
                queryKey: ['task']
            })
        },
        onError:(error)=>{
              toast.error(
        error?.response?.data?.message || "Failed to create task"
      );
        }
    })
}
export const useUpdateUserMutation = () =>{
    const query = useQueryClient()
    return useMutation({
        mutationFn:async (data:any) =>await updateTaskService(data),
        onSuccess:()=> {
                  toast.success("Task updated successfully");

query.invalidateQueries({
    queryKey:['task']
})
        },
        onError:(error)=>{
    toast.error(
        error?.response?.data?.message || "Failed to create task"
      );
        }
    })
}
export const useDeleteUserMutation = () =>{
    const query = useQueryClient()
    return useMutation({
        mutationFn:(id) => deleteTaskService(id),
        onSuccess:()=> {
                toast.success("Task Deleted successfully");

query.invalidateQueries({
    queryKey:['task']
})
        },
        onError:(error)=>{
                 toast.error(
        error?.response?.data?.message || "Failed to delete task"
      );

        }
    })
}