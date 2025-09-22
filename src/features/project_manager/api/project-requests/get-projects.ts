import { useQuery, queryOptions } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import { type QueryConfig } from "@/lib/react-query"
import { type ProjectDto } from "@/types/dto/project-dto"

export const getProjects = (): Promise<ProjectDto[]> => {
    return api.get(`/projects`);
}

export const getProjectsQueryOptions = () => {
    return queryOptions({
        queryKey: ["projects"],
        queryFn: () => getProjects(),
    })
}

type UseProjectsOptions = {
    queryConfig?: QueryConfig<typeof getProjectsQueryOptions>
}

export const useProjects = ({
    queryConfig
}: UseProjectsOptions = {}) => {
    return useQuery({
        ...getProjectsQueryOptions(),
        ...queryConfig
    })
}



    

