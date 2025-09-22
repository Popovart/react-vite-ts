import { Link as RouterLink } from "react-router"
import type { LinkProps as RouterLinkProps } from "react-router"

import { cn } from "@/utils/cn"

export const Link = ({ className, children, ...props }: RouterLinkProps) => {
    return (
        <RouterLink
            className={cn("!text-amber-400 transition-colors duration-300 ease-in-out hover:!text-amber-700", className)}
            {...props}
        >
            {children}
        </RouterLink>
    )
}
