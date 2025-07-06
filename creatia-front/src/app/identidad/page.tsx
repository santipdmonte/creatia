'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
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
  Brain
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

  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({})

  // Cargar datos del sessionStorage al montar el componente
  useEffect(() => {
    const savedData = sessionStorage.getItem('brandIdentityData')
    if (savedData) {
      setBrandData(JSON.parse(savedData))
    }
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
            <h1 className="text-3xl font-bold gradient-text flex items-center gap-2">
              🧠 Identidad de Marca
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
              <Upload className="h-5 w-5" />
              Información Básica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo Upload */}
            <div className="space-y-3">
              <Label htmlFor="logo" className="text-sm font-medium">Logo de tu marca</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 border-2 border-dashed border-brand-primary/30 rounded-xl flex items-center justify-center overflow-hidden bg-brand-primary/5">
                  {brandData.logo ? (
                    <img src={brandData.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Upload className="h-8 w-8 text-brand-primary/60" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2 text-sm font-medium">
                  <Globe className="h-4 w-4 text-brand-secondary" />
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
          </CardContent>
        </Card>

        {/* Secciones de Información */}
        {sections.map((section) => (
          <Card key={section.id} className="shadow-brand">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-primary">
                <section.icon className="h-5 w-5" />
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
                    <HelpCircle className="h-4 w-4" />
                    Guía de preguntas para completar esta sección
                  </span>
                  {expandedHints[section.id] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                
                {expandedHints[section.id] && (
                  <div className="mt-3 pt-3 border-t">
                    <ul className="space-y-2">
                      {section.questions.map((question, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-brand-primary font-medium">•</span>
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
          <Button className="gradient-brand text-white px-6">
            <Brain className="h-4 w-4 mr-2" />
            Guardar Identidad de Marca
          </Button>
        </div>
      </div>
    </MainLayout>
  )
} 