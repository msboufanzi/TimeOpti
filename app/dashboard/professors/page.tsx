"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Search, Edit, Trash, User } from "lucide-react"

// Données des professeurs exactes du PDF
const initialProfessors = [
  {
    id: 1,
    name: "FOUAD JEBARI",
    department: "Physique",
    specialty: "Electricité",
    modules: ["Electricité"],
  },
  {
    id: 2,
    name: "ABDELHAMID CHATT",
    department: "Physique",
    specialty: "Circuits électriques",
    modules: ["Circuit électrique", "Optique Géométrique et Radioactivité"],
  },
  {
    id: 3,
    name: "MOHAMED KOUNAIDI",
    department: "Informatique",
    specialty: "Programmation",
    modules: ["Programmation 1"],
  },
  {
    id: 4,
    name: "JAMAL EL AMRANI",
    department: "Mathématiques",
    specialty: "Analyse",
    modules: ["Analyse 1"],
  },
  {
    id: 5,
    name: "ABDELAZIZ CHAOUECH",
    department: "Mathématiques",
    specialty: "Algèbre",
    modules: ["Algébre 1"],
  },
  {
    id: 6,
    name: "SAMIR MOKHTAR",
    department: "Langues",
    specialty: "Communication",
    modules: ["LC1", "Analyse 1"],
  },
  {
    id: 7,
    name: "ALI DAANOUN",
    department: "Physique",
    specialty: "Mécanique",
    modules: ["Mécanique des Solides", "Electricité"],
  },
  {
    id: 8,
    name: "ABDELALI ASTITO",
    department: "Physique",
    specialty: "Electronique",
    modules: ["Electronique"],
  },
  {
    id: 9,
    name: "IKRAM BEN ABDEL OUAHAB",
    department: "Informatique",
    specialty: "Programmation",
    modules: ["Programmation 2", "Programmation 1"],
  },
  {
    id: 10,
    name: "KHALID BOULIFA",
    department: "Mathématiques",
    specialty: "Probabilités",
    modules: ["Probabilité / Statistique"],
  },
  {
    id: 11,
    name: "FATIMA BAHRAOUI",
    department: "Physique",
    specialty: "Electricité",
    modules: ["Electricité"],
  },
  {
    id: 12,
    name: "SAID BENAOUICHA",
    department: "Physique",
    specialty: "Circuits électriques",
    modules: ["Circuit électrique"],
  },
  {
    id: 13,
    name: "AZIZ MAHBOUB",
    department: "Informatique",
    specialty: "Programmation",
    modules: ["Programmation 1"],
  },
  {
    id: 14,
    name: "MUSTAPHA ER-RIANI",
    department: "Mathématiques",
    specialty: "Analyse",
    modules: ["Analyse 1", "Algébre"],
  },
  {
    id: 15,
    name: "IKRAM ALAMI",
    department: "Langues",
    specialty: "Communication",
    modules: ["LC1", "LC3"],
  },
  {
    id: 16,
    name: "HASSNA FARSSI",
    department: "Langues",
    specialty: "Communication",
    modules: ["LC1"],
  },
  {
    id: 17,
    name: "SOUAD BZIOUI",
    department: "Chimie",
    specialty: "Chimie Organique",
    modules: ["Structure de la Matière", "Chimie Organique 1"],
  },
  {
    id: 18,
    name: "NOUR-EDDINE CHOUAIBI",
    department: "Chimie",
    specialty: "Chimie Minérale",
    modules: ["Chimie Minérale 1"],
  },
  {
    id: 19,
    name: "FATIHA CHIBI",
    department: "Biologie",
    specialty: "Biologie végétale",
    modules: ["Biologie végétale"],
  },
  {
    id: 20,
    name: "NOUREDDIN BOUAYAD",
    department: "Biologie",
    specialty: "Biologie cellulaire",
    modules: ["Biologie cellulaire"],
  },
]

