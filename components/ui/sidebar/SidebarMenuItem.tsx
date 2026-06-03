import Link from "next/link";

interface Props {
  href: string;
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

export const SidebarMenuItem = ({ href, icon, title, onClick }: Props) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex h-12 items-center justify-between border-b border-neutral-200 text-sm font-semibold transition-colors hover:border-neutral-950"
    >
      <span className="flex items-center gap-3">
        <span className="text-neutral-500 transition-colors group-hover:text-neutral-950">{icon}</span>
        {title}
      </span>
      <span className="text-xs uppercase tracking-[0.18em] text-neutral-400 transition-colors group-hover:text-neutral-950">
        Ver
      </span>
    </Link>
  );
};
