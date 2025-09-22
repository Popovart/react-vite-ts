import { type ProjectDto } from "@/types/dto/project-dto"

type ProjectProps = {
    project: ProjectDto
}

export const Project = ({ project }: ProjectProps) => {
    return (
        <div className="bg-amber-100 shadow mb-8 rounded-lg">
            <div className="py-5 text-2xl sm:text-4xl items-center justify-center gap-4 px-6 flex sm:flex-row flex-col">
                {/* <div className="">Project Name (Code):</div> */}
                <h3 className="italic leading-6 text-gray-900">
                    {project.name} ({project.code})
                </h3>
            </div>
            <div className="bg-gray-50 divide-x sm:text-xl sm:divide-gray-200 py-5 grid grid-cols-2 gap-4 px-6">
                <dt className="text-left font-medium text-gray-500 uppercase">Notes</dt>
                <dd className="text-left text-gray-900">
                    {project.notes}
                </dd>
            </div>
        </div>
    )
}