// Données des filières exactes du PDF
const filieres = [
  { id: "gegm", name: "GE-GM", sections: ["A"] },
  { id: "mipc", name: "MIPC", sections: ["A", "B"] },
  { id: "mip", name: "MIP", sections: ["A"] },
  { id: "bcg", name: "BCG", sections: ["A", "B"] },
]

export default function ProfessorsPage() {
  const [professors, setProfessors] = useState(initialProfessors)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProfessor, setSelectedProfessor] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false)
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false)
  const [newProfessor, setNewProfessor] = useState({
    name: "",
    department: "",
    specialty: "",
    modules: [],
  })
  const [selectedModule, setSelectedModule] = useState(null)
  const [newModule, setNewModule] = useState({
    name: "",
    department: "",
    hours: "",
  })

  // Ajouter ces états pour gérer les disponibilités des professeurs
  const [selectedProfessorForAvailability, setSelectedProfessorForAvailability] = useState(null)
  const [availabilities, setAvailabilities] = useState({
    // Initialiser avec des disponibilités par défaut pour tous les professeurs
    1: Array(7)
      .fill()
      .map(() => Array(4).fill(true)), // Prof 1
    2: Array(7)
      .fill()
      .map(() => Array(4).fill(true)), // Prof 2
    3: Array(7)
      .fill()
      .map(() => Array(4).fill(true)), // Prof 3
    4: Array(7)
      .fill()
      .map(() => Array(4).fill(true)), // Prof 4
    5: Array(7)
      .fill()
      .map(() => Array(4).fill(true)), // Prof 5
  })

  // Filtrer les professeurs en fonction du terme de recherche
  const filteredProfessors = professors.filter(
    (professor) =>
      professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Gérer l'ajout d'un professeur
  const handleAddProfessor = () => {
    if (!newProfessor.name) {
      alert("Veuillez remplir au moins le nom du professeur.")
      return
    }

    const id = professors.length > 0 ? Math.max(...professors.map((p) => p.id)) + 1 : 1
    const updatedProfessors = [...professors, { id, ...newProfessor, modules: [] }]
    setProfessors(updatedProfessors)
    setNewProfessor({ name: "", department: "", specialty: "", modules: [] })
    setIsAddDialogOpen(false)
    alert("Professeur ajouté avec succès !")
  }

  // Gérer la modification d'un professeur
  const handleEditProfessor = () => {
    if (!selectedProfessor.name) {
      alert("Veuillez remplir au moins le nom du professeur.")
      return
    }

    setProfessors(
      professors.map((professor) => (professor.id === selectedProfessor.id ? selectedProfessor : professor)),
    )
    setIsEditDialogOpen(false)
  }

  // Gérer la suppression d'un professeur
  const handleDeleteProfessor = () => {
    setProfessors(professors.filter((professor) => professor.id !== selectedProfessor.id))
    setIsDeleteDialogOpen(false)
  }

  // Gérer l'enregistrement des disponibilités
  const handleSaveAvailabilities = () => {
    if (!selectedProfessorForAvailability) {
      alert("Veuillez d'abord sélectionner un professeur.")
      return
    }
    alert(`Disponibilités enregistrées avec succès pour ${selectedProfessorForAvailability.name} !`)
  }

  // Fonction pour basculer la disponibilité d'un créneau
  const toggleAvailability = (day, slot) => {
    if (!selectedProfessorForAvailability) return

    const profId = selectedProfessorForAvailability.id
    const newAvailabilities = { ...availabilities }
    newAvailabilities[profId][day][slot] = !newAvailabilities[profId][day][slot]
    setAvailabilities(newAvailabilities)
  }

  // Gérer l'ajout d'un module
  const handleAddModule = () => {
    if (!newModule.name || !newModule.department) {
      alert("Veuillez remplir au moins le nom et la filière du module.")
      return
    }

    alert("Module ajouté avec succès !")
    setIsAddModuleDialogOpen(false)
  }

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
            <Link
              href="/dashboard/professors"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
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
              <h1 className="text-2xl font-bold">Gestion des Professeurs</h1>
              <p className="text-muted-foreground">Gérez les informations et disponibilités des enseignants</p>
            </div>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="w-4 h-4" />
                Retour au tableau de bord
              </Button>
            </Link>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Liste des Professeurs</CardTitle>
              <CardDescription>Consultez et gérez les informations des professeurs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher un professeur..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  className="gap-1"
                  onClick={() => {
                    setNewProfessor({ name: "", department: "", specialty: "", modules: [] })
                    setIsAddDialogOpen(true)
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Ajouter un professeur
                </Button>

                {/* Dialog for Adding a Professor */}
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter un nouveau professeur</DialogTitle>
                      <DialogDescription>
                        Remplissez les informations pour ajouter un nouveau professeur.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Nom
                        </Label>
                        <Input
                          id="name"
                          value={newProfessor.name}
                          onChange={(e) => setNewProfessor({ ...newProfessor, name: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="department" className="text-right">
                          Département
                        </Label>
                        <Input
                          id="department"
                          value={newProfessor.department}
                          onChange={(e) => setNewProfessor({ ...newProfessor, department: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="specialty" className="text-right">
                          Spécialité
                        </Label>
                        <Input
                          id="specialty"
                          value={newProfessor.specialty}
                          onChange={(e) => setNewProfessor({ ...newProfessor, specialty: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleAddProfessor}>
                        Ajouter
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Département</TableHead>
                      <TableHead>Spécialité</TableHead>
                      <TableHead>Modules</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProfessors.map((professor) => (
                      <TableRow key={professor.id}>
                        <TableCell className="font-medium">{professor.name}</TableCell>
                        <TableCell>{professor.department}</TableCell>
                        <TableCell>{professor.specialty}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {professor.modules.slice(0, 2).map((module, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                              >
                                {module}
                              </span>
                            ))}
                            {professor.modules.length > 2 && (
                              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                                +{professor.modules.length - 2}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                setSelectedProfessor(professor)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                setSelectedProfessor(professor)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Dialogs for Edit and Delete */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier un professeur</DialogTitle>
                <DialogDescription>Modifiez les informations du professeur.</DialogDescription>
              </DialogHeader>
              {selectedProfessor && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">
                      Nom
                    </Label>
                    <Input
                      id="edit-name"
                      value={selectedProfessor.name}
                      onChange={(e) => setSelectedProfessor({ ...selectedProfessor, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-department" className="text-right">
                      Département
                    </Label>
                    <Input
                      id="edit-department"
                      value={selectedProfessor.department}
                      onChange={(e) => setSelectedProfessor({ ...selectedProfessor, department: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-specialty" className="text-right">
                      Spécialité
                    </Label>
                    <Input
                      id="edit-specialty"
                      value={selectedProfessor.specialty}
                      onChange={(e) => setSelectedProfessor({ ...selectedProfessor, specialty: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button type="submit" onClick={handleEditProfessor}>
                  Enregistrer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Supprimer un professeur</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer ce professeur ? Cette action est irréversible.
                </DialogDescription>
              </DialogHeader>
              {selectedProfessor && (
                <div className="py-4">
                  <p className="text-center font-medium">{selectedProfessor.name}</p>
                  <p className="text-center text-sm text-muted-foreground">
                    {selectedProfessor.department} - {selectedProfessor.specialty}
                  </p>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={handleDeleteProfessor}>
                  Supprimer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Disponibilités des Professeurs</CardTitle>
                <CardDescription>Gérez les disponibilités hebdomadaires des enseignants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="professor-select">Sélectionnez un professeur</Label>
                    <select
                      id="professor-select"
                      className="w-full p-2 border rounded-md"
                      value={selectedProfessorForAvailability ? selectedProfessorForAvailability.id : ""}
                      onChange={(e) => {
                        const profId = Number.parseInt(e.target.value)
                        const prof = professors.find((p) => p.id === profId)
                        setSelectedProfessorForAvailability(prof)
                      }}
                    >
                      <option value="" disabled>
                        Choisir un professeur
                      </option>
                      {professors.map((prof) => (
                        <option key={prof.id} value={prof.id}>
                          {prof.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedProfessorForAvailability ? (
                    <>
                      <p className="text-sm text-muted-foreground mt-4">
                        Cliquez sur les créneaux pour les marquer comme disponibles ou indisponibles
                      </p>
                      <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium">
                        <div>Lun</div>
                        <div>Mar</div>
                        <div>Mer</div>
                        <div>Jeu</div>
                        <div>Ven</div>
                        <div>Sam</div>
                        <div>Dim</div>
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 7 }).map((_, day) => (
                          <div key={day} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                            <div className="w-full h-full p-1">
                              {Array.from({ length: 4 }).map((_, slot) => {
                                const isAvailable =
                                  availabilities[selectedProfessorForAvailability.id]?.[day]?.[slot] || false
                                return (
                                  <div
                                    key={slot}
                                    className={`w-full h-1/4 ${isAvailable ? "bg-green-200 hover:bg-green-300" : "bg-red-200 hover:bg-red-300"} rounded-sm mb-1 cursor-pointer transition-colors`}
                                    onClick={() => toggleAvailability(day, slot)}
                                  />
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
                          <span>Disponible</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-red-200 rounded-sm"></div>
                          <span>Indisponible</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" onClick={handleSaveAvailabilities}>
                          Enregistrer les disponibilités
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-40 text-muted-foreground">
                      Veuillez sélectionner un professeur pour voir et modifier ses disponibilités
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modules Enseignés</CardTitle>
                <CardDescription>Consultez les modules enseignés par chaque professeur</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-2">Sélectionnez un professeur pour voir ses modules</p>
                  <div className="space-y-2">
                    {selectedProfessorForAvailability ? (
                      selectedProfessorForAvailability.modules.length > 0 ? (
                        selectedProfessorForAvailability.modules.map((module, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-md">
                            <div>
                              <div className="font-medium">{module}</div>
                              <div className="text-xs text-muted-foreground">
                                {selectedProfessorForAvailability.department}
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedModule(module)
                                setIsModuleDialogOpen(true)
                              }}
                            >
                              Détails
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-muted-foreground">
                          Aucun module assigné à ce professeur.
                        </div>
                      )
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        Veuillez sélectionner un professeur pour voir ses modules.
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm" className="gap-1" onClick={() => setIsAddModuleDialogOpen(true)}>
                      <Plus className="w-4 h-4" />
                      Ajouter un module
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Dialog for Module Details */}
      <Dialog open={isModuleDialogOpen} onOpenChange={setIsModuleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails du module</DialogTitle>
            <DialogDescription>Informations détaillées sur le module enseigné.</DialogDescription>
          </DialogHeader>
          {selectedModule && (
            <div className="py-4 space-y-4">
              <div className="space-y-1">
                <h3 className="font-medium">Nom du module</h3>
                <p>{selectedModule}</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-medium">Filières concernées</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {filieres.map((filiere, idx) => (
                    <div key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {filiere.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">Type d'enseignement</h3>
                <div className="flex gap-2 mt-1">
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Cours</div>
                  <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">TD</div>
                  <div className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">TP</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsModuleDialogOpen(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for Adding a Module */}
      <Dialog open={isAddModuleDialogOpen} onOpenChange={setIsAddModuleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau module</DialogTitle>
            <DialogDescription>Remplissez les informations pour ajouter un nouveau module.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="module-name" className="text-right">
                Nom
              </Label>
              <Input
                id="module-name"
                value={newModule.name}
                onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="module-department" className="text-right">
                Filière
              </Label>
              <Input
                id="module-department"
                value={newModule.department}
                onChange={(e) => setNewModule({ ...newModule, department: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="module-hours" className="text-right">
                Volume horaire
              </Label>
              <Input
                id="module-hours"
                value={newModule.hours}
                onChange={(e) => setNewModule({ ...newModule, hours: e.target.value })}
                className="col-span-3"
                placeholder="Ex: 4h/semaine"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddModule}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <User className="w-6 h-6" />
              <span className="text-lg font-bold">TimeOpti</span>
            </div>
            <p className="text-sm text-gray-500">© 2025 TimeOpti. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

