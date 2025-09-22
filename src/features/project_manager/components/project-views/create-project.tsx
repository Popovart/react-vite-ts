import { Plus } from "lucide-react"
import { Button } from "@/components/button"
import { useNotifications } from "@/components/notifications"
import {
    createProjectInputSchema,
    useCreateProject,
} from "@project_manager/api/project-requests/create-project"
import { Form, Input, FormDrawer, Textarea } from "@/components/form"

export const CreateProject = () => {
    const { addNotification } = useNotifications()
    const createProjectMutation = useCreateProject({
        mutationConfig: {
            onSuccess: () => {
                addNotification({
                    type: "success",
                    title: "Project Created",
                })
            },
        },
    })

    return (
        <FormDrawer
            isDone={createProjectMutation.isSuccess}
            triggerButton={
                <Button size="sm" icon={<Plus className="size-4" />}>
                    Create Project
                </Button>
            }
            title="Create Project"
            submitButton={
                <Button
                    form="create-project"
                    type="submit"
                    isLoading={createProjectMutation.isPending}
                >
                    Submit
                </Button>
            }
        >
            <Form
                id="create-project"
                onSubmit={(values) => {
                    createProjectMutation.mutate({ data: values })
                }}
                schema={createProjectInputSchema}
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
