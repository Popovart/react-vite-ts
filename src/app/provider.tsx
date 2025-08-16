import { Suspense } from "react"
import { Spinner } from "@/components/spinner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type AppProviderProps = {
    children: React.ReactNode;
};

const queryClient = new QueryClient()

export const AppProvider = ({ children }: AppProviderProps ) => {
    return (
        <Suspense>
            fallback = {
                <div className="flex h-screen w-screen items-center justify-center">
                    <Spinner size="xl" />
                </div>
            }
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Suspense>
    )
}