import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Calendar, 
  Image, 
  Users, 
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export function DashboardOverview() {
  const stats = [
    {
      title: "Contenido Generado",
      value: "127",
      change: "+12%",
      trend: "up",
      icon: Image,
      color: "text-brand-primary"
    },
    {
      title: "Posts Programados",
      value: "43",
      change: "+8%",
      trend: "up",
      icon: Calendar,
      color: "text-brand-secondary"
    },
    {
      title: "Tasa de Engagement",
      value: "4.2%",
      change: "+0.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-brand-success"
    },
    {
      title: "Crecimiento Seguidores",
      value: "2.1K",
      change: "+15%",
      trend: "up",
      icon: Users,
      color: "text-brand-accent"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "content_generated",
      title: "3 posts de Instagram creados para el lunes",
      time: "hace 2 horas",
      status: "pendiente",
      icon: Image
    },
    {
      id: 2,
      type: "content_approved",
      title: "Estrategia semanal aprobada",
      time: "hace 1 día",
      status: "completado",
      icon: CheckCircle
    },
    {
      id: 3,
      type: "content_scheduled",
      title: "5 posts programados para esta semana",
      time: "hace 2 días",
      status: "completado",
      icon: Calendar
    },
    {
      id: 4,
      type: "strategy_created",
      title: "Estrategia mensual generada",
      time: "hace 3 días",
      status: "completado",
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold gradient-text">¡Bienvenido de vuelta!</h1>
        <p className="text-muted-foreground">
          Esto es lo que está pasando con tu estrategia de contenido hoy.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-brand transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 text-brand-success" />
                <span className="text-brand-success">{stat.change}</span>
                <span>desde el mes pasado</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Actividad Reciente
              <Button variant="ghost" size="sm">
                Ver todo
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardTitle>
            <CardDescription>
              Últimas actualizaciones en tu creación de contenido
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg border bg-muted/30">
                <div className="flex-shrink-0">
                  <activity.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Badge variant={activity.status === "completado" ? "default" : "secondary"}>
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Accede a tus tareas más comunes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Image className="w-4 h-4 mr-2" />
              Generar Contenido de Hoy
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Ver Estrategia Semanal
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Revisar Analíticas
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Actualizar Perfil de Marca
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso de Esta Semana</CardTitle>
          <CardDescription>
            Sigue tus objetivos de creación y publicación de contenido
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Contenido Generado</span>
              <span className="text-muted-foreground">15/21</span>
            </div>
            <Progress value={71} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Posts Aprobados</span>
              <span className="text-muted-foreground">12/15</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Posts Publicados</span>
              <span className="text-muted-foreground">8/12</span>
            </div>
            <Progress value={67} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 