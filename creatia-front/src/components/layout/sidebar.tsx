import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Target, 
  Calendar, 
  Image, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Sparkles
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const navigation = [
    { name: "Panel", icon: LayoutDashboard, href: "#", current: true },
    { name: "Configuración", icon: Target, href: "#", current: false },
    { name: "Estrategia", icon: Calendar, href: "#", current: false },
    { name: "Contenido", icon: Image, href: "#", current: false },
    { name: "Analíticas", icon: BarChart3, href: "#", current: false },
  ];

  const bottomNavigation = [
    { name: "Configuración", icon: Settings, href: "#" },
    { name: "Ayuda", icon: HelpCircle, href: "#" },
  ];

  return (
    <div className={`flex flex-col h-full bg-sidebar border-r ${className}`}>
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-brand">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="ml-2 text-lg font-bold gradient-text">Creatia</span>
      </div>

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