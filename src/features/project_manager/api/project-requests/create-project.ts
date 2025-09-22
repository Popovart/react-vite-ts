import { useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

import { api } from "@/lib/api-client"
import { type MutationConfig } from "@/lib/react-query"
import { getProjectsQueryOptions } from "@/features/project_manager/api/project-requests/get-projects"
import { type ProjectDto } from "@/types/dto/project-dto"

export const createProjectInputSchema = z.object({
    name: z.string().trim()
    .min(1, "Required")
    .max(50, "Must be ≤ 50 chars"),
  code: z.string().trim()
    .min(1, "Required")
    .max(50, "Must be ≤ 50 chars"),
  notes: z.string().trim()
    .min(1, "Required")
    .max(300, "Must be ≤ 300 chars"),
})

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>

export const createProject = ({
    data,
}: {
    data: CreateProjectInput
}): Promise<ProjectDto> => {
    return api.post(`/projects`, data)
}

type UseCreateTaskOptions = {
    mutationConfig?: MutationConfig<typeof createProject>
}

export const useCreateProject = ({
    mutationConfig,
}: UseCreateTaskOptions = {}) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getProjectsQueryOptions().queryKey,
            })
            onSuccess?.(...args)
        },
        ...restConfig,
        mutationFn: createProject,
    })
}
