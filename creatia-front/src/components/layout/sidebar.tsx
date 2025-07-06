"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Target, 
  Calendar, 
  Image, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Brain,
  FileText
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  
  const navigation = [
    { name: "Panel", icon: LayoutDashboard, href: "/" },
    { name: "Identidad de Marca", icon: Brain, href: "/identidad" },
    { name: "Estrategia", icon: Target, href: "/estrategia" },
    { name: "Contenido", icon: FileText, href: "/contenido" },
    { name: "Analíticas", icon: BarChart3, href: "/analiticas" },
  ];

  const bottomNavigation = [
    { name: "Ayuda", icon: HelpCircle, href: "#" },
  ];

  return (
    <div className={`flex flex-col h-full bg-sidebar border-r ${className}`}>
      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.name}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                isActive 
                  ? "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20" 
                  : "hover:bg-muted"
              }`}
              asChild
            >
              <a href={item.href}>
                <item.icon className="w-4 h-4 mr-3" />
                {item.name}
              </a>
            </Button>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-4 py-4 border-t space-y-2">
        {bottomNavigation.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className="w-full justify-start"
            asChild
          >
            <a href={item.href}>
              <item.icon className="w-4 h-4 mr-3" />
              {item.name}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
} 