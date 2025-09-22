import { type Dto } from "./base-dto"


export type TaskDto = Dto<{
    projectId: string,
    description: string,
    deadline: string,
    urgency: string,
    place: string
}>