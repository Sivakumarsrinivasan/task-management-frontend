import { useQuery } from "@tanstack/react-query"
import { getTaskService } from "../services/tasks"

export const useTaskQuery = (
  page: number = 0,
  limit: number = 10,
  search: string = '' ,
  status: string = '',
  sort: string = '',
  order: string = ''
) => {
  return useQuery({
    queryKey: ["task", page, limit, search, status, sort, order],
    queryFn: () =>
      getTaskService(page, limit, search, status, sort, order),
    staleTime:10*60*1000
  });
};