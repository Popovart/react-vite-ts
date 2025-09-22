import { type Meta, type StoryObj } from "@storybook/react"

import { NotificationCard } from "./notification"

const meta: Meta<typeof NotificationCard> = {
    title: "Components/Notifications",
    component: NotificationCard,
    parameters: {
        controls: { expanded: true },
    },
}

export default meta

type Story = StoryObj<typeof NotificationCard>

export const Info: Story = {
    args: {
        notification: {
            id: "1",
            type: "info",
            title: "Info notification",
        },
        onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`),
    },
}

export const Success: Story = {
    args: {
        notification: {
            id: "1",
            type: "success",
            title: "Success notification",
        },
        onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`),
    },
}

export const Warning: Story = {
    args: {
        notification: {
            id: "1",
            type: "warning",
            title: "Warning notification",
        },
        onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`),
    },
}

export const Error: Story = {
    args: {
        notification: {
            id: "1",
            type: "error",
            title: "Error notification",
        },
        onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`),
    },
}
