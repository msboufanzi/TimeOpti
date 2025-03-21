import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
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
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              À propos
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Tableau de bord
            </Link>
            <Link href="/contact" className="text-sm font-medium text-primary hover:underline underline-offset-4">
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
                  Contactez-nous
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Nous sommes là pour répondre à vos questions et vous aider à optimiser vos emplois du temps
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Envoyez-nous un message</CardTitle>
                  <CardDescription>
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          Prénom
                        </label>
                        <Input id="first-name" placeholder="Entrez votre prénom" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Nom
                        </label>
                        <Input id="last-name" placeholder="Entrez votre nom" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Entrez votre email" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Sujet
                      </label>
                      <Input id="subject" placeholder="Entrez le sujet de votre message" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Entrez votre message" className="min-h-[120px]" />
                    </div>
                    <Button type="submit" className="w-full">
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nos coordonnées</CardTitle>
                    <CardDescription>
                      Vous pouvez également nous contacter directement par téléphone ou email.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Adresse</h3>
                        <p className="text-sm text-gray-500">123 Avenue de l'Université, 10000 Rabat, Maroc</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-gray-500">contact@timeopti.ma</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Téléphone</h3>
                        <p className="text-sm text-gray-500">+212 5XX XX XX XX</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Heures d'ouverture</CardTitle>
                    <CardDescription>Notre équipe est disponible pour vous aider pendant ces horaires.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Lundi - Vendredi</span>
                        <span>9h00 - 18h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Samedi</span>
                        <span>9h00 - 13h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Dimanche</span>
                        <span>Fermé</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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

