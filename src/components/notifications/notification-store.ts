import { nanoid } from "nanoid"
import { create } from "zustand"
import { type Notification as NotificationData } from "./types"

type NotificationsStore = {
    notifications: NotificationData[]
    addNotification: (notification: Omit<NotificationData, "id">) => void
    dismissNotification: (id: string) => void
}

// TODO: use immer instead for persistent data
export const useNotifications = create<NotificationsStore>((set) => ({
    notifications: [],
    addNotification: (notification) => 
        set((state) => ({
            notifications: [
                ...state.notifications,
                {
                    id: nanoid(),
                    ...notification
                }
            ]
        })),
    dismissNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter(
                (notification) => notification.id !== id
            )
        }))
}));
