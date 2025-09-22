import { useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

import { api } from "@/lib/api-client"
import { type MutationConfig } from "@/lib/react-query"
import { getProjectsQueryOptions } from "./get-projects"
import { getProjectQueryOptions } from "@project_manager/api/project-requests/get-project"
import { type ProjectDto } from "@/types/dto/project-dto"

export const updateProjectInputSchema = z.object({
    name: z.string().trim().min(1, "Required").max(50, "Must be ≤ 50 chars"),
    code: z.string().trim().min(1, "Required").max(50, "Must be ≤ 50 chars"),
    notes: z.string().trim().min(1, "Required").max(300, "Must be ≤ 300 chars"),
})

export type UpdateProjectInput = z.infer<typeof updateProjectInputSchema> & {
    id: string
}

export const updateProject = ({
    data,
}: {
    data: UpdateProjectInput
}): Promise<ProjectDto> => {
    return api.patch(`/projects`, data)
}

type UseUpdateTaskOptions = {
    mutationConfig?: MutationConfig<typeof updateProject>
}

export const useUpdateProject = ({ mutationConfig }: UseUpdateTaskOptions = {}) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (data, variables, context) => {
            const projectIdForInvalidation = variables?.data?.id

            queryClient.invalidateQueries({
                queryKey: getProjectsQueryOptions().queryKey,
            })
            queryClient.invalidateQueries({
                queryKey: getProjectQueryOptions(projectIdForInvalidation).queryKey,
            })
            onSuccess?.(data, variables, context)
        },
        ...restConfig,
        mutationFn: updateProject,
    })
}
