export const NOTIFICATION_TYPES = ['info', 'success', 'warning', 'error'] as const
export type NotificationType = (typeof NOTIFICATION_TYPES)[number]

export type Notification = {
    id: string
    type: NotificationType
    title: string
    message?: string
}
