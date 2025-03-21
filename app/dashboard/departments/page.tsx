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
import { ArrowLeft, Plus, Search, Edit, Trash, School } from "lucide-react"

// Données des filières exactes du PDF
const initialDepartments = [
  {
    id: 1,
    name: "GE-GM",
    code: "GEGM",
    fullName: "Génie Électrique et Génie Mécanique",
    sections: ["A"],
    students: 120,
    responsable: "ABDELALI ASTITO",
  },
  {
    id: 2,
    name: "MIPC",
    code: "MIPC",
    fullName: "Mathématiques, Informatique, Physique, Chimie",
    sections: ["A", "B"],
    students: 240,
    responsable: "ABDELLAH CHENTOUF",
  },
  {
    id: 3,
    name: "MIP",
    code: "MIP",
    fullName: "Mathématiques, Informatique, Physique",
    sections: ["A"],
    students: 110,
    responsable: "MOHAMED AMIN BAHRAOUI",
  },
  {
    id: 4,
    name: "BCG",
    code: "BCG",
    fullName: "Biologie, Chimie, Géologie",
    sections: ["A", "B"],
    students: 220,
    responsable: "FATIHA CHIBI",
  },
]

// Données des amphis exactes du PDF
const initialRooms = [
  {
    id: 1,
    name: "Amphi 1",
    type: "Amphithéâtre",
    capacity: 120,
    equipment: ["Vidéoprojecteur", "Tableau blanc"],
  },
  {
    id: 2,
    name: "Amphi 2",
    type: "Amphithéâtre",
    capacity: 120,
    equipment: ["Vidéoprojecteur", "Tableau blanc"],
  },
  {
    id: 3,
    name: "Amphi 3",
    type: "Amphithéâtre",
    capacity: 120,
    equipment: ["Vidéoprojecteur", "Tableau blanc"],
  },
  {
    id: 4,
    name: "Amphi 4",
    type: "Amphithéâtre",
    capacity: 120,
    equipment: ["Vidéoprojecteur", "Tableau blanc"],
  },
  {
    id: 5,
    name: "Amphi 5",
    type: "Amphithéâtre",
    capacity: 120,
    equipment: ["Vidéoprojecteur", "Tableau blanc"],
  },
  {
    id: 6,
    name: "Amphi 6",
    type: "Amphithéâtre",
    capacity: 120,
    equipment: ["Vidéoprojecteur", "Tableau blanc"],
  },
]

