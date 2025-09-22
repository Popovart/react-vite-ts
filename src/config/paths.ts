export const paths = {
    home: {
        path: "/",
        getHref: () => "/",
    },
    projects: {
        path: "projects",
        getHref: () => "/projects",
    },
    project: {
        path: "projects/:projectId",
        getHref: (id: string) => `/projects/${id}`,
    },
} as const
