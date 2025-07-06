import { Button } from "@/components/ui/button";
import { Sparkles, Menu, Settings, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/logo_creatia.png" 
            alt="Creatia Logo" 
            className="h-15 w-auto object-contain"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Settings className="w-4 h-4 mr-2" />
            Configuración
          </Button>
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4 mr-2" />
            Perfil
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
} 