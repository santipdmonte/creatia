'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { MainLayout } from '@/components/layout/main-layout'
import { 
  Upload, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Instagram, 
  Building, 
  Users, 
  Target, 
  Package,
  Brain,
  Palette,
  Settings,
  Copy,
  Save
} from 'lucide-react'

interface BrandData {
  logo: string
  website: string
  instagram: string
  generalInfo: string
  brandIdentity: string
  targetAudience: string
  productsServices: string
}

interface BrandIdentityConfig {
  brandIdentity: {
    name: string
    tagline: string
    tone: string
    colorPalette: {
      primary: string
      secondary: string
      accent1: string
      accent2: string
      background: string
      textLight: string
      textMuted: string
    }
    typography: {
      headingFont: string
      bodyFont: string
      headingWeight: string
      bodyWeight: string
      textTransform: string
      textColor: string
    }
    mascot: {
      description: string
      style: string
      uses: string[]
    }
  }
}

const sections = [
  {
    id: 'generalInfo',
    title: 'Información General',
    icon: Building,
    description: 'Datos básicos sobre tu empresa y equipo',
    questions: [
      'Nombre de la marca',
      'Responsable de contacto (nombre, cargo, WhatsApp, mail)',
      'Sitio web actual / Redes sociales activas (links)',
      '¿Desde cuándo está activa la marca?',
      '¿Cuenta con equipo interno o es gestión individual?'
    ]
  },
  {
    id: 'brandIdentity',
    title: 'Identidad de Marca',
    icon: Target,
    description: 'Valores, misión, visión y personalidad de tu marca',
    questions: [
      '¿Cómo describirías la esencia de tu marca en pocas palabras?',
      '¿Qué valores representan a tu marca?',
      '¿Cuál es la misión principal de tu marca?',
      '¿Cuál es tu visión a futuro con la marca?',
      '¿Tu marca tiene un storytelling o historia particular que quieras destacar?',
      '¿Qué emociones querés que tu público sienta cuando conecta con tu marca?',
      '¿Tu marca tiene algún lema, eslogan o frase que la represente?'
    ]
  },
  {
    id: 'targetAudience',
    title: 'Público Objetivo',
    icon: Users,
    description: 'Características y necesidades de tu cliente ideal',
    questions: [
      '¿Quién es tu cliente ideal? (edad, género, intereses, ubicación, nivel socioeconómico, etc.)',
      '¿Qué problema específico resuelve tu producto/servicio para ese cliente?',
      '¿Dónde suele estar tu cliente? (Redes sociales, lugares físicos, eventos, etc.)',
      '¿Qué valores o causas son importantes para tu cliente ideal?',
      '¿Qué objeciones suele tener antes de comprarte o contratarte?'
    ]
  },
  {
    id: 'productsServices',
    title: 'Productos / Servicios',
    icon: Package,
    description: 'Descripción de tu oferta actual y futura',
    questions: [
      '¿Qué productos o servicios ofrecés actualmente? (describir brevemente cada uno)',
      '¿Qué productos o servicios son prioritarios para vos en este momento?',
      '¿Ofrecés algún beneficio diferencial (garantía, asesoría personalizada, envío gratuito, etc.)?',
      '¿Qué productos o servicios te gustaría lanzar próximamente?'
    ]
  }
]

