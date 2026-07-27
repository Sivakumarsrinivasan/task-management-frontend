import { useQuery } from "@tanstack/react-query"
import { getTaskService } from "../services/tasks"

export const useTaskQuery =  () =>{
    return useQuery({
        queryKey:['task'],
        queryFn: getTaskService,
        staleTime:5*60*1000
    })
}