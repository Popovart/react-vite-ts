import { Suspense } from "react"
import { Spinner } from "@/components/spinner"

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps ) => {
    return (
        <Suspense>
            fallback = {
                <div className="flex h-screen w-screen items-center justify-center">
                    <Spinner size="xl" />
                </div>
            }
            {children}
        </Suspense>
    )
}