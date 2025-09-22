import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import { type MutationConfig } from "@/lib/react-query"
import { getProjectsQueryOptions } from "./get-projects"

export const deleteProject = ({
    projectId,
  }: {
    projectId: string;
  }) => {
    return api.delete(`/projects/${projectId}`);
  };

type UseDeleteProjectOptions = {
    mutationConfig?: MutationConfig<typeof deleteProject>
}
export const useDeleteProject = ({
    mutationConfig,
  }: UseDeleteProjectOptions = {}) => {
    const queryClient = useQueryClient();
  
    const { onSuccess, ...restConfig } = mutationConfig || {};
  
    return useMutation({
      onSuccess: (...args) => {
        queryClient.invalidateQueries({
          queryKey: getProjectsQueryOptions().queryKey,
        });
        onSuccess?.(...args);
      },
      ...restConfig,
      mutationFn: deleteProject,
    });
  };
  
