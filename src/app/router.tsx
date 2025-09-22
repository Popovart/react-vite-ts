import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router"
import { paths } from "@/config/paths"
import { useMemo } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convert = (queryClient: QueryClient) => (m: any) => {
    const { clientLoader, clientAction, default: Component, ...rest } = m
    return {
        ...rest,
        loader: clientLoader?.(queryClient),
        action: clientAction?.(queryClient),
        Component,
    }
}

const createAppRouter = (queryClient: QueryClient) =>
    createBrowserRouter([
        {
            path: paths.home.path,
            lazy: () => import("./routes/home-route/home").then(convert(queryClient)),
        },
        {
            path: paths.projects.path,
            lazy: () => import("./routes/projects-route/projects").then(convert(queryClient))
        },
        {
            path: paths.project.path,
            lazy: () => import("./routes/project-route/project").then(convert(queryClient))
        },
        {
            path: "*",
            lazy: () => import("./routes/not-found").then(convert(queryClient)),
        },
    ])

export const AppRouter = () => {
    const queryClient = useQueryClient()
    const router = useMemo(() => createAppRouter(queryClient), [queryClient])

    return <RouterProvider router={router} />
}
