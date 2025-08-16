import { Link as RouterLink } from "react-router"
import type { LinkProps as RouterLinkProps } from "react-router"

import { cn } from "@/utils/cn"

export const Link = ({ className, children, ...props }: RouterLinkProps) => {
    return (
        <RouterLink
            className={cn("text-slate-600 hover:text-slate-900", className)}
            {...props}
        >
            {children}
        </RouterLink>
    )
}