// Modules par filière
const initialModulesByDepartment = {
  "GEGM-A-S1": [
    { id: 1, name: "Electricité", type: "Obligatoire" },
    { id: 2, name: "Circuit électrique", type: "Obligatoire" },
    { id: 3, name: "Programmation 1", type: "Obligatoire" },
    { id: 4, name: "Analyse 1", type: "Obligatoire" },
    { id: 5, name: "Algébre 1", type: "Obligatoire" },
    { id: 6, name: "LC1", type: "Obligatoire" },
  ],
  "GEGM-A-S3": [
    { id: 7, name: "Mécanique des Solides", type: "Obligatoire" },
    { id: 8, name: "Electronique", type: "Obligatoire" },
    { id: 9, name: "Programmation 2", type: "Obligatoire" },
    { id: 10, name: "Probabilité / Statistique", type: "Obligatoire" },
    { id: 23, name: "Métrologie / Instrumentation", type: "Obligatoire" },
    { id: 24, name: "Gestion", type: "Obligatoire" },
  ],
  "MIPC-A-S1": [
    { id: 1, name: "Electricité", type: "Obligatoire" },
    { id: 2, name: "Circuit électrique", type: "Obligatoire" },
    { id: 3, name: "Programmation 1", type: "Obligatoire" },
    { id: 4, name: "Analyse 1", type: "Obligatoire" },
    { id: 5, name: "Algébre 1", type: "Obligatoire" },
    { id: 6, name: "LC1", type: "Obligatoire" },
  ],
  "MIPC-A-S3": [
    { id: 13, name: "Electromagnétisme", type: "Obligatoire" },
    { id: 14, name: "Réactivité Chimique", type: "Obligatoire" },
    { id: 9, name: "Programmation 2", type: "Obligatoire" },
    { id: 11, name: "Analyse 3", type: "Obligatoire" },
    { id: 10, name: "Probabilité / Statistique", type: "Obligatoire" },
    { id: 12, name: "LC3", type: "Obligatoire" },
  ],
  "MIPC-B-S1": [
    { id: 1, name: "Electricité", type: "Obligatoire" },
    { id: 2, name: "Circuit électrique", type: "Obligatoire" },
    { id: 3, name: "Programmation 1", type: "Obligatoire" },
    { id: 4, name: "Analyse 1", type: "Obligatoire" },
    { id: 5, name: "Algébre 1", type: "Obligatoire" },
    { id: 6, name: "LC1", type: "Obligatoire" },
  ],
  "MIPC-B-S3": [
    { id: 13, name: "Electromagnétisme", type: "Obligatoire" },
    { id: 14, name: "Réactivité Chimique", type: "Obligatoire" },
    { id: 9, name: "Programmation 2", type: "Obligatoire" },
    { id: 11, name: "Analyse 3", type: "Obligatoire" },
    { id: 10, name: "Probabilité / Statistique", type: "Obligatoire" },
    { id: 12, name: "LC3", type: "Obligatoire" },
  ],
  "MIP-A-S1": [
    { id: 1, name: "Electricité", type: "Obligatoire" },
    { id: 2, name: "Circuit électrique", type: "Obligatoire" },
    { id: 3, name: "Programmation 1", type: "Obligatoire" },
    { id: 4, name: "Analyse 1", type: "Obligatoire" },
    { id: 5, name: "Algébre 1", type: "Obligatoire" },
    { id: 6, name: "LC1", type: "Obligatoire" },
  ],
  "MIP-A-S3": [
    { id: 7, name: "Mécanique des Solides", type: "Obligatoire" },
    { id: 14, name: "Réactivité Chimique", type: "Obligatoire" },
    { id: 10, name: "Probabilité / Statistique", type: "Obligatoire" },
    { id: 9, name: "Programmation 2", type: "Obligatoire" },
    { id: 11, name: "Analyse 3", type: "Obligatoire" },
    { id: 12, name: "LC3", type: "Obligatoire" },
  ],
  "BCG-A-S1": [
    { id: 6, name: "LC1", type: "Obligatoire" },
    { id: 5, name: "Algébre", type: "Obligatoire" },
    { id: 15, name: "Structure de la Matière", type: "Obligatoire" },
    { id: 16, name: "Cosmologie & Géodynamique interne", type: "Obligatoire" },
    { id: 17, name: "Biologie cellulaire", type: "Obligatoire" },
    { id: 18, name: "Optique Géométrique et Radioactivité", type: "Obligatoire" },
  ],
  "BCG-A-S3": [
    { id: 1, name: "Electricité", type: "Obligatoire" },
    { id: 19, name: "Chimie Minérale 1", type: "Obligatoire" },
    { id: 20, name: "Chimie Organique 1", type: "Obligatoire" },
    { id: 10, name: "Probabilité / Statistique", type: "Obligatoire" },
    { id: 21, name: "Biologie végétale", type: "Obligatoire" },
    { id: 22, name: "Stratigraphie & Paléo-environnement", type: "Obligatoire" },
  ],
  "BCG-B-S1": [
    { id: 6, name: "LC1", type: "Obligatoire" },
    { id: 5, name: "Algébre", type: "Obligatoire" },
    { id: 15, name: "Structure de la Matière", type: "Obligatoire" },
    { id: 16, name: "Cosmologie & Géodynamique interne", type: "Obligatoire" },
    { id: 17, name: "Biologie cellulaire", type: "Obligatoire" },
    { id: 18, name: "Optique Géométrique et Radioactivité", type: "Obligatoire" },
  ],
  "BCG-B-S3": [
    { id: 1, name: "Electricité", type: "Obligatoire" },
    { id: 19, name: "Chimie Minérale 1", type: "Obligatoire" },
    { id: 20, name: "Chimie Organique 1", type: "Obligatoire" },
    { id: 10, name: "Probabilité / Statistique", type: "Obligatoire" },
    { id: 21, name: "Biologie végétale", type: "Obligatoire" },
    { id: 22, name: "Stratigraphie & Paléo-environnement", type: "Obligatoire" },
  ],
}

