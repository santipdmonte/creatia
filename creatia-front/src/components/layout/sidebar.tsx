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
  const navigation = [
    { name: "Panel", icon: LayoutDashboard, href: "/", current: true },
    { name: "Identidad de Marca", icon: Brain, href: "/identidad", current: false },
    { name: "Estrategia", icon: Target, href: "/estrategia", current: false },
    { name: "Contenido", icon: FileText, href: "/contenido", current: false },
    { name: "Analíticas", icon: BarChart3, href: "/analiticas", current: false },
  ];

  const bottomNavigation = [
    { name: "Ayuda", icon: HelpCircle, href: "#" },
  ];

  return (
    <div className={`flex flex-col h-full bg-sidebar border-r ${className}`}>
      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant={item.current ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <a href={item.href}>
              <item.icon className="w-4 h-4 mr-3" />
              {item.name}
            </a>
          </Button>
        ))}
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