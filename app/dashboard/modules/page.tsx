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
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Plus, Search, Edit, Trash, BookOpen } from "lucide-react"

// Données des modules exactes du PDF
const initialModules = [
  {
    id: 1,
    name: "Electricité",
    code: "PHY110",
    hours: {
      cours: 24,
      td: 12,
      tp: 12,
    },
    type: "Obligatoire",
    professors: ["FOUAD JEBARI", "FATIMA BAHRAOUI", "ALI DAANOUN", "ABDELJALIL RUSI EL HASSANI", "ADIL MARJAOUI"],
  },
  {
    id: 2,
    name: "Circuit électrique",
    code: "PHY120",
    hours: {
      cours: 24,
      td: 12,
      tp: 12,
    },
    type: "Obligatoire",
    professors: ["ABDELHAMID CHATT", "SAID BENAOUICHA", "MOHAMMED EL BOUKARI"],
  },
  {
    id: 3,
    name: "Programmation 1",
    code: "INF110",
    hours: {
      cours: 24,
      td: 0,
      tp: 24,
    },
    type: "Obligatoire",
    professors: ["MOHAMED KOUNAIDI", "AZIZ MAHBOUB", "IKRAM BEN ABDEL OUAHAB", "OUAFAE BAIDA"],
  },
  {
    id: 4,
    name: "Analyse 1",
    code: "MAT110",
    hours: {
      cours: 24,
      td: 24,
      tp: 0,
    },
    type: "Obligatoire",
    professors: ["JAMAL EL AMRANI", "MUSTAPHA ER-RIANI", "SAMIR MOKHTAR", "TARIK AMTOUT"],
  },
  {
    id: 5,
    name: "Algébre 1",
    code: "MAT120",
    hours: {
      cours: 24,
      td: 24,
      tp: 0,
    },
    type: "Obligatoire",
    professors: ["ABDELAZIZ CHAOUECH", "SAMIR CHERKI", "KAMAL AIT TOUCHENT"],
  },
  {
    id: 6,
    name: "LC1",
    code: "LAN110",
    hours: {
      cours: 0,
      td: 24,
      tp: 0,
    },
    type: "Obligatoire",
    professors: ["SAMIR MOKHTAR", "IKRAM ALAMI", "YASSIN RAZKOUI", "HASSNA FARSSI"],
  },
  {
    id: 7,
    name: "Mécanique des Solides",
    code: "PHY210",
    hours: {
      cours: 24,
      td: 12,
      tp: 12,
    },
    type: "Obligatoire",
    professors: ["ALI DAANOUN", "MOUNIR ZAHER"],
  },
  {
    id: 8,
    name: "Electronique",
    code: "PHY220",
    hours: {
      cours: 24,
      td: 12,
      tp: 12,
    },
    type: "Obligatoire",
    professors: ["ABDELALI ASTITO"],
  },
  {
    id: 9,
    name: "Programmation 2",
    code: "INF210",
    hours: {
      cours: 24,
      td: 0,
      tp: 24,
    },
    type: "Obligatoire",
    professors: ["IKRAM BEN ABDEL OUAHAB", "ABDELHAMID ZOUHAIR", "LOTFI EL AACHAK", "SANAE KHALI ISSA"],
  },
  {
    id: 10,
    name: "Probabilité / Statistique",
    code: "MAT210",
    hours: {
      cours: 24,
      td: 24,
      tp: 0,
    },
    type: "Obligatoire",
    professors: [
      "KHALID BOULIFA",
      "KAOUTHAR EL FASSI",
      "KAOUTHAR EL FASS",
      "ADEL SETTATI",
      "ABDELAZIZ ASSADOUQ",
      "ABDELHADI AKHARIF",
    ],
  },
]

// Données des attributions de modules aux filières
const initialModuleAssignments = [
  {
    id: 1,
    moduleId: 1,
    department: "GE-GM",
    section: "A",
    semester: "S1",
    type: "Obligatoire",
  },
  {
    id: 2,
    moduleId: 1,
    department: "MIPC",
    section: "A",
    semester: "S1",
    type: "Obligatoire",
  },
  {
    id: 3,
    moduleId: 1,
    department: "MIPC",
    section: "B",
    semester: "S1",
    type: "Obligatoire",
  },
  {
    id: 4,
    moduleId: 1,
    department: "MIP",
    section: "A",
    semester: "S1",
    type: "Obligatoire",
  },
  {
    id: 5,
    moduleId: 1,
    department: "BCG",
    section: "A",
    semester: "S3",
    type: "Obligatoire",
  },
  {
    id: 6,
    moduleId: 1,
    department: "BCG",
    section: "B",
    semester: "S3",
    type: "Obligatoire",
  },
]

