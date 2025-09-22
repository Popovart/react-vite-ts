import type { ReactNode } from "react"


export type NoDataBlockProps = {
    label?: string,
    content: ReactNode
}

export const NoDataBlock =({
    label = "",
    content,
}: NoDataBlockProps ) => {
    return (
        <div className="w-full">
            <div className="mb-4 text-xl sm:text-2xl">{label}</div>
            {content}
        </div>
    )
}