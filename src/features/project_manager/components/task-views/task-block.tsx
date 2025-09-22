import { Spinner } from "@/components/spinner"
import { CreateTask } from "@project_manager/components/task-views/create-task"
import { DeleteTask } from "@project_manager/components/task-views/delete-task"
import { useTasks } from "@project_manager/api/task-requests/get-tasks"
import { NoDataBlock } from "@/components/no-data-block"
import { UpdateTask } from "@project_manager/components/task-views/update-task"

type TasksBlockProps = {
    projectId: string
}

export const TaskBlock = ({ projectId }: TasksBlockProps) => {
    const tasksQuery = useTasks({ projectId })
    const isLoading = tasksQuery.isLoading
    const tasks = tasksQuery.data ?? []
    const isTasksPresent = tasks.length !== 0

    return (
        <div className="shadow sm:rounded-lg bg-gray-50">
            <div className="px-4 py-5 sm:px-6 bg-emerald-100 rounded-t-md">
                <h2 className="text-4xl">Tasks:</h2>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <Spinner size="lg" />
                </div>
            ) : (
                <>
                    <div className="p-4 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 ">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-emerald-200 shadow-lg rounded-lg p-4 flex flex-col gap-3"
                            >
                                <div className="flex items-center flex-wrap gap-3 flex-col sm:flex-row justify-center sm:justify-between">
                                    <div className="min-w-0 text-xl">
                                        <div className="uppercase tracking-wide text-gray-500">
                                            Code
                                        </div>
                                        <div className="font-medium break-words">
                                            {task.code}
                                        </div>
                                    </div>
                                    <div className="flex gap-4 flex-wrap justify-center">
                                        <UpdateTask
                                            projectId={task.projectId}
                                            taskId={task.id}
                                        />
                                        <DeleteTask
                                            projectId={task.projectId}
                                            taskId={task.id}
                                        />
                                    </div>
                                </div>

        
                                <div className="min-w-0 text-lg">
                                    <div className="uppercase tracking-wide text-gray-500">
                                        Description
                                    </div>
                                    <div className="break-words text-left">
                                        {task.description || "—"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 text-left gap-x-2 gap-y-2 text-lg">
                                    <dt className="text-gray-500 uppercase">Deadline</dt>
                                    <dd className="sm:border-l sm:border-b-cyan-600 sm:pl-4">
                                        {task.deadline || "—"}
                                    </dd>

                                    <dt className="text-gray-500 uppercase">Urgency</dt>
                                    <dd className="sm:border-l sm:border-b-cyan-600 sm:pl-4">
                                        {task.urgency || "—"}
                                    </dd>

                                    <dt className="text-gray-500 uppercase">Place</dt>
                                    <dd className="sm:border-l sm:border-b-cyan-600 sm:pl-4 break-words">
                                        {task.place || "—"}
                                    </dd>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4">
                        <NoDataBlock
                            label={isTasksPresent ? "" : "No tasks found"}
                            content={<CreateTask projectId={projectId} />}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
