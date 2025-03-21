import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BookOpen, Plus, School } from "lucide-react"

export default function AssignmentsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold">TimeOpti</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Tableau de bord
            </Link>
            <Link href="/dashboard/professors" className="text-sm font-medium hover:underline underline-offset-4">
              Professeurs
            </Link>
            <Link href="/dashboard/modules" className="text-sm font-medium hover:underline underline-offset-4">
              Modules
            </Link>
            <Link href="/dashboard/departments" className="text-sm font-medium hover:underline underline-offset-4">
              Filières
            </Link>
            <Link href="/dashboard/timetables" className="text-sm font-medium hover:underline underline-offset-4">
              Emplois du temps
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Se déconnecter
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Attribution des Modules aux Filières</h1>
              <p className="text-muted-foreground">
                Associez les modules aux filières selon les programmes académiques
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="w-4 h-4" />
                Retour au tableau de bord
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Sélection de la Filière</CardTitle>
                <CardDescription>Choisissez une filière pour gérer ses modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="department" className="text-sm font-medium">
                      Filière
                    </label>
                    <Select defaultValue="ginf2">
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Sélectionnez une filière" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ginf1">GINF1 - Génie Informatique 1ère année</SelectItem>
                        <SelectItem value="ginf2">GINF2 - Génie Informatique 2ème année</SelectItem>
                        <SelectItem value="gind1">GIND1 - Génie Industriel 1ère année</SelectItem>
                        <SelectItem value="gind2">GIND2 - Génie Industriel 2ème année</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="semester" className="text-sm font-medium">
                      Semestre
                    </label>
                    <Select defaultValue="s3">
                      <SelectTrigger id="semester">
                        <SelectValue placeholder="Sélectionnez un semestre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="s3">Semestre 3</SelectItem>
                        <SelectItem value="s4">Semestre 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full">Afficher les modules</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations sur la Filière</CardTitle>
                <CardDescription>Détails de la filière sélectionnée</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Nom:</span>
                    <span>Génie Informatique 2ème année</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Code:</span>
                    <span>GINF2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Nombre d'étudiants:</span>
                    <span>110</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Responsable:</span>
                    <span>Prof. Ahmed Alami</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Semestre actuel:</span>
                    <span>Semestre 3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total des modules:</span>
                    <span>8 modules</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Modules Attribués</CardTitle>
                <CardDescription>Modules actuellement attribués à GINF2 - Semestre 3</CardDescription>
              </div>
              <Button className="gap-1">
                <Plus className="w-4 h-4" />
                Ajouter un module
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ModuleCard
                  name="Intelligence Artificielle"
                  code="INF420"
                  professor="Prof. Ahmed Alami"
                  hours="Cours: 24h, TD: 12h, TP: 12h"
                  credits={4}
                  type="Obligatoire"
                />
                <ModuleCard
                  name="Bases de Données"
                  code="INF310"
                  professor="Prof. Mohammed Tazi"
                  hours="Cours: 24h, TD: 12h, TP: 12h"
                  credits={4}
                  type="Obligatoire"
                />
                <ModuleCard
                  name="Réseaux"
                  code="INF330"
                  professor="Prof. Samira El Ouadghiri"
                  hours="Cours: 24h, TD: 12h, TP: 12h"
                  credits={3}
                  type="Obligatoire"
                />
                <ModuleCard
                  name="Analyse Numérique"
                  code="MAT250"
                  professor="Prof. Fatima Zahra Bennis"
                  hours="Cours: 24h, TD: 24h, TP: 0h"
                  credits={3}
                  type="Obligatoire"
                />
                <ModuleCard
                  name="Programmation Web"
                  code="INF340"
                  professor="Prof. Karim Benjelloun"
                  hours="Cours: 24h, TD: 0h, TP: 24h"
                  credits={3}
                  type="Obligatoire"
                />
                <ModuleCard
                  name="Anglais Technique"
                  code="LAN210"
                  professor="Prof. Sarah Johnson"
                  hours="Cours: 0h, TD: 24h, TP: 0h"
                  credits={2}
                  type="Obligatoire"
                />
                <ModuleCard
                  name="Projet Intégré"
                  code="PRJ300"
                  professor="Prof. Karim Benjelloun"
                  hours="Cours: 0h, TD: 0h, TP: 48h"
                  credits={4}
                  type="Obligatoire"
                />
                <ModuleCard
                  name="Apprentissage Automatique"
                  code="INF425"
                  professor="Prof. Ahmed Alami"
                  hours="Cours: 24h, TD: 0h, TP: 24h"
                  credits={3}
                  type="Optionnel"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modules Disponibles</CardTitle>
              <CardDescription>Modules qui peuvent être attribués à cette filière</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <AvailableModuleCard
                  name="Sécurité Informatique"
                  code="INF430"
                  professor="Prof. Samira El Ouadghiri"
                  hours="Cours: 24h, TD: 12h, TP: 12h"
                  credits={3}
                />
                <AvailableModuleCard
                  name="Développement Mobile"
                  code="INF435"
                  professor="Prof. Karim Benjelloun"
                  hours="Cours: 24h, TD: 0h, TP: 24h"
                  credits={3}
                />
                <AvailableModuleCard
                  name="Systèmes Distribués"
                  code="INF440"
                  professor="Prof. Mohammed Tazi"
                  hours="Cours: 24h, TD: 12h, TP: 12h"
                  credits={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6" />
              <span className="text-lg font-bold">TimeOpti</span>
            </div>
            <p className="text-sm text-gray-500">© 2025 TimeOpti. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ModuleCard({ name, code, professor, hours, credits, type }) {
  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-xs text-muted-foreground">{code}</p>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            type === "Obligatoire" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
          }`}
        >
          {type}
        </div>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex items-center text-muted-foreground">
          <School className="w-3.5 h-3.5 mr-1.5" />
          <span>{professor}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <BookOpen className="w-3.5 h-3.5 mr-1.5" />
          <span>{hours}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t">
        <span className="text-sm font-medium">{credits} crédits</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Modifier
          </Button>
          <Button variant="destructive" size="sm">
            Retirer
          </Button>
        </div>
      </div>
    </div>
  )
}

function AvailableModuleCard({ name, code, professor, hours, credits }) {
  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-xs text-muted-foreground">{code}</p>
        </div>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex items-center text-muted-foreground">
          <School className="w-3.5 h-3.5 mr-1.5" />
          <span>{professor}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <BookOpen className="w-3.5 h-3.5 mr-1.5" />
          <span>{hours}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t">
        <span className="text-sm font-medium">{credits} crédits</span>
        <Button className="gap-1">
          <Plus className="w-4 h-4" />
          Ajouter
        </Button>
      </div>
    </div>
  )
}

