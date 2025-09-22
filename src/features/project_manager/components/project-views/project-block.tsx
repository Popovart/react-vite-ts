import { Spinner } from "@/components/spinner"
import { useProject } from "@project_manager/api/project-requests/get-project"
import { Project } from "@project_manager/components/project-views/project"
import { TaskBlock } from "@/features/project_manager/components/task-views/task-block"

export const ProjectBlock = ({ projectId }: { projectId: string }) => {
    const projectQuery = useProject({ projectId })
    

    const project = projectQuery.data

    if (projectQuery.isLoading) {
        return (
            <div className="flex h-48 w-full items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    if (!project) return null;

    return (
        <div className="grid mx-auto [grid-template-columns:fit-content(100%)] gap-0 flex-col justify-center items-center ">
            <Project project={project} />
            <TaskBlock projectId={projectId} />
        </div>
    )
}



