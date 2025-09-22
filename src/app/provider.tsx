import { Suspense } from "react"
import { Spinner } from "@/components/spinner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Notifications } from "@/components/notifications"
type AppProviderProps = {
    children: React.ReactNode;
};

const queryClient = new QueryClient()

export const AppProvider = ({ children }: AppProviderProps ) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense
                fallback = {
                    <div className="flex h-screen w-screen items-center justify-center">
                        <Spinner size="xl" />
                    </div>
                }
            >
                <Notifications />
                {children}
            </Suspense>
        </QueryClientProvider>
    )
}