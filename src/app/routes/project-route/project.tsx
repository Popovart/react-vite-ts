import { useParams } from "react-router"
import { ProjectBlock } from "@/features/project_manager/components/project-views/project-block"

const ProjectRoute = () => {
    const params = useParams()
    const projectId = params.projectId as string

    return (
        <div className="mt-8">
            <ProjectBlock projectId={projectId} />

        </div>
    )
}

export default ProjectRoute