// Liste des modules disponibles pour l'ajout
const availableModules = [
  { id: 1, name: "Electricité", code: "PHY110" },
  { id: 2, name: "Circuit électrique", code: "PHY120" },
  { id: 3, name: "Programmation 1", code: "INF110" },
  { id: 4, name: "Analyse 1", code: "MAT110" },
  { id: 5, name: "Algébre 1", code: "MAT120" },
  { id: 6, name: "LC1", code: "LAN110" },
  { id: 7, name: "Mécanique des Solides", code: "PHY210" },
  { id: 8, name: "Electronique", code: "PHY220" },
  { id: 9, name: "Programmation 2", code: "INF210" },
  { id: 10, name: "Probabilité / Statistique", code: "MAT210" },
  { id: 11, name: "Analyse 3", code: "MAT310" },
  { id: 12, name: "LC3", code: "LAN310" },
  { id: 13, name: "Electromagnétisme", code: "PHY310" },
  { id: 14, name: "Réactivité Chimique", code: "CHM210" },
  { id: 15, name: "Structure de la Matière", code: "CHM110" },
  { id: 16, name: "Cosmologie & Géodynamique interne", code: "GEO110" },
  { id: 17, name: "Biologie cellulaire", code: "BIO110" },
  { id: 18, name: "Optique Géométrique et Radioactivité", code: "PHY130" },
  { id: 19, name: "Chimie Minérale 1", code: "CHM220" },
  { id: 20, name: "Chimie Organique 1", code: "CHM230" },
  { id: 21, name: "Biologie végétale", code: "BIO210" },
  { id: 22, name: "Stratigraphie & Paléo-environnement", code: "GEO210" },
  { id: 23, name: "Métrologie / Instrumentation", code: "PHY230" },
  { id: 24, name: "Gestion", code: "ECO110" },
]

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState(initialDepartments)
  const [rooms, setRooms] = useState(initialRooms)
  const [modulesByDepartment, setModulesByDepartment] = useState(initialModulesByDepartment)
  const [searchDepartment, setSearchDepartment] = useState("")
  const [searchRoom, setSearchRoom] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [selectedSection, setSelectedSection] = useState("A")
  const [selectedSemester, setSelectedSemester] = useState("S1")
  const [isAddDepartmentDialogOpen, setIsAddDepartmentDialogOpen] = useState(false)
  const [isEditDepartmentDialogOpen, setIsEditDepartmentDialogOpen] = useState(false)
  const [isDeleteDepartmentDialogOpen, setIsDeleteDepartmentDialogOpen] = useState(false)
  const [isAddRoomDialogOpen, setIsAddRoomDialogOpen] = useState(false)
  const [isEditRoomDialogOpen, setIsEditRoomDialogOpen] = useState(false)
  const [isDeleteRoomDialogOpen, setIsDeleteRoomDialogOpen] = useState(false)
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    code: "",
    fullName: "",
    sections: ["A"],
    students: 0,
    responsable: "",
  })
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "Amphithéâtre",
    capacity: 0,
    equipment: [],
  })

  // États pour la gestion des modules
  const [isAddModuleToDepDialogOpen, setIsAddModuleToDepDialogOpen] = useState(false)
  const [isEditModuleInDepDialogOpen, setIsEditModuleInDepDialogOpen] = useState(false)
  const [isDeleteModuleFromDepDialogOpen, setIsDeleteModuleFromDepDialogOpen] = useState(false)
  const [selectedModuleInDep, setSelectedModuleInDep] = useState(null)
  const [newModuleAssignment, setNewModuleAssignment] = useState({
    moduleId: 1,
    type: "Obligatoire",
  })

  // Filtrer les filières en fonction du terme de recherche
  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchDepartment.toLowerCase()) ||
      department.code.toLowerCase().includes(searchDepartment.toLowerCase()) ||
      department.fullName.toLowerCase().includes(searchDepartment.toLowerCase()),
  )

  // Filtrer les salles en fonction du terme de recherche
  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchRoom.toLowerCase()) ||
      room.type.toLowerCase().includes(searchRoom.toLowerCase()),
  )

  // Obtenir les modules pour la filière, section et semestre sélectionnés
  const getModulesForDepartment = () => {
    if (!selectedDepartment) return []
    const key = `${selectedDepartment.code}-${selectedSection}-${selectedSemester}`
    return modulesByDepartment[key] || []
  }

  // Gérer l'ajout d'une nouvelle filière
  const handleAddDepartment = () => {
    if (!newDepartment.name || !newDepartment.code) {
      alert("Veuillez remplir au moins le nom et le code de la filière.")
      return
    }

    const id = departments.length > 0 ? Math.max(...departments.map((d) => d.id)) + 1 : 1
    const departmentToAdd = { id, ...newDepartment }

    setDepartments([...departments, departmentToAdd])
    setNewDepartment({
      name: "",
      code: "",
      fullName: "",
      sections: ["A"],
      students: 0,
      responsable: "",
    })
    setIsAddDepartmentDialogOpen(false)
    alert(`Filière "${departmentToAdd.name}" ajoutée avec succès !`)
  }

  // Gérer la modification d'une filière
  const handleEditDepartment = () => {
    if (!selectedDepartment || !selectedDepartment.name || !selectedDepartment.code) {
      alert("Veuillez remplir au moins le nom et le code de la filière.")
      return
    }

    setDepartments(
      departments.map((department) => (department.id === selectedDepartment.id ? selectedDepartment : department)),
    )
    setIsEditDepartmentDialogOpen(false)
    alert(`Filière "${selectedDepartment.name}" modifiée avec succès !`)
  }

  // Gérer la suppression d'une filière
  const handleDeleteDepartment = () => {
    if (!selectedDepartment) return

    setDepartments(departments.filter((department) => department.id !== selectedDepartment.id))

    // Supprimer également les modules associés à cette filière
    const keysToDelete = Object.keys(modulesByDepartment).filter((key) => key.startsWith(selectedDepartment.code))
    const newModulesByDepartment = { ...modulesByDepartment }
    keysToDelete.forEach((key) => {
      delete newModulesByDepartment[key]
    })
    setModulesByDepartment(newModulesByDepartment)

    setIsDeleteDepartmentDialogOpen(false)
    alert(`Filière "${selectedDepartment.name}" supprimée avec succès !`)
  }

  // Gérer l'ajout d'une nouvelle salle
  const handleAddRoom = () => {
    if (!newRoom.name) {
      alert("Veuillez remplir au moins le nom de la salle.")
      return
    }

    const id = rooms.length > 0 ? Math.max(...rooms.map((r) => r.id)) + 1 : 1
    const roomToAdd = { id, ...newRoom, equipment: newRoom.equipment || [] }

    setRooms([...rooms, roomToAdd])
    setNewRoom({
      name: "",
      type: "Amphithéâtre",
      capacity: 0,
      equipment: [],
    })
    setIsAddRoomDialogOpen(false)
    alert(`Salle "${roomToAdd.name}" ajoutée avec succès !`)
  }

  // Gérer la modification d'une salle
  const handleEditRoom = () => {
    if (!selectedRoom || !selectedRoom.name) {
      alert("Veuillez remplir au moins le nom de la salle.")
      return
    }

    setRooms(rooms.map((room) => (room.id === selectedRoom.id ? selectedRoom : room)))
    setIsEditRoomDialogOpen(false)
    alert(`Salle "${selectedRoom.name}" modifiée avec succès !`)
  }

  // Gérer la suppression d'une salle
  const handleDeleteRoom = () => {
    if (!selectedRoom) return

    setRooms(rooms.filter((room) => room.id !== selectedRoom.id))
    setIsDeleteRoomDialogOpen(false)
    alert(`Salle "${selectedRoom.name}" supprimée avec succès !`)
  }

  // Gérer l'ajout d'un module à une filière
  const handleAddModuleToDepartment = () => {
    if (!selectedDepartment) {
      alert("Veuillez d'abord sélectionner une filière.")
      return
    }

    const key = `${selectedDepartment.code}-${selectedSection}-${selectedSemester}`
    const module = availableModules.find((m) => m.id === newModuleAssignment.moduleId)

    if (!module) {
      alert("Module non trouvé.")
      return
    }

    // Vérifier si le module existe déjà dans cette filière
    const existingModules = modulesByDepartment[key] || []
    if (existingModules.some((m) => m.id === module.id)) {
      alert(`Le module "${module.name}" est déjà attribué à cette filière.`)
      return
    }

    const newModule = {
      id: module.id,
      name: module.name,
      type: newModuleAssignment.type,
    }

    const updatedModules = [...existingModules, newModule]
    setModulesByDepartment({
      ...modulesByDepartment,
      [key]: updatedModules,
    })

    setIsAddModuleToDepDialogOpen(false)
    alert(`Module "${module.name}" ajouté à la filière "${selectedDepartment.name}" avec succès !`)
  }

  // Gérer la modification d'un module dans une filière
  const handleEditModuleInDepartment = () => {
    if (!selectedDepartment || !selectedModuleInDep) {
      alert("Veuillez d'abord sélectionner une filière et un module.")
      return
    }

    const key = `${selectedDepartment.code}-${selectedSection}-${selectedSemester}`
    const existingModules = modulesByDepartment[key] || []

    const updatedModules = existingModules.map((module) =>
      module.id === selectedModuleInDep.id ? selectedModuleInDep : module,
    )

    setModulesByDepartment({
      ...modulesByDepartment,
      [key]: updatedModules,
    })

    setIsEditModuleInDepDialogOpen(false)
    alert(`Module "${selectedModuleInDep.name}" modifié avec succès !`)
  }

  // Gérer la suppression d'un module d'une filière
  const handleDeleteModuleFromDepartment = () => {
    if (!selectedDepartment || !selectedModuleInDep) {
      alert("Veuillez d'abord sélectionner une filière et un module.")
      return
    }

    const key = `${selectedDepartment.code}-${selectedSection}-${selectedSemester}`
    const existingModules = modulesByDepartment[key] || []

    const updatedModules = existingModules.filter((module) => module.id !== selectedModuleInDep.id)

    setModulesByDepartment({
      ...modulesByDepartment,
      [key]: updatedModules,
    })

    setIsDeleteModuleFromDepDialogOpen(false)
    alert(`Module "${selectedModuleInDep.name}" retiré de la filière "${selectedDepartment.name}" avec succès !`)
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
            <Link href="/dashboard/professors" className="text-sm font-medium hover:underline underline-offset-4">
              Professeurs
            </Link>
            <Link href="/dashboard/modules" className="text-sm font-medium hover:underline underline-offset-4">
              Modules
            </Link>
            <Link
              href="/dashboard/departments"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
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
              <h1 className="text-2xl font-bold">Gestion des Filières et Amphis</h1>
              <p className="text-muted-foreground">Gérez les filières d'enseignement et les amphithéâtres</p>
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
                <CardTitle>Liste des Filières</CardTitle>
                <CardDescription>Consultez et gérez les filières d'enseignement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Rechercher une filière..."
                      className="pl-8"
                      value={searchDepartment}
                      onChange={(e) => setSearchDepartment(e.target.value)}
                    />
                  </div>
                  <Button className="gap-1" onClick={() => setIsAddDepartmentDialogOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </Button>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Sections</TableHead>
                        <TableHead>Étudiants</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDepartments.map((department) => (
                        <TableRow key={department.id}>
                          <TableCell className="font-medium">
                            <div>
                              <div>{department.name}</div>
                              <div className="text-xs text-muted-foreground">{department.fullName}</div>
                            </div>
                          </TableCell>
                          <TableCell>{department.code}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {department.sections.map((section) => (
                                <span
                                  key={section}
                                  className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                                >
                                  {section}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{department.students}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  setSelectedDepartment(department)
                                  setIsEditDepartmentDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  setSelectedDepartment(department)
                                  setIsDeleteDepartmentDialogOpen(true)
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

            <Card>
              <CardHeader>
                <CardTitle>Liste des Amphithéâtres et Salles</CardTitle>
                <CardDescription>Consultez et gérez les salles de cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Rechercher une salle..."
                      className="pl-8"
                      value={searchRoom}
                      onChange={(e) => setSearchRoom(e.target.value)}
                    />
                  </div>
                  <Button className="gap-1" onClick={() => setIsAddRoomDialogOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </Button>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Capacité</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRooms.map((room) => (
                        <TableRow key={room.id}>
                          <TableCell className="font-medium">{room.name}</TableCell>
                          <TableCell>{room.type}</TableCell>
                          <TableCell>{room.capacity}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  setSelectedRoom(room)
                                  setIsEditRoomDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  setSelectedRoom(room)
                                  setIsDeleteRoomDialogOpen(true)
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
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Attribution des Modules aux Filières</CardTitle>
              <CardDescription>Associez les modules aux filières selon les programmes académiques</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="grid grid-cols-3 gap-4 w-full max-w-xl">
                  <div>
                    <Label htmlFor="select-department" className="text-sm font-medium">
                      Filière
                    </Label>
                    <select
                      id="select-department"
                      className="w-full p-2 border rounded-md mt-1"
                      value={selectedDepartment ? selectedDepartment.id : ""}
                      onChange={(e) => {
                        const deptId = Number(e.target.value)
                        const dept = departments.find((d) => d.id === deptId)
                        setSelectedDepartment(dept)
                        if (dept && !dept.sections.includes(selectedSection)) {
                          setSelectedSection(dept.sections[0])
                        }
                      }}
                    >
                      <option value="" disabled>
                        Choisir une filière
                      </option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name} - {dept.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="select-section" className="text-sm font-medium">
                      Section
                    </Label>
                    <select
                      id="select-section"
                      className="w-full p-2 border rounded-md mt-1"
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      disabled={!selectedDepartment}
                    >
                      {selectedDepartment?.sections.map((section) => (
                        <option key={section} value={section}>
                          Section {section}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="select-semester" className="text-sm font-medium">
                      Semestre
                    </Label>
                    <select
                      id="select-semester"
                      className="w-full p-2 border rounded-md mt-1"
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                    >
                      <option value="S1">Semestre 1</option>
                      <option value="S3">Semestre 3</option>
                    </select>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    if (!selectedDepartment) {
                      alert("Veuillez d'abord sélectionner une filière.")
                      return
                    }
                    setIsAddModuleToDepDialogOpen(true)
                  }}
                >
                  Ajouter un module
                </Button>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Semestre</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedDepartment ? (
                      getModulesForDepartment().length > 0 ? (
                        getModulesForDepartment().map((module) => (
                          <TableRow key={module.id}>
                            <TableCell className="font-medium">{module.name}</TableCell>
                            <TableCell>{module.type}</TableCell>
                            <TableCell>{selectedSemester}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => {
                                    setSelectedModuleInDep(module)
                                    setIsEditModuleInDepDialogOpen(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => {
                                    setSelectedModuleInDep(module)
                                    setIsDeleteModuleFromDepDialogOpen(true)
                                  }}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                            Aucun module attribué à cette filière pour ce semestre
                          </TableCell>
                        </TableRow>
                      )
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                          Veuillez sélectionner une filière pour voir ses modules
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Dialog pour ajouter une filière */}
      <Dialog open={isAddDepartmentDialogOpen} onOpenChange={setIsAddDepartmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle filière</DialogTitle>
            <DialogDescription>Remplissez les informations pour ajouter une nouvelle filière.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input
                id="code"
                value={newDepartment.code}
                onChange={(e) => setNewDepartment({ ...newDepartment, code: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Nom complet
              </Label>
              <Input
                id="fullName"
                value={newDepartment.fullName}
                onChange={(e) => setNewDepartment({ ...newDepartment, fullName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="students" className="text-right">
                Étudiants
              </Label>
              <Input
                id="students"
                type="number"
                value={newDepartment.students}
                onChange={(e) => setNewDepartment({ ...newDepartment, students: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="responsable" className="text-right">
                Responsable
              </Label>
              <Input
                id="responsable"
                value={newDepartment.responsable}
                onChange={(e) => setNewDepartment({ ...newDepartment, responsable: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDepartmentDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleAddDepartment}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier une filière */}
      <Dialog open={isEditDepartmentDialogOpen} onOpenChange={setIsEditDepartmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier une filière</DialogTitle>
            <DialogDescription>Modifiez les informations de la filière.</DialogDescription>
          </DialogHeader>
          {selectedDepartment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="edit-name"
                  value={selectedDepartment.name}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-code" className="text-right">
                  Code
                </Label>
                <Input
                  id="edit-code"
                  value={selectedDepartment.code}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, code: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-fullName" className="text-right">
                  Nom complet
                </Label>
                <Input
                  id="edit-fullName"
                  value={selectedDepartment.fullName}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, fullName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-students" className="text-right">
                  Étudiants
                </Label>
                <Input
                  id="edit-students"
                  type="number"
                  value={selectedDepartment.students}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, students: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-responsable" className="text-right">
                  Responsable
                </Label>
                <Input
                  id="edit-responsable"
                  value={selectedDepartment.responsable}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, responsable: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDepartmentDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleEditDepartment}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour supprimer une filière */}
      <Dialog open={isDeleteDepartmentDialogOpen} onOpenChange={setIsDeleteDepartmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer une filière</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette filière ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {selectedDepartment && (
            <div className="py-4">
              <p className="text-center font-medium">{selectedDepartment.name}</p>
              <p className="text-center text-sm text-muted-foreground">{selectedDepartment.fullName}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDepartmentDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteDepartment}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour ajouter une salle */}
      <Dialog open={isAddRoomDialogOpen} onOpenChange={setIsAddRoomDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle salle</DialogTitle>
            <DialogDescription>Remplissez les informations pour ajouter une nouvelle salle.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room-name" className="text-right">
                Nom
              </Label>
              <Input
                id="room-name"
                value={newRoom.name}
                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room-type" className="text-right">
                Type
              </Label>
              <select
                id="room-type"
                className="col-span-3 w-full p-2 border rounded-md"
                value={newRoom.type}
                onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
              >
                <option value="Amphithéâtre">Amphithéâtre</option>
                <option value="Salle de TD">Salle de TD</option>
                <option value="Laboratoire">Laboratoire</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room-capacity" className="text-right">
                Capacité
              </Label>
              <Input
                id="room-capacity"
                type="number"
                value={newRoom.capacity}
                onChange={(e) => setNewRoom({ ...newRoom, capacity: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoomDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleAddRoom}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier une salle */}
      <Dialog open={isEditRoomDialogOpen} onOpenChange={setIsEditRoomDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier une salle</DialogTitle>
            <DialogDescription>Modifiez les informations de la salle.</DialogDescription>
          </DialogHeader>
          {selectedRoom && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-room-name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="edit-room-name"
                  value={selectedRoom.name}
                  onChange={(e) => setSelectedRoom({ ...selectedRoom, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-room-type" className="text-right">
                  Type
                </Label>
                <select
                  id="edit-room-type"
                  className="col-span-3 w-full p-2 border rounded-md"
                  value={selectedRoom.type}
                  onChange={(e) => setSelectedRoom({ ...selectedRoom, type: e.target.value })}
                >
                  <option value="Amphithéâtre">Amphithéâtre</option>
                  <option value="Salle de TD">Salle de TD</option>
                  <option value="Laboratoire">Laboratoire</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-room-capacity" className="text-right">
                  Capacité
                </Label>
                <Input
                  id="edit-room-capacity"
                  type="number"
                  value={selectedRoom.capacity}
                  onChange={(e) => setSelectedRoom({ ...selectedRoom, capacity: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoomDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleEditRoom}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour supprimer une salle */}
      <Dialog open={isDeleteRoomDialogOpen} onOpenChange={setIsDeleteRoomDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer une salle</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette salle ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {selectedRoom && (
            <div className="py-4">
              <p className="text-center font-medium">{selectedRoom.name}</p>
              <p className="text-center text-sm text-muted-foreground">
                {selectedRoom.type} - Capacité: {selectedRoom.capacity}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteRoomDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteRoom}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour ajouter un module à une filière */}
      <Dialog open={isAddModuleToDepDialogOpen} onOpenChange={setIsAddModuleToDepDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un module à la filière</DialogTitle>
            <DialogDescription>
              {selectedDepartment
                ? `Ajouter un module à ${selectedDepartment.name} - Section ${selectedSection} - ${selectedSemester}`
                : "Veuillez d'abord sélectionner une filière"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="module-select" className="text-right">
                Module
              </Label>
              <select
                id="module-select"
                className="col-span-3 w-full p-2 border rounded-md"
                value={newModuleAssignment.moduleId}
                onChange={(e) => setNewModuleAssignment({ ...newModuleAssignment, moduleId: Number(e.target.value) })}
              >
                <option value="" disabled>
                  Sélectionner un module
                </option>
                {availableModules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.name} ({module.code})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="module-type" className="text-right">
                Type
              </Label>
              <select
                id="module-type"
                className="col-span-3 w-full p-2 border rounded-md"
                value={newModuleAssignment.type}
                onChange={(e) => setNewModuleAssignment({ ...newModuleAssignment, type: e.target.value })}
              >
                <option value="Obligatoire">Obligatoire</option>
                <option value="Optionnel">Optionnel</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModuleToDepDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleAddModuleToDepartment} disabled={!selectedDepartment}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier un module dans une filière */}
      <Dialog open={isEditModuleInDepDialogOpen} onOpenChange={setIsEditModuleInDepDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier un module</DialogTitle>
            <DialogDescription>Modifiez les informations du module dans cette filière</DialogDescription>
          </DialogHeader>
          {selectedModuleInDep && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-module-name" className="text-right">
                  Module
                </Label>
                <Input id="edit-module-name" value={selectedModuleInDep.name} disabled className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-module-type" className="text-right">
                  Type
                </Label>
                <select
                  id="edit-module-type"
                  className="col-span-3 w-full p-2 border rounded-md"
                  value={selectedModuleInDep.type}
                  onChange={(e) => setSelectedModuleInDep({ ...selectedModuleInDep, type: e.target.value })}
                >
                  <option value="Obligatoire">Obligatoire</option>
                  <option value="Optionnel">Optionnel</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModuleInDepDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleEditModuleInDepartment}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour supprimer un module d'une filière */}
      <Dialog open={isDeleteModuleFromDepDialogOpen} onOpenChange={setIsDeleteModuleFromDepDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer un module</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir retirer ce module de cette filière ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {selectedModuleInDep && (
            <div className="py-4">
              <p className="text-center font-medium">{selectedModuleInDep.name}</p>
              <p className="text-center text-sm text-muted-foreground">
                {selectedDepartment?.name} - Section {selectedSection} - {selectedSemester}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModuleFromDepDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteModuleFromDepartment}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <School className="w-6 h-6" />
              <span className="text-lg font-bold">TimeOpti</span>
            </div>
            <p className="text-sm text-gray-500">© 2025 TimeOpti. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

