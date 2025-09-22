import { useQueryClient } from "@tanstack/react-query"
import { useProjects } from "../../api/project-requests/get-projects"
import { Spinner } from "@/components/spinner"
import { Link } from "@/components/link"
import { paths } from "@/config/paths"
import { DeleteProject } from "./delete-project"
import { CreateProject } from "./create-project"
import { getProjectQueryOptions } from "../../api/project-requests/get-project"
import { NoDataBlock } from "@/components/no-data-block"
import { UpdateProject } from "@project_manager/components/project-views/update-project"

export type ProjectListProps = {
    onProjectPrefetch?: (id: string) => void
}

export const ProjectList = ({ onProjectPrefetch }: ProjectListProps) => {
    const projectsQuery = useProjects()
    const queryClient = useQueryClient()
    const isLoading = projectsQuery.isLoading

    if (isLoading) {
        return (
            <div className="flex h-48 w-full items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    const projects = projectsQuery?.data ?? []

    // it is better to add error UI here, to provider user with information about bad request or something like that
    if (projects?.length === 0)
        return (
            <div className="">
                <NoDataBlock label="No projects found :(" content={<CreateProject />} />
            </div>
        )

    return (
        <>
            <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-xl">
                    <thead className="bg-gray-50 ">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium uppercase tracking-wider text-gray-500">
                                Name
                            </th>
                            <th className="px-4 py-2 text-left font-medium uppercase tracking-wider text-gray-500">
                                Code
                            </th>
                            <th className="px-4 py-2 text-left font-medium uppercase tracking-wider text-gray-500">
                                Notes
                            </th>
                            <th className="px-4 py-2" />
                            <th className="px-4 py-2" />
                            <th className="px-4 py-2" />
                        </tr>
                    </thead>
                    <tbody className="divide-x divide-gray-200 bg-white">
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td className="px-4 py-4 whitespace-nowrap text-left text-gray-900">
                                    {project.name}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-left text-gray-900">
                                    {project.code}
                                </td>
                                <td className="px-4 py-4 text-left text-gray-500">
                                    {project.notes}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-left ">
                                    <Link
                                        onMouseEnter={() => {
                                            queryClient.prefetchQuery(
                                                getProjectQueryOptions(project.id)
                                            )
                                            onProjectPrefetch?.(project.id)
                                        }}
                                        to={paths.project.getHref(project.id)}
                                    >
                                        View
                                    </Link>
                                </td>
                                <td className="px-4 py-4">
                                    <DeleteProject projectId={project.id} />
                                </td>
                                <td className="px-4 py-4">
                                    <UpdateProject projectId={project.id} />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td
                                colSpan={7}
                                className="px-4 py-6 text-center text-gray-500"
                            >
                                <NoDataBlock label={""} content={<CreateProject />} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="sm:hidden">
                <div className="p-4 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 ">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-amber-100 shadow-lg rounded-lg p-4 flex flex-col gap-3"
                        >
                            <div className="flex items-center flex-wrap gap-3 flex-col sm:flex-row justify-center sm:justify-between">
                                <div className="min-w-0 text-xl">
                                    <div className="uppercase tracking-wide text-gray-500">
                                        Name
                                    </div>
                                    <div className="font-medium break-words">
                                        {project.name}
                                    </div>
                                </div>
                                <div className="flex gap-4 flex-wrap justify-center">
                                    <UpdateProject projectId={project.id} />
                                    <DeleteProject projectId={project.id} />
                                </div>
                            </div>

                            <div className="min-w-0 text-lg">
                                <div className="uppercase tracking-wide text-gray-500">
                                    Notes
                                </div>
                                <div className="break-words text-left">
                                    {project.notes || "—"}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 text-left gap-x-2 gap-y-2 text-lg">
                                <dt className="text-gray-500 uppercase">code</dt>
                                <dd className="sm:border-l sm:border-b-cyan-600 sm:pl-4">
                                    {project.code || "—"}
                                </dd>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4">
                    <NoDataBlock label="" content={<CreateProject />} />
                </div>
            </div>
        </>
    )
}
