import { useInfiniteQuery } from "@tanstack/react-query"
import { getTaskService } from "../services/tasks"



export const useInfinteTaskQuery = (userId: any,
    limit: any,
    search: any,
    status: any,
    sort: any,
    order: any) => {
    return useInfiniteQuery({
        queryKey: [userId,'task',search,status,sort,order],
        initialPageParam: 1,
        staleTime: 10 * 60 * 1000,
        queryFn: ({ pageParam }) =>
            getTaskService(
                pageParam,
                limit,
                search,
                status,
                sort,
                order
            ),
        getNextPageParam: (lastPage) => {
            const pagination = lastPage.data.paginationDetail;

            if (pagination.currentPage < pagination.totalPage) {
                return pagination.currentPage + 1;
            }

            return undefined;
        }

    })
}