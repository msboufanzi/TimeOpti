import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, BookOpen, School, LayoutGrid } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Time<span className="text-primary">Opti</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Solution intelligente pour la gestion des emplois du temps universitaires
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/dashboard">
                <Button size="lg">Découvrir notre solution</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-background" id="features">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Users className="w-10 h-10 text-primary" />}
              title="Gestion des Professeurs"
              description="Gérez facilement les disponibilités et les compétences des enseignants."
            />
            <FeatureCard
              icon={<BookOpen className="w-10 h-10 text-primary" />}
              title="Gestion des Modules"
              description="Organisez les modules d'enseignement et leurs contraintes horaires."
            />
            <FeatureCard
              icon={<School className="w-10 h-10 text-primary" />}
              title="Gestion des Filières"
              description="Structurez les filières et leurs besoins spécifiques en enseignement."
            />
            <FeatureCard
              icon={<LayoutGrid className="w-10 h-10 text-primary" />}
              title="Attribution des Modules"
              description="Associez les modules aux filières selon les programmes académiques."
            />
            <FeatureCard
              icon={<Calendar className="w-10 h-10 text-primary" />}
              title="Génération d'Emplois du Temps"
              description="Créez automatiquement des emplois du temps optimisés pour les filières."
            />
            <FeatureCard
              icon={<Clock className="w-10 h-10 text-primary" />}
              title="Consultation Personnalisée"
              description="Visualisez les emplois du temps par professeur, filière ou salle."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6" />
              <span className="text-lg font-bold">TimeOpti</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/dashboard" className="text-sm text-gray-500 hover:underline">
                Tableau de bord
              </Link>
              <Link href="/about" className="text-sm text-gray-500 hover:underline">
                À propos
              </Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:underline">
                Contact
              </Link>
            </div>
            <p className="text-sm text-gray-500">© 2025 TimeOpti. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
      <h3 className="text-xl font-bold text-center">{title}</h3>
      <p className="text-gray-500 text-center">{description}</p>
    </div>
  )
}