export default function ModulesPage() {
  const [modules, setModules] = useState(initialModules)
  const [moduleAssignments, setModuleAssignments] = useState(initialModuleAssignments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModule, setSelectedModule] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newModule, setNewModule] = useState({
    name: "",
    code: "",
    hours: {
      cours: 0,
      td: 0,
      tp: 0,
    },
    type: "Obligatoire",
    professors: [],
  })

  // États pour les attributions de modules
  const [isAddAssignmentDialogOpen, setIsAddAssignmentDialogOpen] = useState(false)
  const [isEditAssignmentDialogOpen, setIsEditAssignmentDialogOpen] = useState(false)
  const [isDeleteAssignmentDialogOpen, setIsDeleteAssignmentDialogOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [newAssignment, setNewAssignment] = useState({
    moduleId: 1,
    department: "",
    section: "A",
    semester: "S1",
    type: "Obligatoire",
  })

  // États pour les contraintes
  const [constraints, setConstraints] = useState({
    courseBeforeTD: true,
    maxHoursPerDay: true,
    noSaturdayAfternoon: false,
    requiresLab: true,
    requiresProjector: true,
  })
  const [selectedModuleForConstraints, setSelectedModuleForConstraints] = useState(null)

  // Filtrer les modules en fonction du terme de recherche
  const filteredModules = modules.filter(
    (module) =>
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (module.professors.length > 0 &&
        module.professors.some((prof) => prof.toLowerCase().includes(searchTerm.toLowerCase()))),
  )

  // Gérer l'ajout d'un nouveau module
  const handleAddModule = () => {
    if (!newModule.name || !newModule.code) {
      alert("Veuillez remplir au moins le nom et le code du module.")
      return
    }

    const id = modules.length > 0 ? Math.max(...modules.map((m) => m.id)) + 1 : 1
    const moduleToAdd = {
      id,
      ...newModule,
      professors: newModule.professors || [],
    }

    setModules([...modules, moduleToAdd])
    setNewModule({
      name: "",
      code: "",
      hours: {
        cours: 0,
        td: 0,
        tp: 0,
      },
      type: "Obligatoire",
      professors: [],
    })
    setIsAddDialogOpen(false)
    alert(`Module "${moduleToAdd.name}" ajouté avec succès !`)
  }

  // Gérer la modification d'un module
  const handleEditModule = () => {
    if (!selectedModule || !selectedModule.name || !selectedModule.code) {
      alert("Veuillez remplir au moins le nom et le code du module.")
      return
    }

    setModules(modules.map((module) => (module.id === selectedModule.id ? selectedModule : module)))
    setIsEditDialogOpen(false)
    alert(`Module "${selectedModule.name}" modifié avec succès !`)
  }

  // Gérer la suppression d'un module
  const handleDeleteModule = () => {
    if (!selectedModule) return

    setModules(modules.filter((module) => module.id !== selectedModule.id))

    // Supprimer également les attributions associées à ce module
    setModuleAssignments(moduleAssignments.filter((assignment) => assignment.moduleId !== selectedModule.id))

    setIsDeleteDialogOpen(false)
    alert(`Module "${selectedModule.name}" supprimé avec succès !`)
  }

  // Gérer l'ajout d'une attribution de module
  const handleAddAssignment = () => {
    if (!newAssignment.department) {
      alert("Veuillez remplir au moins la filière.")
      return
    }

    const id = moduleAssignments.length > 0 ? Math.max(...moduleAssignments.map((a) => a.id)) + 1 : 1
    const assignmentToAdd = { id, ...newAssignment }

    setModuleAssignments([...moduleAssignments, assignmentToAdd])
    setNewAssignment({
      moduleId: 1,
      department: "",
      section: "A",
      semester: "S1",
      type: "Obligatoire",
    })
    setIsAddAssignmentDialogOpen(false)

    const module = modules.find((m) => m.id === newAssignment.moduleId)
    alert(`Attribution du module "${module?.name}" à la filière "${newAssignment.department}" ajoutée avec succès !`)
  }

  // Gérer la modification d'une attribution
  const handleEditAssignment = () => {
    if (!selectedAssignment) return

    setModuleAssignments(
      moduleAssignments.map((assignment) =>
        assignment.id === selectedAssignment.id ? selectedAssignment : assignment,
      ),
    )
    setIsEditAssignmentDialogOpen(false)

    const module = modules.find((m) => m.id === selectedAssignment.moduleId)
    alert(`Attribution du module "${module?.name}" modifiée avec succès !`)
  }

  // Gérer la suppression d'une attribution
  const handleDeleteAssignment = () => {
    if (!selectedAssignment) return

    setModuleAssignments(moduleAssignments.filter((assignment) => assignment.id !== selectedAssignment.id))
    setIsDeleteAssignmentDialogOpen(false)

    const module = modules.find((m) => m.id === selectedAssignment.moduleId)
    alert(`Attribution du module "${module?.name}" supprimée avec succès !`)
  }

  // Gérer l'enregistrement des contraintes
  const handleSaveConstraints = () => {
    if (!selectedModuleForConstraints) {
      alert("Veuillez d'abord sélectionner un module.")
      return
    }

    alert(`Contraintes enregistrées avec succès pour le module "${selectedModuleForConstraints.name}" !`)
  }

  // Gérer le changement d'une contrainte
  const handleConstraintChange = (key, value) => {
    setConstraints({
      ...constraints,
      [key]: value,
    })
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
            <Link
              href="/dashboard/modules"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
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
              <h1 className="text-2xl font-bold">Gestion des Modules</h1>
              <p className="text-muted-foreground">Gérez les modules d'enseignement et leurs contraintes</p>
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
              <CardTitle>Liste des Modules</CardTitle>
              <CardDescription>Consultez et gérez les modules d'enseignement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher un module..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button className="gap-1" onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4" />
                  Ajouter un module
                </Button>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom du Module</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Heures</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Professeurs</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredModules.map((module) => (
                      <TableRow key={module.id}>
                        <TableCell className="font-medium">{module.name}</TableCell>
                        <TableCell>{module.code}</TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>Cours: {module.hours.cours}h</div>
                            <div>TD: {module.hours.td}h</div>
                            <div>TP: {module.hours.tp}h</div>
                          </div>
                        </TableCell>
                        <TableCell>{module.type}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {module.professors.slice(0, 2).map((prof, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                              >
                                {prof}
                              </span>
                            ))}
                            {module.professors.length > 2 && (
                              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                                +{module.professors.length - 2}
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
                                setSelectedModule(module)
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
                                setSelectedModule(module)
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

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Attribution des Modules</CardTitle>
                <CardDescription>Associez les modules aux filières</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Sélectionnez un module pour voir ses attributions
                  </p>
                  <div className="space-y-2">
                    {moduleAssignments.slice(0, 5).map((assignment) => {
                      const module = modules.find((m) => m.id === assignment.moduleId)
                      return (
                        <div key={assignment.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <div>
                            <div className="font-medium">{module?.name || "Module inconnu"}</div>
                            <div className="text-xs text-muted-foreground">
                              {assignment.department} - Section {assignment.section} - {assignment.semester}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedAssignment(assignment)
                                setIsEditAssignmentDialogOpen(true)
                              }}
                            >
                              Modifier
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500"
                              onClick={() => {
                                setSelectedAssignment(assignment)
                                setIsDeleteAssignmentDialogOpen(true)
                              }}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm" className="gap-1" onClick={() => setIsAddAssignmentDialogOpen(true)}>
                      <Plus className="w-4 h-4" />
                      Ajouter une attribution
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contraintes des Modules</CardTitle>
                <CardDescription>Définissez les contraintes spécifiques pour chaque module</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="module-constraints" className="text-sm font-medium">
                      Sélectionnez un module
                    </label>
                    <select
                      id="module-constraints"
                      className="w-full p-2 border rounded-md"
                      value={selectedModuleForConstraints ? selectedModuleForConstraints.id : ""}
                      onChange={(e) => {
                        const moduleId = Number(e.target.value)
                        const module = modules.find((m) => m.id === moduleId)
                        setSelectedModuleForConstraints(module)
                      }}
                    >
                      <option value="" disabled>
                        Choisir un module
                      </option>
                      {modules.map((module) => (
                        <option key={module.id} value={module.id}>
                          {module.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedModuleForConstraints ? (
                    <>
                      <div className="p-2 bg-muted rounded-md">
                        <div className="font-medium mb-2">Contraintes pédagogiques</div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center justify-between">
                            <span>Cours avant TD/TP</span>
                            <Switch
                              id="constraint-1"
                              checked={constraints.courseBeforeTD}
                              onCheckedChange={(checked) => handleConstraintChange("courseBeforeTD", checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Maximum 4h par jour</span>
                            <Switch
                              id="constraint-2"
                              checked={constraints.maxHoursPerDay}
                              onCheckedChange={(checked) => handleConstraintChange("maxHoursPerDay", checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Pas de cours le samedi après-midi</span>
                            <Switch
                              id="constraint-3"
                              checked={constraints.noSaturdayAfternoon}
                              onCheckedChange={(checked) => handleConstraintChange("noSaturdayAfternoon", checked)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-muted rounded-md">
                        <div className="font-medium mb-2">Contraintes matérielles</div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center justify-between">
                            <span>Nécessite un laboratoire</span>
                            <Switch
                              id="constraint-4"
                              checked={constraints.requiresLab}
                              onCheckedChange={(checked) => handleConstraintChange("requiresLab", checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Nécessite un vidéoprojecteur</span>
                            <Switch
                              id="constraint-5"
                              checked={constraints.requiresProjector}
                              onCheckedChange={(checked) => handleConstraintChange("requiresProjector", checked)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" onClick={handleSaveConstraints}>
                          Enregistrer les contraintes
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      Veuillez sélectionner un module pour voir et modifier ses contraintes
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Dialog pour ajouter un module */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau module</DialogTitle>
            <DialogDescription>Remplissez les informations pour ajouter un nouveau module.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={newModule.name}
                onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input
                id="code"
                value={newModule.code}
                onChange={(e) => setNewModule({ ...newModule, code: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hours-cours" className="text-right">
                Heures (Cours)
              </Label>
              <Input
                id="hours-cours"
                type="number"
                value={newModule.hours.cours}
                onChange={(e) =>
                  setNewModule({
                    ...newModule,
                    hours: {
                      ...newModule.hours,
                      cours: Number.parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hours-td" className="text-right">
                Heures (TD)
              </Label>
              <Input
                id="hours-td"
                type="number"
                value={newModule.hours.td}
                onChange={(e) =>
                  setNewModule({
                    ...newModule,
                    hours: {
                      ...newModule.hours,
                      td: Number.parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hours-tp" className="text-right">
                Heures (TP)
              </Label>
              <Input
                id="hours-tp"
                type="number"
                value={newModule.hours.tp}
                onChange={(e) =>
                  setNewModule({
                    ...newModule,
                    hours: {
                      ...newModule.hours,
                      tp: Number.parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <select
                id="type"
                className="col-span-3 w-full p-2 border rounded-md"
                value={newModule.type}
                onChange={(e) => setNewModule({ ...newModule, type: e.target.value })}
              >
                <option value="Obligatoire">Obligatoire</option>
                <option value="Optionnel">Optionnel</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleAddModule}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier un module */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier un module</DialogTitle>
            <DialogDescription>Modifiez les informations du module.</DialogDescription>
          </DialogHeader>
          {selectedModule && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="edit-name"
                  value={selectedModule.name}
                  onChange={(e) => setSelectedModule({ ...selectedModule, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-code" className="text-right">
                  Code
                </Label>
                <Input
                  id="edit-code"
                  value={selectedModule.code}
                  onChange={(e) => setSelectedModule({ ...selectedModule, code: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-hours-cours" className="text-right">
                  Heures (Cours)
                </Label>
                <Input
                  id="edit-hours-cours"
                  type="number"
                  value={selectedModule.hours.cours}
                  onChange={(e) =>
                    setSelectedModule({
                      ...selectedModule,
                      hours: {
                        ...selectedModule.hours,
                        cours: Number.parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-hours-td" className="text-right">
                  Heures (TD)
                </Label>
                <Input
                  id="edit-hours-td"
                  type="number"
                  value={selectedModule.hours.td}
                  onChange={(e) =>
                    setSelectedModule({
                      ...selectedModule,
                      hours: {
                        ...selectedModule.hours,
                        td: Number.parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-hours-tp" className="text-right">
                  Heures (TP)
                </Label>
                <Input
                  id="edit-hours-tp"
                  type="number"
                  value={selectedModule.hours.tp}
                  onChange={(e) =>
                    setSelectedModule({
                      ...selectedModule,
                      hours: {
                        ...selectedModule.hours,
                        tp: Number.parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <select
                  id="edit-type"
                  className="col-span-3 w-full p-2 border rounded-md"
                  value={selectedModule.type}
                  onChange={(e) => setSelectedModule({ ...selectedModule, type: e.target.value })}
                >
                  <option value="Obligatoire">Obligatoire</option>
                  <option value="Optionnel">Optionnel</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleEditModule}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour supprimer un module */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer un module</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce module ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {selectedModule && (
            <div className="py-4">
              <p className="text-center font-medium">{selectedModule.name}</p>
              <p className="text-center text-sm text-muted-foreground">
                {selectedModule.code} - {selectedModule.type}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteModule}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour ajouter une attribution */}
      <Dialog open={isAddAssignmentDialogOpen} onOpenChange={setIsAddAssignmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une attribution de module</DialogTitle>
            <DialogDescription>Associez un module à une filière</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="module-id" className="text-right">
                Module
              </Label>
              <select
                id="module-id"
                className="col-span-3 w-full p-2 border rounded-md"
                value={newAssignment.moduleId}
                onChange={(e) => setNewAssignment({ ...newAssignment, moduleId: Number(e.target.value) })}
              >
                {modules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Filière
              </Label>
              <Input
                id="department"
                value={newAssignment.department}
                onChange={(e) => setNewAssignment({ ...newAssignment, department: e.target.value })}
                className="col-span-3"
                placeholder="Ex: MIPC"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="section" className="text-right">
                Section
              </Label>
              <Input
                id="section"
                value={newAssignment.section}
                onChange={(e) => setNewAssignment({ ...newAssignment, section: e.target.value })}
                className="col-span-3"
                placeholder="Ex: A"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="semester" className="text-right">
                Semestre
              </Label>
              <select
                id="semester"
                className="col-span-3 w-full p-2 border rounded-md"
                value={newAssignment.semester}
                onChange={(e) => setNewAssignment({ ...newAssignment, semester: e.target.value })}
              >
                <option value="S1">Semestre 1</option>
                <option value="S3">Semestre 3</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignment-type" className="text-right">
                Type
              </Label>
              <select
                id="assignment-type"
                className="col-span-3 w-full p-2 border rounded-md"
                value={newAssignment.type}
                onChange={(e) => setNewAssignment({ ...newAssignment, type: e.target.value })}
              >
                <option value="Obligatoire">Obligatoire</option>
                <option value="Optionnel">Optionnel</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddAssignmentDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleAddAssignment}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier une attribution */}
      <Dialog open={isEditAssignmentDialogOpen} onOpenChange={setIsEditAssignmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier une attribution</DialogTitle>
            <DialogDescription>Modifiez les détails de l'attribution</DialogDescription>
          </DialogHeader>
          {selectedAssignment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-module-id" className="text-right">
                  Module
                </Label>
                <select
                  id="edit-module-id"
                  className="col-span-3 w-full p-2 border rounded-md"
                  value={selectedAssignment.moduleId}
                  onChange={(e) => setSelectedAssignment({ ...selectedAssignment, moduleId: Number(e.target.value) })}
                >
                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right">
                  Filière
                </Label>
                <Input
                  id="edit-department"
                  value={selectedAssignment.department}
                  onChange={(e) => setSelectedAssignment({ ...selectedAssignment, department: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-section" className="text-right">
                  Section
                </Label>
                <Input
                  id="edit-section"
                  value={selectedAssignment.section}
                  onChange={(e) => setSelectedAssignment({ ...selectedAssignment, section: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-semester" className="text-right">
                  Semestre
                </Label>
                <select
                  id="edit-semester"
                  className="col-span-3 w-full p-2 border rounded-md"
                  value={selectedAssignment.semester}
                  onChange={(e) => setSelectedAssignment({ ...selectedAssignment, semester: e.target.value })}
                >
                  <option value="S1">Semestre 1</option>
                  <option value="S3">Semestre 3</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-assignment-type" className="text-right">
                  Type
                </Label>
                <select
                  id="edit-assignment-type"
                  className="col-span-3 w-full p-2 border rounded-md"
                  value={selectedAssignment.type}
                  onChange={(e) => setSelectedAssignment({ ...selectedAssignment, type: e.target.value })}
                >
                  <option value="Obligatoire">Obligatoire</option>
                  <option value="Optionnel">Optionnel</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditAssignmentDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleEditAssignment}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour supprimer une attribution */}
      <Dialog open={isDeleteAssignmentDialogOpen} onOpenChange={setIsDeleteAssignmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer une attribution</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette attribution ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {selectedAssignment && (
            <div className="py-4">
              <p className="text-center font-medium">
                {modules.find((m) => m.id === selectedAssignment.moduleId)?.name || "Module inconnu"}
              </p>
              <p className="text-center text-sm text-muted-foreground">
                {selectedAssignment.department} - Section {selectedAssignment.section} - {selectedAssignment.semester}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteAssignmentDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteAssignment}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

