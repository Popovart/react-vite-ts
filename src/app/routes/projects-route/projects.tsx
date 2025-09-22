

import { ProjectList } from "@/features/project_manager/components/project-views/project-list"

const ProjectsRoute = () => {
    return (
        <div className="flex flex-wrap flex-col justify-center">
            <div>
                <h1 className="">Projects</h1>
            </div>
            <div className="mt-8 flex justify-center">
                <ProjectList />
            </div>
        </div>
    )
}

export default ProjectsRoute