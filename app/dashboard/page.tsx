import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, School, Building, Calendar, ChevronRight, ArrowLeft } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="w-6 h-6" />
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
          <div className="flex items-center space-x-4">{/* Espace réservé pour d'autres éléments si nécessaire */}</div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Tableau de bord</h1>
              <p className="text-muted-foreground">Gérez et consultez les emplois du temps universitaires</p>
            </div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Professeurs</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 depuis le mois dernier</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Modules</CardTitle>
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">36</div>
                  <p className="text-xs text-muted-foreground">+4 depuis le mois dernier</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Filières</CardTitle>
                  <School className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">+1 depuis le mois dernier</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Salles</CardTitle>
                  <Building className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Inchangé depuis le mois dernier</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>Les dernières modifications apportées aux emplois du temps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Emploi du temps GINF2 mis à jour</p>
                        <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Nouveau professeur ajouté</p>
                        <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Module "Intelligence Artificielle" modifié</p>
                        <p className="text-xs text-muted-foreground">Il y a 2 jours</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                  <CardDescription>Accédez rapidement aux fonctionnalités principales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link href="/dashboard/timetables">
                      <Button variant="outline" className="w-full justify-between">
                        Générer un emploi du temps
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href="/dashboard/professors">
                      <Button variant="outline" className="w-full justify-between">
                        Ajouter un professeur
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href="/dashboard/modules">
                      <Button variant="outline" className="w-full justify-between">
                        Gérer les modules
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6" />
              <span className="text-lg font-bold">TimeOpti</span>
            </div>
            <p className="text-sm text-gray-500">© 2025 TimeOpti. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, link }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="p-2 w-fit bg-primary/10 rounded-full mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link href={link}>
          <Button variant="outline" className="w-full">
            Accéder
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