export default function BrandIdentityPage() {
  const [brandData, setBrandData] = useState<BrandData>({
    logo: '',
    website: '',
    instagram: '',
    generalInfo: '',
    brandIdentity: '',
    targetAudience: '',
    productsServices: ''
  })

  const [brandConfig, setBrandConfig] = useState<BrandIdentityConfig | null>(null)
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({})

  // Cargar datos del sessionStorage al montar el componente
  useEffect(() => {
    const savedData = sessionStorage.getItem('brandIdentityData')
    if (savedData) {
      setBrandData(JSON.parse(savedData))
    }
  }, [])

  // Cargar configuración de marca desde el archivo JSON
  useEffect(() => {
    const loadBrandConfig = async () => {
      try {
        const response = await fetch('/brand_identity.json')
        const config = await response.json()
        setBrandConfig(config)
      } catch (error) {
        console.error('Error loading brand config:', error)
      }
    }
    loadBrandConfig()
  }, [])

  // Guardar datos en sessionStorage cada vez que cambien
  useEffect(() => {
    sessionStorage.setItem('brandIdentityData', JSON.stringify(brandData))
  }, [brandData])

  const handleInputChange = (field: keyof BrandData, value: string) => {
    setBrandData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        handleInputChange('logo', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleHint = (sectionId: string) => {
    setExpandedHints(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light creatia-title flex items-center gap-2">
              Identidad de Marca
            </h1>
            <p className="text-muted-foreground mt-1">
              Define la personalidad de tu marca para generar contenido personalizado
            </p>
          </div>
        </div>

        {/* Información Básica */}
        <Card className="shadow-brand">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-primary">
              <Upload className="h-5 w-5 text-cyan-400" />
              Información Básica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Columna Izquierda - Información Básica */}
              <div className="space-y-6">
                {/* Logo Upload */}
                <div className="space-y-3">
                  <Label htmlFor="logo" className="text-sm font-medium">Logo de tu marca</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 border-2 border-dashed border-brand-primary/30 rounded-xl flex items-center justify-center overflow-hidden bg-brand-primary/5">
                      {brandData.logo ? (
                        <img src={brandData.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <Upload className="h-8 w-8 text-cyan-400/60" />
                      )}
                    </div>
                    <div>
                      <input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('logo')?.click()}
                        className="border-brand-primary/30 hover:bg-brand-primary/10"
                      >
                        Subir Logo
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Website y Instagram */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2 text-sm font-medium">
                      <Globe className="h-4 w-4 text-cyan-400" />
                      Sitio Web
                    </Label>
                    <Input
                      id="website"
                      placeholder="https://tu-sitio-web.com"
                      value={brandData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="focus:ring-brand-secondary focus:border-brand-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="flex items-center gap-2 text-sm font-medium">
                      <Instagram className="h-4 w-4 text-pink-500" />
                      Instagram
                      {brandData.instagram && <span className="text-xs text-green-500">↗ 📈</span>}
                    </Label>
                    <Input
                      id="instagram"
                      placeholder="@tu_instagram"
                      value={brandData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      className="focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>
              </div>

              {/* Columna Derecha - Estilo de Marca */}
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-brand-primary">Estilo de Marca</h3>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-cyan-400" />
                        Configurar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Settings className="h-5 w-5 text-cyan-400" />
                          Configuración de Identidad de Marca
                        </DialogTitle>
                        <DialogDescription>
                          Visualiza y modifica la configuración JSON de tu identidad de marca
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Archivo de Configuración</Label>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Copy className="h-4 w-4 text-cyan-400" />
                            Copiar JSON
                          </Button>
                        </div>
                        
                        <div className="relative">
                          <Textarea
                            value={brandConfig ? JSON.stringify(brandConfig, null, 2) : ''}
                            readOnly
                            className="min-h-[400px] font-mono text-xs bg-muted/30 overflow-auto"
                            placeholder="Cargando configuración..."
                          />
                        </div>
                        
                        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                          <h4 className="font-medium text-sm flex items-center gap-2">
                            <Palette className="h-4 w-4 text-cyan-400" />
                            Vista Previa de Colores
                          </h4>
                          {brandConfig && (
                            <div className="grid grid-cols-4 gap-2">
                              <div className="text-center">
                                <div 
                                  className="w-12 h-12 rounded-lg mx-auto mb-1 border border-gray-300 shadow-sm"
                                  style={{ backgroundColor: brandConfig.brandIdentity.colorPalette.primary }}
                                />
                                <p className="text-xs font-medium">Primario</p>
                                <p className="text-xs text-muted-foreground">{brandConfig.brandIdentity.colorPalette.primary}</p>
                              </div>
                              <div className="text-center">
                                <div 
                                  className="w-12 h-12 rounded-lg mx-auto mb-1 border border-gray-300 shadow-sm"
                                  style={{ backgroundColor: brandConfig.brandIdentity.colorPalette.secondary }}
                                />
                                <p className="text-xs font-medium">Secundario</p>
                                <p className="text-xs text-muted-foreground">{brandConfig.brandIdentity.colorPalette.secondary}</p>
                              </div>
                              <div className="text-center">
                                <div 
                                  className="w-12 h-12 rounded-lg mx-auto mb-1 border border-gray-300 shadow-sm"
                                  style={{ backgroundColor: brandConfig.brandIdentity.colorPalette.accent1 }}
                                />
                                <p className="text-xs font-medium">Acento 1</p>
                                <p className="text-xs text-muted-foreground">{brandConfig.brandIdentity.colorPalette.accent1}</p>
                              </div>
                              <div className="text-center">
                                <div 
                                  className="w-12 h-12 rounded-lg mx-auto mb-1 border border-gray-300 shadow-sm"
                                  style={{ backgroundColor: brandConfig.brandIdentity.colorPalette.accent2 }}
                                />
                                <p className="text-xs font-medium">Acento 2</p>
                                <p className="text-xs text-muted-foreground">{brandConfig.brandIdentity.colorPalette.accent2}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline">
                          Cancelar
                        </Button>
                        <Button className="flex items-center gap-2">
                          <Save className="h-4 w-4 text-white" />
                          Guardar Cambios
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {brandConfig ? (
                  <div className="space-y-5">
                    {/* Paleta de Colores - Primero y más prominente */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">PALETA DE COLORES</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-300 shadow-sm" 
                            style={{ backgroundColor: brandConfig.brandIdentity.colorPalette.primary }}
                          />
                          <div>
                            <span className="text-sm font-medium">Primario</span>
                            <p className="text-xs text-muted-foreground">{brandConfig.brandIdentity.colorPalette.primary}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-300 shadow-sm" 
                            style={{ backgroundColor: brandConfig.brandIdentity.colorPalette.secondary }}
                          />
                          <div>
                            <span className="text-sm font-medium">Secundario</span>
                            <p className="text-xs text-muted-foreground">{brandConfig.brandIdentity.colorPalette.secondary}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-300 shadow-sm" 
                            style={{ backgroundColor: brandConfig.brandIdentity.colorPalette.accent1 }}
                          />
                          <div>
                            <span className="text-sm font-medium">Acento 1</span>
                            <p className="text-xs text-muted-foreground">{brandConfig.brandIdentity.colorPalette.accent1}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-300 shadow-sm" 
                            style={{ backgroundColor: brandConfig.brandIdentity.colorPalette.accent2 }}
                          />
                          <div>
                            <span className="text-sm font-medium">Acento 2</span>
                            <p className="text-xs text-muted-foreground">{brandConfig.brandIdentity.colorPalette.accent2}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Información General */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">INFORMACIÓN GENERAL</h4>
                      <div className="space-y-1">
                        <p className="text-sm"><span className="font-medium">Nombre:</span> {brandConfig.brandIdentity.name}</p>
                        <p className="text-sm"><span className="font-medium">Tagline:</span> {brandConfig.brandIdentity.tagline}</p>
                        <p className="text-sm"><span className="font-medium">Tono:</span> {brandConfig.brandIdentity.tone}</p>
                      </div>
                    </div>

                    {/* Tipografía */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">TIPOGRAFÍA</h4>
                      <div className="space-y-1">
                        <p className="text-sm"><span className="font-medium">Encabezados:</span> {brandConfig.brandIdentity.typography.headingFont}</p>
                        <p className="text-sm"><span className="font-medium">Cuerpo:</span> {brandConfig.brandIdentity.typography.bodyFont}</p>
                      </div>
                    </div>

                    {/* Mascota */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">MASCOTA</h4>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">{brandConfig.brandIdentity.mascot.description}</p>
                        <p className="text-xs text-muted-foreground">Estilo: {brandConfig.brandIdentity.mascot.style}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Palette className="h-12 w-12 mx-auto mb-2 opacity-50 text-cyan-400" />
                    <p className="text-sm">Cargando configuración de marca...</p>
                    <div className="flex justify-center mt-2">
                      <span className="text-xs text-cyan-400">⟳ Procesando...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secciones de Información */}
        {sections.map((section) => (
          <Card key={section.id} className="shadow-brand">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-primary">
                <section.icon className="h-5 w-5 text-cyan-400" />
                {section.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {section.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hint expandible */}
              <div className="border rounded-lg p-3 bg-muted/30">
                <Button
                  variant="ghost"
                  onClick={() => toggleHint(section.id)}
                  className="w-full justify-between p-0 h-auto font-normal"
                >
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <HelpCircle className="h-4 w-4 text-cyan-400" />
                    Guía de preguntas para completar esta sección
                  </span>
                  {expandedHints[section.id] ? (
                    <ChevronUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-cyan-400" />
                  )}
                </Button>
                
                {expandedHints[section.id] && (
                  <div className="mt-3 pt-3 border-t">
                    <ul className="space-y-2">
                      {section.questions.map((question, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-cyan-400 font-medium">▸</span>
                          {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Textarea */}
              <div className="space-y-2">
                <Label htmlFor={section.id} className="text-sm font-medium">
                  Información sobre {section.title.toLowerCase()}
                </Label>
                <Textarea
                  id={section.id}
                  placeholder={`Completa la información sobre ${section.title.toLowerCase()} de tu marca...`}
                  value={brandData[section.id as keyof BrandData]}
                  onChange={(e) => handleInputChange(section.id as keyof BrandData, e.target.value)}
                  className="min-h-[120px] focus:ring-brand-primary focus:border-brand-primary"
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Botón de Guardar */}
        <div className="flex justify-end">
          <Button className="btn-primary px-6">
            <Brain className="h-4 w-4 mr-2 text-black" />
            Guardar Identidad de Marca
            <span className="ml-2">🚀</span>
          </Button>
        </div>
      </div>
    </MainLayout>
  )
} 