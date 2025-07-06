"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Trash2, 
  Search, 
  Filter,
  Grid3X3,
  List,
  User,
  Shapes,
  Image as ImageIcon,
  Layout,
  Plus,
  Eye,
  CheckCircle,
  TrendingUp
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface ContentItem {
  id: string;
  name: string;
  url: string;
  size: string;
  uploadDate: string;
  category?: string;
}

export function ContentManager() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [contentData, setContentData] = useState<{
    avatars: ContentItem[];
    elements: ContentItem[];
    images: ContentItem[];
    templates: ContentItem[];
  }>({
    avatars: [],
    elements: [],
    images: [],
    templates: []
  });
  const [loading, setLoading] = useState(true);

  // Función para cargar datos desde la API
  const loadContentData = async () => {
    setLoading(true);
    try {
      const types = ['avatars', 'elements', 'images', 'templates'];
      const promises = types.map(async (type) => {
        const response = await fetch(`/api/resources/${type}`);
        if (response.ok) {
          const data = await response.json();
          return { type, data };
        }
        return { type, data: [] };
      });

      const results = await Promise.all(promises);
      const newData = results.reduce((acc, { type, data }) => {
        acc[type as keyof typeof acc] = data;
        return acc;
      }, {} as typeof contentData);

      setContentData(newData);
    } catch (error) {
      console.error('Error loading content data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContentData();
  }, []);

  const tabs = [
    { 
      id: 'avatars', 
      label: 'Avatares', 
      icon: User, 
      count: contentData.avatars.length,
      description: 'Imágenes de perfil y personajes para tus posts'
    },
    { 
      id: 'elements', 
      label: 'Elementos', 
      icon: Shapes, 
      count: contentData.elements.length,
      description: 'Iconos, formas y elementos gráficos decorativos'
    },
    { 
      id: 'images', 
      label: 'Imágenes', 
      icon: ImageIcon, 
      count: contentData.images.length,
      description: 'Fotos de stock e imágenes de marca'
    },
    { 
      id: 'templates', 
      label: 'Plantillas', 
      icon: Layout, 
      count: contentData.templates.length,
      description: 'Layouts predefinidos para tus publicaciones'
    }
  ];

  const renderContentGrid = (items: ContentItem[]) => {
    const filteredItems = items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="group relative">
            <Card className="overflow-hidden hover:shadow-brand transition-all duration-200 cursor-pointer">
              <div className="aspect-square relative bg-muted overflow-hidden">
                <img 
                  src={item.url} 
                  alt={item.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 flex items-center justify-center absolute inset-0">
                  <div className="text-xs text-muted-foreground text-center p-2">
                    {item.name}
                  </div>
                </div>
                
                {/* Overlay con acciones al hacer hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4 text-cyan-400" />
                  </Button>
                  <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.size}</span>
                    <span>{new Date(item.uploadDate).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        
        {/* Botón para agregar nuevo item */}
        <div className="group">
          <Card className="overflow-hidden border-dashed border-2 hover:border-brand-primary transition-colors cursor-pointer">
            <div className="aspect-square flex items-center justify-center bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="text-center">
                <Plus className="w-8 h-8 mx-auto text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                <p className="text-xs text-muted-foreground mt-2">Agregar nuevo</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light creatia-title">Gestión de Contenido</h1>
          <p className="text-muted-foreground mt-1">
            Organiza y gestiona todos tus recursos visuales
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={loadContentData} disabled={loading}>
            <Upload className="w-4 h-4 mr-2 text-cyan-400" />
            {loading ? 'Cargando...' : 'Refrescar'}
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2 text-cyan-400" />
            Subir Archivos
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <Input 
              placeholder="Buscar archivos..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 text-cyan-400" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-1 border rounded-lg p-1 bg-muted/20">
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-cyan-400/20 hover:bg-cyan-400/30' : 'hover:bg-muted/50'}
          >
            <Grid3X3 className={`w-4 h-4 ${viewMode === 'grid' ? 'text-cyan-400' : 'text-muted-foreground'}`} />
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-cyan-400/20 hover:bg-cyan-400/30' : 'hover:bg-muted/50'}
          >
            <List className={`w-4 h-4 ${viewMode === 'list' ? 'text-cyan-400' : 'text-muted-foreground'}`} />
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="avatars" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
              <tab.icon className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">{tab.label}</span>
              <Badge variant="secondary" className="ml-1">
                {tab.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <tab.icon className="w-5 h-5 text-cyan-400" />
                  <CardTitle className="text-brand-primary">{tab.label}</CardTitle>
                </div>
                <CardDescription>
                  {tab.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center text-muted-foreground py-8">
                    <div className="w-8 h-8 mx-auto mb-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    <p>Cargando imágenes...</p>
                  </div>
                ) : contentData[tab.id as keyof typeof contentData].length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <tab.icon className="w-12 h-12 mx-auto mb-4 opacity-50 text-cyan-400" />
                    <p>No hay {tab.label.toLowerCase()} disponibles</p>
                    <p className="text-xs mt-2">Sube tus primeros archivos para comenzar</p>
                  </div>
                ) : viewMode === 'grid' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">
                          {contentData[tab.id as keyof typeof contentData].length} archivos disponibles
                        </span>
                      </div>
                    </div>
                    {renderContentGrid(contentData[tab.id as keyof typeof contentData])}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <List className="w-12 h-12 mx-auto mb-4 opacity-50 text-cyan-400" />
                    <p>Vista de lista próximamente</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 