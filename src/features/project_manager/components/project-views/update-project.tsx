import { Pen } from "lucide-react"

import { Button } from "@/components/button"
import { Form, FormDrawer, Input, Textarea } from "@/components/form"
import { useNotifications } from "@/components/notifications"

import {
    updateProjectInputSchema,
    useUpdateProject,
} from "@project_manager/api/project-requests/update-project"

import { useProject } from "@project_manager/api/project-requests/get-project"

type UpdateProjectProps = {
    projectId: string
}

export const UpdateProject = ({ projectId }: UpdateProjectProps) => {
    const { addNotification } = useNotifications()
    const projectQuery = useProject({ projectId })
    const updateProjectMutation = useUpdateProject({
        mutationConfig: {
            onSuccess: () => {
                addNotification({
                    type: "success",
                    title: "Project Updated",
                })
            },
        },
    })

    const project = projectQuery?.data

    return (
        <FormDrawer
            isDone={updateProjectMutation.isSuccess}
            triggerButton={
                <Button icon={<Pen className="size-4" />} size="sm">
                    Update Project
                </Button>
            }
            title="Update Project"
            submitButton={
                <Button
                    form="update-project"
                    type="submit"
                    isLoading={updateProjectMutation.isPending}
                >
                    Submit
                </Button>
            }
        >
            <Form
                id="update-project"
                onSubmit={(values) => {
                    updateProjectMutation.mutate({
                        data: { ...values, id: projectId },
                    })
                }}
                options={{
                    defaultValues: {
                        name: project?.name ?? "",
                        code: project?.code ?? "",
                        notes: project?.notes ?? "",
                    },
                }}
                schema={updateProjectInputSchema}
            >
                {({ register, formState }) => (
                    <>
                        <Input
                            label="Name"
                            error={formState.errors["name"]}
                            registration={register("name")}
                        />
                        <Input
                            label="Code"
                            error={formState.errors["code"]}
                            registration={register("code")}
                        />
                        <Textarea
                            label="Notes"
                            error={formState.errors["notes"]}
                            registration={register("notes")}
                        />
                    </>
                )}
            </Form>
        </FormDrawer>
    )
}
