import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const usePostQuery = (id)=> {
    const apiPrivateInstance = useAxiosPrivate();
    return useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
          return await apiPrivateInstance.get(`/task/${id}`);
        }
        //staleTime: 1000 * 60
        // refetchInterval: 1000 *60*5
      });
};

export default usePostQuery;