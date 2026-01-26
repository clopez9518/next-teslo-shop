import Link from "next/link";

interface Props {
    href: string;
    icon: React.ReactNode;
    title: string;
    onClick?: () => void;
}


export const SidebarMenuItem = ({ href, icon, title, onClick }: Props) => {

    return (
        <Link href={href} onClick={onClick}>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 mt-5 rounded transition-all">
                {icon}
                <p>{title}</p>
            </div>
        </Link>
    )
}
