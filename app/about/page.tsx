import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="w-6 h-6" />
            <span className="text-lg font-bold">TimeOpti</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Accueil
            </Link>
            <Link href="/about" className="text-sm font-medium text-primary hover:underline underline-offset-4">
              À propos
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Tableau de bord
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button>Accéder au tableau de bord</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  À propos de Time<span className="text-primary">Opti</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Découvrez notre solution innovante pour la gestion des emplois du temps universitaires
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
                <p className="text-gray-500 mb-4">
                  La gestion des emplois du temps universitaires est un défi complexe qui nécessite une organisation
                  efficace des cours, des enseignants et des salles. TimeOpti a été conçu pour automatiser et optimiser
                  cette gestion en tenant compte des disponibilités et des contraintes académiques.
                </p>
                <p className="text-gray-500">
                  Notre mission est de simplifier la vie des administrateurs universitaires et d'améliorer l'expérience
                  des étudiants et des enseignants grâce à des emplois du temps optimisés et sans conflits.
                </p>
              </div>
              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Pourquoi choisir TimeOpti ?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Optimisation automatique des emplois du temps</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Prise en compte des contraintes des enseignants et des salles</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Interface intuitive et facile à utiliser</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Consultation personnalisée par filière, professeur ou salle</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Exportation et partage faciles des emplois du temps</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Notre Approche</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">Analyse des Besoins</h3>
                <p className="text-gray-500">
                  Nous commençons par analyser les besoins spécifiques de chaque établissement universitaire pour
                  comprendre ses contraintes et ses exigences.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">Algorithmes d'Optimisation</h3>
                <p className="text-gray-500">
                  Nos algorithmes avancés prennent en compte toutes les contraintes pour générer des emplois du temps
                  optimisés qui maximisent l'utilisation des ressources.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">Interface Utilisateur</h3>
                <p className="text-gray-500">
                  Notre interface intuitive permet aux administrateurs de gérer facilement les emplois du temps et aux
                  utilisateurs de les consulter de manière personnalisée.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-primary/5">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Prêt à optimiser vos emplois du temps ?</h2>
            <p className="text-gray-500 mb-6 max-w-2xl mx-auto">
              Découvrez comment TimeOpti peut transformer la gestion des emplois du temps dans votre établissement
              universitaire.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg">Accéder au tableau de bord</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6" />
              <span className="text-lg font-bold">TimeOpti</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="text-sm text-gray-500 hover:underline">
                Accueil
              </Link>
              <Link href="/about" className="text-sm text-gray-500 hover:underline">
                À propos
              </Link>
              <Link href="/dashboard" className="text-sm text-gray-500 hover:underline">
                Tableau de bord
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

