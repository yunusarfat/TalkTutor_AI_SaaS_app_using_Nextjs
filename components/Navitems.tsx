"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navItems=[
    { name: "Home", href: "/" },
    { name: "Companions", href: "/companions" },
    { name: "My journey", href: "/my-journey" },
]

const Navitems = () => {
    const pathname=usePathname();
  return (
    <nav className="flex items-center gap-4">
        {navItems.map((item) => (
            <Link
            key={item.name}
            href={item.href}
            className={cn(pathname === item.href ? "text-blue-500 font-semibold" : "text-gray-700", "hover:text-blue-500 transition-colors duration-300")}
            >
            {item.name}
            </Link>
        ))}
      </nav>
  );
};

export default Navitems;
