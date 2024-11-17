import { redirect } from "next/navigation"

export default function ResultLayout({
    children
} : {
    children: React.ReactNode
}) {
    return <div>{children}</div>
}
