"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Download, Printer, RefreshCw, Check } from "lucide-react"

// Définition des structures de données exactes du PDF
const filieres = [
  { id: "gegm", name: "GE-GM", sections: ["A"] },
  { id: "mipc", name: "MIPC", sections: ["A", "B"] },
  { id: "mip", name: "MIP", sections: ["A"] },
  { id: "bcg", name: "BCG", sections: ["A", "B"] },
]

const timeSlots = ["09:00 - 10:30", "10:45 - 12:15", "12:30 - 14:00", "14:15 - 15:45", "16:00 - 17:30"]

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

const amphis = ["Amphi 1", "Amphi 2", "Amphi 3", "Amphi 4", "Amphi 5", "Amphi 6"]

// Données exactes des emplois du temps du PDF
const timetableData = {
  "gegm-A-S1": [
    { day: "Lundi", time: "10:45 - 12:15", module: "Electricité", professor: "FOUAD JEBARI", room: "Amphi 4" },
    {
      day: "Mardi",
      time: "12:30 - 14:00",
      module: "Circuit électrique",
      professor: "ABDELHAMID CHATT",
      room: "Amphi 3",
    },
    {
      day: "Mercredi",
      time: "14:15 - 15:45",
      module: "Programmation 1",
      professor: "MOHAMED KOUNAIDI",
      room: "Amphi 2",
    },
    { day: "Jeudi", time: "16:00 - 17:30", module: "Analyse 1", professor: "JAMAL EL AMRANI", room: "Amphi 1" },
    { day: "Vendredi", time: "10:45 - 12:15", module: "Algébre 1", professor: "ABDELAZIZ CHAOUECH", room: "Amphi 5" },
    { day: "Samedi", time: "12:30 - 14:00", module: "LC1", professor: "SAMIR MOKHTAR", room: "Amphi 6" },
  ],
  "gegm-A-S3": [
    { day: "Lundi", time: "10:45 - 12:15", module: "Mécanique des Solides", professor: "ALI DAANOUN", room: "Amphi 1" },
    { day: "Mardi", time: "12:30 - 14:00", module: "Electronique", professor: "ABDELALI ASTITO", room: "Amphi 3" },
    {
      day: "Mercredi",
      time: "14:15 - 15:45",
      module: "Programmation 2",
      professor: "IKRAM BEN ABDEL OUAHAB",
      room: "Amphi 2",
    },
    {
      day: "Jeudi",
      time: "16:00 - 17:30",
      module: "Probabilité / Statistique",
      professor: "KHALID BOULIFA",
      room: "Amphi 1",
    },
    {
      day: "Vendredi",
      time: "10:45 - 12:15",
      module: "Métrologie / Instrumentation",
      professor: "HICHAM ATABI",
      room: "Amphi 2",
    },
    {
      day: "Samedi",
      time: "12:30 - 14:00",
      module: "Gestion",
      professor: "CHAHINAZE FIKRI BENBRAHIM",
      room: "Amphi 2",
    },
  ],
  "mipc-A-S1": [
    { day: "Lundi", time: "10:45 - 12:15", module: "Electricité", professor: "FATIMA BAHRAOUI", room: "Amphi 1" },
    {
      day: "Mardi",
      time: "12:30 - 14:00",
      module: "Circuit électrique",
      professor: "SAID BENAOUICHA",
      room: "Amphi 5",
    },
    { day: "Mercredi", time: "14:15 - 15:45", module: "Programmation 1", professor: "AZIZ MAHBOUB", room: "Amphi 3" },
    { day: "Jeudi", time: "16:00 - 17:30", module: "Analyse 1", professor: "MUSTAPHA ER-RIANI", room: "Amphi 4" },
    { day: "Vendredi", time: "10:45 - 12:15", module: "Algébre 1", professor: "SAMIR CHERKI", room: "Amphi 4" },
    { day: "Samedi", time: "12:30 - 14:00", module: "LC1", professor: "IKRAM ALAMI", room: "Amphi 4" },
  ],
  "mipc-A-S3": [
    {
      day: "Lundi",
      time: "10:45 - 12:15",
      module: "Electromagnétisme",
      professor: "ABDELLAH CHENTOUF",
      room: "Amphi 6",
    },
    {
      day: "Mardi",
      time: "12:30 - 14:00",
      module: "Réactivité Chimique",
      professor: "MOHAMED EL GOLBZOURI",
      room: "Amphi 3",
    },
    {
      day: "Mercredi",
      time: "14:15 - 15:45",
      module: "Programmation 2",
      professor: "ABDELHAMID ZOUHAIR",
      room: "Amphi 4",
    },
    { day: "Jeudi", time: "16:00 - 17:30", module: "Analyse 3", professor: "MUSTAPHA EL JARROUDI", room: "Amphi 2" },
    {
      day: "Vendredi",
      time: "10:45 - 12:15",
      module: "Probabilité / Statistique",
      professor: "KAOUTHAR EL FASSI",
      room: "Amphi 6",
    },
    { day: "Samedi", time: "12:30 - 14:00", module: "LC3", professor: "IKRAM ALAMI", room: "Amphi 4" },
  ],
  "mipc-B-S1": [
    { day: "Lundi", time: "10:45 - 12:15", module: "Electricité", professor: "ALI DAANOUN", room: "Amphi 4" },
    {
      day: "Mardi",
      time: "12:30 - 14:00",
      module: "Circuit électrique",
      professor: "ABDELHAMID CHATT",
      room: "Amphi 2",
    },
    {
      day: "Mercredi",
      time: "14:15 - 15:45",
      module: "Programmation 1",
      professor: "IKRAM BEN ABDEL OUAHAB",
      room: "Amphi 5",
    },
    { day: "Jeudi", time: "16:00 - 17:30", module: "Analyse 1", professor: "TARIK AMTOUT", room: "Amphi 4" },
    { day: "Vendredi", time: "10:45 - 12:15", module: "Algébre 1", professor: "KAMAL AIT TOUCHENT", room: "Amphi 1" },
    { day: "Samedi", time: "12:30 - 14:00", module: "LC1", professor: "YASSIN RAZKOUI", room: "Amphi 3" },
  ],
  "mipc-B-S3": [
    { day: "Lundi", time: "10:45 - 12:15", module: "Electromagnétisme", professor: "MOHAMMED SAID", room: "Amphi 5" },
    {
      day: "Mardi",
      time: "12:30 - 14:00",
      module: "Réactivité Chimique",
      professor: "MOHAMED EL GOLBZOURI",
      room: "Amphi 4",
    },
    {
      day: "Mercredi",
      time: "14:15 - 15:45",
      module: "Programmation 2",
      professor: "LOTFI EL AACHAK",
      room: "Amphi 1",
    },
    { day: "Jeudi", time: "16:00 - 17:30", module: "Analyse 3", professor: "MUSTAPHA EL JARROUDI", room: "Amphi 6" },
    {
      day: "Vendredi",
      time: "10:45 - 12:15",
      module: "Probabilité / Statistique",
      professor: "KAOUTHAR EL FASS",
      room: "Amphi 2",
    },
    { day: "Samedi", time: "12:30 - 14:00", module: "LC3", professor: "IKRAM ALAMI", room: "Amphi 3" },
  ],
  "mip-A-S1": [
    {
      day: "Lundi",
      time: "10:45 - 12:15",
      module: "Electricité",
      professor: "ABDELJALIL RUSI EL HASSANI",
      room: "Amphi 5",
    },
    {
      day: "Mardi",
      time: "12:30 - 14:00",
      module: "Circuit électrique",
      professor: "MOHAMMED EL BOUKARI",
      room: "Amphi 5",
    },
    { day: "Mercredi", time: "14:15 - 15:45", module: "Programmation 1", professor: "OUAFAE BAIDA", room: "Amphi 4" },
    { day: "Jeudi", time: "16:00 - 17:30", module: "Analyse 1", professor: "SAMIR MOKHTAR", room: "Amphi 6" },
    { day: "Vendredi", time: "10:45 - 12:15", module: "Algébre 1", professor: "ABDELAZIZ CHAOUECH", room: "Amphi 1" },
    { day: "Samedi", time: "12:30 - 14:00", module: "LC1", professor: "HASSNA FARSSI", room: "Amphi 3" },
  ],
  "mip-A-S3": [
    {
      day: "Lundi",
      time: "10:45 - 12:15",
      module: "Mécanique des Solides",
      professor: "MOUNIR ZAHER",
      room: "Amphi 1",
    },
    {
      day: "Mardi",
      time: "12:30 - 14:00",
      module: "Réactivité Chimique",
      professor: "FATHIA ALISTIQSA",
      room: "Amphi 5",
    },
    {
      day: "Mercredi",
      time: "14:15 - 15:45",
      module: "Probabilité / Statistique",
      professor: "ADEL SETTATI",
      room: "Amphi 2",
    },
    { day: "Jeudi", time: "16:00 - 17:30", module: "Programmation 2", professor: "SANAE KHALI ISSA", room: "Amphi 1" },
    {
      day: "Vendredi",
      time: "10:45 - 12:15",
      module: "Analyse 3",
      professor: "MOHAMED AMIN BAHRAOUI",
      room: "Amphi 6",
    },
    { day: "Samedi", time: "12:30 - 14:00", module: "LC3", professor: "YASSIN RAZKOUI", room: "Amphi 6" },
  ],
  "bcg-A-S1": [
    { day: "Lundi", time: "10:45 - 12:15", module: "LC1", professor: "HASSNA FARSSI", room: "Amphi 1" },
    { day: "Mardi", time: "12:30 - 14:00", module: "Algébre", professor: "MUSTAPHA ER-RIANI", room: "Amphi 2" },
    {
      day: "Mercredi",
      time: "14:15 - 15:45",
      module: "Structure de la Matière",
      professor: "SOUAD BZIOUI",
      room: "Amphi 3",
    },
    {
      day: "Jeudi",
      time: "16:00 - 17:30",
      module: "Cosmologie & Géodynamique interne",
      professor: "ABDELGHANI AFAILAL TRIBAK",
      room: "Amphi 4",
    },
    {
      day: "Vendredi",
      time: "10:45 - 12:15",
      module: "Biologie cellulaire",
      professor: "NOUREDDIN BOUAYAD",
      room: "Amphi 5",
    },
    {
      day: "Samedi",
      time: "12:30 - 14:00",
      module: "Optique Géométrique et Radioactivité",
      professor: "AHMED CHENAOUI",
      room: "Amphi 6",
    },
  ],
  "bcg-A-S3": [
    { day: "Lundi", time: "10:45 - 12:15", module: "Electricité", professor: "ADIL MARJAOUI", room: "Amphi 1" },
    {
      day: "Mardi",
      time: "12:30 - 14:00",
      module: "Chimie Minérale 1",
      professor: "NOUR-EDDINE CHOUAIBI",
      room: "Amphi 2",
    },
    {
      day: "Mercredi",
      time: "14:15 - 15:45",
      module: "Chimie Organique 1",
      professor: "SOUAD BZIOUI",
      room: "Amphi 3",
    },
    {
      day: "Jeudi",
      time: "16:00 - 17:30",
      module: "Probabilité / Statistique",
      professor: "ABDELAZIZ ASSADOUQ",
      room: "Amphi 4",
    },
    { day: "Vendredi", time: "10:45 - 12:15", module: "Biologie végétale", professor: "FATIHA CHIBI", room: "Amphi 5" },
    {
      day: "Samedi",
      time: "12:30 - 14:00",
      module: "Stratigraphie & Paléo-environnement",
      professor: "SAIDA BOUZID",
      room: "Amphi 6",
    },
  ],
  "bcg-B-S1": [
    { day: "Lundi", time: "10:45 - 12:15", module: "LC1", professor: "HASSNA FARSSI", room: "Amphi 1" },
    { day: "Mardi", time: "12:30 - 14:00", module: "Algébre", professor: "TARIK AMTOUT", room: "Amphi 2" },
    {
      day: "Mercredi",
      time: "14:15 - 15:45",
      module: "Structure de la Matière",
      professor: "ABDELLATIF AALITI",
      room: "Amphi 3",
    },
    {
      day: "Jeudi",
      time: "16:00 - 17:30",
      module: "Cosmologie & Géodynamique interne",
      professor: "TAOUFIK MOURABIT",
      room: "Amphi 4",
    },
    {
      day: "Vendredi",
      time: "10:45 - 12:15",
      module: "Biologie cellulaire",
      professor: "NOUREDDIN BOUAYAD",
      room: "Amphi 5",
    },
    {
      day: "Samedi",
      time: "12:30 - 14:00",
      module: "Optique Géométrique et Radioactivité",
      professor: "ABDELHAMID CHATT",
      room: "Amphi 6",
    },
  ],
  "bcg-B-S3": [
    { day: "Lundi", time: "10:45 - 12:15", module: "Electricité", professor: "FOUAD JEBARI", room: "Amphi 1" },
    {
      day: "Mardi",
      time: "12:30 - 14:00",
      module: "Chimie Minérale 1",
      professor: "NOUR-EDDINE CHOUAIBI",
      room: "Amphi 2",
    },
    {
      day: "Mercredi",
      time: "14:15 - 15:45",
      module: "Chimie Organique 1",
      professor: "SOUAD BZIOUI",
      room: "Amphi 3",
    },
    {
      day: "Jeudi",
      time: "16:00 - 17:30",
      module: "Probabilité / Statistique",
      professor: "ABDELHADI AKHARIF",
      room: "Amphi 4",
    },
    { day: "Vendredi", time: "10:45 - 12:15", module: "Biologie végétale", professor: "FATIHA CHIBI", room: "Amphi 5" },
    {
      day: "Samedi",
      time: "12:30 - 14:00",
      module: "Stratigraphie & Paléo-environnement",
      professor: "KHADIJA ABOUMARIA",
      room: "Amphi 6",
    },
  ],
}

// Liste des professeurs par filière
const professorsByFiliere = {
  gegm: [
    "FOUAD JEBARI",
    "ABDELHAMID CHATT",
    "MOHAMED KOUNAIDI",
    "JAMAL EL AMRANI",
    "ABDELAZIZ CHAOUECH",
    "SAMIR MOKHTAR",
    "ALI DAANOUN",
    "ABDELALI ASTITO",
    "IKRAM BEN ABDEL OUAHAB",
    "KHALID BOULIFA",
    "HICHAM ATABI",
    "CHAHINAZE FIKRI BENBRAHIM",
  ],
  "mipc-A": [
    "FATIMA BAHRAOUI",
    "SAID BENAOUICHA",
    "AZIZ MAHBOUB",
    "MUSTAPHA ER-RIANI",
    "SAMIR CHERKI",
    "IKRAM ALAMI",
    "ABDELLAH CHENTOUF",
    "MOHAMED EL GOLBZOURI",
    "ABDELHAMID ZOUHAIR",
    "MUSTAPHA EL JARROUDI",
    "KAOUTHAR EL FASSI",
  ],
  "mipc-B": [
    "ALI DAANOUN",
    "ABDELHAMID CHATT",
    "IKRAM BEN ABDEL OUAHAB",
    "TARIK AMTOUT",
    "KAMAL AIT TOUCHENT",
    "YASSIN RAZKOUI",
    "MOHAMMED SAID",
    "MOHAMED EL GOLBZOURI",
    "LOTFI EL AACHAK",
    "MUSTAPHA EL JARROUDI",
    "KAOUTHAR EL FASS",
    "IKRAM ALAMI",
  ],
  mip: [
    "ABDELJALIL RUSI EL HASSANI",
    "MOHAMMED EL BOUKARI",
    "OUAFAE BAIDA",
    "SAMIR MOKHTAR",
    "ABDELAZIZ CHAOUECH",
    "HASSNA FARSSI",
    "MOUNIR ZAHER",
    "FATHIA ALISTIQSA",
    "ADEL SETTATI",
    "SANAE KHALI ISSA",
    "MOHAMED AMIN BAHRAOUI",
    "YASSIN RAZKOUI",
  ],
  "bcg-A": [
    "HASSNA FARSSI",
    "MUSTAPHA ER-RIANI",
    "SOUAD BZIOUI",
    "ABDELGHANI AFAILAL TRIBAK",
    "NOUREDDIN BOUAYAD",
    "AHMED CHENAOUI",
    "ADIL MARJAOUI",
    "NOUR-EDDINE CHOUAIBI",
    "ABDELAZIZ ASSADOUQ",
    "FATIHA CHIBI",
    "SAIDA BOUZID",
  ],
  "bcg-B": [
    "HASSNA FARSSI",
    "TARIK AMTOUT",
    "ABDELLATIF AALITI",
    "TAOUFIK MOURABIT",
    "NOUREDDIN BOUAYAD",
    "ABDELHAMID CHATT",
    "FOUAD JEBARI",
    "NOUR-EDDINE CHOUAIBI",
    "SOUAD BZIOUI",
    "ABDELHADI AKHARIF",
    "FATIHA CHIBI",
    "KHADIJA ABOUMARIA",
  ],
}

// Données pour les emplois du temps par professeur
const professorTimetables = {
  "FOUAD JEBARI": [
    { day: "Lundi", time: "10:45 - 12:15", module: "Electricité", filiere: "GE-GM", section: "A", room: "Amphi 4" },
    {
      day: "Lundi",
      time: "10:45 - 12:15",
      module: "Electricité",
      filiere: "BCG",
      section: "B",
      room: "Amphi 1",
      semester: "S3",
    },
  ],
  "IKRAM ALAMI": [
    { day: "Samedi", time: "12:30 - 14:00", module: "LC1", filiere: "MIPC", section: "A", room: "Amphi 4" },
    {
      day: "Samedi",
      time: "12:30 - 14:00",
      module: "LC3",
      filiere: "MIPC",
      section: "A",
      room: "Amphi 4",
      semester: "S3",
    },
    {
      day: "Samedi",
      time: "12:30 - 14:00",
      module: "LC3",
      filiere: "MIPC",
      section: "B",
      room: "Amphi 3",
      semester: "S3",
    },
  ],
  "HASSNA FARSSI": [
    { day: "Samedi", time: "12:30 - 14:00", module: "LC1", filiere: "MIP", section: "A", room: "Amphi 3" },
    { day: "Lundi", time: "10:45 - 12:15", module: "LC1", filiere: "BCG", section: "A", room: "Amphi 1" },
    { day: "Lundi", time: "10:45 - 12:15", module: "LC1", filiere: "BCG", section: "B", room: "Amphi 1" },
  ],
}

// Données pour les emplois du temps par salle
const roomTimetables = {
  "Amphi 1": [
    {
      day: "Lundi",
      time: "10:45 - 12:15",
      module: "Mécanique des Solides",
      professor: "ALI DAANOUN",
      filiere: "GE-GM",
      section: "A",
      semester: "S3",
    },
    {
      day: "Lundi",
      time: "10:45 - 12:15",
      module: "Electricité",
      professor: "FATIMA BAHRAOUI",
      filiere: "MIPC",
      section: "A",
      semester: "S1",
    },
    {
      day: "Lundi",
      time: "10:45 - 12:15",
      module: "LC1",
      professor: "HASSNA FARSSI",
      filiere: "BCG",
      section: "A",
      semester: "S1",
    },
    {
      day: "Lundi",
      time: "10:45 - 12:15",
      module: "LC1",
      professor: "HASSNA FARSSI",
      filiere: "BCG",
      section: "B",
      semester: "S1",
    },
    {
      day: "Lundi",
      time: "10:45 - 12:15",
      module: "Electricité",
      professor: "FOUAD JEBARI",
      filiere: "BCG",
      section: "B",
      semester: "S3",
    },
    {
      day: "Jeudi",
      time: "16:00 - 17:30",
      module: "Analyse 1",
      professor: "JAMAL EL AMRANI",
      filiere: "GE-GM",
      section: "A",
      semester: "S1",
    },
  ],
  "Amphi 2": [
    {
      day: "Mercredi",
      time: "14:15 - 15:45",
      module: "Programmation 1",
      professor: "MOHAMED KOUNAIDI",
      filiere: "GE-GM",
      section: "A",
      semester: "S1",
    },
    {
      day: "Mercredi",
      time: "14:15 - 15:45",
      module: "Programmation 2",
      professor: "IKRAM BEN ABDEL OUAHAB",
      filiere: "GE-GM",
      section: "A",
      semester: "S3",
    },
    {
      day: "Vendredi",
      time: "10:45 - 12:15",
      module: "Métrologie / Instrumentation",
      professor: "HICHAM ATABI",
      filiere: "GE-GM",
      section: "A",
      semester: "S3",
    },
    {
      day: "Samedi",
      time: "12:30 - 14:00",
      module: "Gestion",
      professor: "CHAHINAZE FIKRI BENBRAHIM",
      filiere: "GE-GM",
      section: "A",
      semester: "S3",
    },
  ],
}

// Function to get all unique professors from timetable data
const getAllProfessors = () => {
  const professors = new Set()

  // Extract professors from all timetable entries
  Object.values(timetableData).forEach((entries) => {
    entries.forEach((entry) => {
      if (entry.professor) {
        professors.add(entry.professor)
      }
    })
  })

  // Sort alphabetically
  return Array.from(professors).sort()
}

// Fonction pour obtenir l'emploi du temps d'un professeur
const getProfessorTimetable = (professor) => {
  // If we have pre-defined timetable data for this professor, use it
  if (professorTimetables[professor]) {
    return professorTimetables[professor]
  }

  // Otherwise, generate timetable data by searching through all timetable entries
  const timetable = []

  Object.entries(timetableData).forEach(([key, entries]) => {
    // Parse the key to get filiere, section, and semester
    const [filiere, section, semester] = key.split("-")

    entries.forEach((entry) => {
      if (entry.professor === professor) {
        timetable.push({
          ...entry,
          filiere,
          section,
          semester,
        })
      }
    })
  })

  return timetable
}

export default function TimetablesPage() {
  const [regenerating, setRegenerating] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [selectedFiliere, setSelectedFiliere] = useState("gegm")
  const [selectedSection, setSelectedSection] = useState("A")
  const [selectedSemester, setSelectedSemester] = useState("S1")
  const [selectedProfessor, setSelectedProfessor] = useState("")
  const [selectedRoom, setSelectedRoom] = useState("Amphi 1")
  const [generationSuccess, setGenerationSuccess] = useState(false)
  const [currentTimetable, setCurrentTimetable] = useState([])
  const [currentProfessorTimetable, setCurrentProfessorTimetable] = useState([])
  const [currentRoomTimetable, setCurrentRoomTimetable] = useState([])
  const [activeTab, setActiveTab] = useState("filiere")

  // Fonction pour obtenir l'emploi du temps actuel en fonction des sélections
  const getCurrentTimetable = () => {
    const key = `${selectedFiliere}-${selectedSection}-${selectedSemester}`
    return timetableData[key] || []
  }

  // Fonction pour obtenir l'emploi du temps d'un professeur

  // Fonction pour obtenir l'emploi du temps d'une salle
  const getRoomTimetable = (room) => {
    return roomTimetables[room] || []
  }

  // Mettre à jour les emplois du temps lorsque les sélections changent
  useEffect(() => {
    setCurrentTimetable(getCurrentTimetable())
  }, [selectedFiliere, selectedSection, selectedSemester])

  useEffect(() => {
    if (selectedProfessor) {
      setCurrentProfessorTimetable(getProfessorTimetable(selectedProfessor))
    }
  }, [selectedProfessor])

  useEffect(() => {
    if (selectedRoom) {
      setCurrentRoomTimetable(getRoomTimetable(selectedRoom))
    }
  }, [selectedRoom])

  const handleRegenerate = () => {
    setRegenerating(true)
    // Simuler une régénération
    setTimeout(() => {
      setRegenerating(false)
      setCurrentTimetable(getCurrentTimetable())
      setGenerationSuccess(true)
      setTimeout(() => setGenerationSuccess(false), 3000)
    }, 2000)
  }

  const handleExport = () => {
    setExporting(true)
    // Simuler un export
    setTimeout(() => {
      setExporting(false)
      alert("Emploi du temps exporté avec succès !")
    }, 1500)
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
            <Link href="/dashboard/departments" className="text-sm font-medium hover:underline underline-offset-4">
              Filières
            </Link>
            <Link
              href="/dashboard/timetables"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
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
              <h1 className="text-2xl font-bold">Emplois du Temps</h1>
              <p className="text-muted-foreground">Consultez et générez les emplois du temps</p>
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
              <CardTitle>Génération d'Emploi du Temps</CardTitle>
              <CardDescription>
                Sélectionnez une filière, une section et un semestre pour générer un emploi du temps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <div className="space-y-2">
                  <label htmlFor="filiere" className="text-sm font-medium">
                    Filière
                  </label>
                  <Select
                    value={selectedFiliere}
                    onValueChange={(value) => {
                      setSelectedFiliere(value)
                      // Reset section if the new filière doesn't have the current section
                      const filiere = filieres.find((f) => f.id === value)
                      if (filiere && !filiere.sections.includes(selectedSection)) {
                        setSelectedSection(filiere.sections[0])
                      }
                    }}
                  >
                    <SelectTrigger id="filiere">
                      <SelectValue placeholder="Sélectionnez une filière" />
                    </SelectTrigger>
                    <SelectContent>
                      {filieres.map((filiere) => (
                        <SelectItem key={filiere.id} value={filiere.id}>
                          {filiere.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="section" className="text-sm font-medium">
                    Section
                  </label>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger id="section">
                      <SelectValue placeholder="Sélectionnez une section" />
                    </SelectTrigger>
                    <SelectContent>
                      {filieres
                        .find((f) => f.id === selectedFiliere)
                        ?.sections.map((section) => (
                          <SelectItem key={section} value={section}>
                            Section {section}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="semester" className="text-sm font-medium">
                    Semestre
                  </label>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Sélectionnez un semestre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="S1">Semestre 1</SelectItem>
                      <SelectItem value="S3">Semestre 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleRegenerate} disabled={regenerating} className="gap-2">
                  {regenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Génération en cours...
                    </>
                  ) : generationSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      Emploi du temps généré !
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      Générer l'emploi du temps
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="filiere" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="filiere">Par Filière</TabsTrigger>
              <TabsTrigger value="professor">Par Professeur</TabsTrigger>
              <TabsTrigger value="room">Par Salle</TabsTrigger>
            </TabsList>

            <TabsContent value="filiere" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Emploi du Temps - {filieres.find((f) => f.id === selectedFiliere)?.name} - Section {selectedSection}{" "}
                    - {selectedSemester}
                  </CardTitle>
                  <CardDescription>Horaires des cours pour le semestre sélectionné</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1" onClick={() => window.print()}>
                        <Printer className="w-4 h-4" />
                        Imprimer
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1" onClick={handleExport} disabled={exporting}>
                        <Download className="w-4 h-4" />
                        {exporting ? "Exportation..." : "Exporter"}
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted">
                          <th className="p-2 text-left font-medium text-sm">Jour</th>
                          <th className="p-2 text-left font-medium text-sm">Horaire</th>
                          <th className="p-2 text-left font-medium text-sm">Module</th>
                          <th className="p-2 text-left font-medium text-sm">Professeur</th>
                          <th className="p-2 text-left font-medium text-sm">Salle</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTimetable.length > 0 ? (
                          currentTimetable.map((entry, index) => (
                            <tr key={index}>
                              <td className="p-2 text-sm font-medium border-t">{entry.day}</td>
                              <td className="p-2 text-sm border-t">{entry.time}</td>
                              <td className="p-2 text-sm border-t">{entry.module}</td>
                              <td className="p-2 text-sm border-t">{entry.professor}</td>
                              <td className="p-2 text-sm border-t">{entry.room}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="p-4 text-center text-muted-foreground">
                              Aucun emploi du temps disponible pour cette sélection. Veuillez générer un emploi du
                              temps.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professor" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Emploi du Temps par Professeur</CardTitle>
                  <CardDescription>Sélectionnez un professeur pour voir son emploi du temps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="professor" className="text-sm font-medium">
                        Professeur
                      </label>
                      <Select value={selectedProfessor} onValueChange={setSelectedProfessor}>
                        <SelectTrigger id="professor">
                          <SelectValue placeholder="Sélectionnez un professeur" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px] overflow-y-auto">
                          {getAllProfessors().map((professor) => (
                            <SelectItem key={professor} value={professor}>
                              {professor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="border rounded-md overflow-x-auto mt-4">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted">
                            <th className="p-2 text-left font-medium text-sm">Jour</th>
                            <th className="p-2 text-left font-medium text-sm">Horaire</th>
                            <th className="p-2 text-left font-medium text-sm">Module</th>
                            <th className="p-2 text-left font-medium text-sm">Filière</th>
                            <th className="p-2 text-left font-medium text-sm">Salle</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentProfessorTimetable.length > 0 ? (
                            currentProfessorTimetable.map((entry, index) => (
                              <tr key={index}>
                                <td className="p-2 text-sm font-medium border-t">{entry.day}</td>
                                <td className="p-2 text-sm border-t">{entry.time}</td>
                                <td className="p-2 text-sm border-t">{entry.module}</td>
                                <td className="p-2 text-sm border-t">
                                  {entry.filiere} - Section {entry.section}
                                </td>
                                <td className="p-2 text-sm border-t">{entry.room}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                {selectedProfessor
                                  ? "Aucun emploi du temps disponible pour ce professeur."
                                  : "Veuillez sélectionner un professeur pour voir son emploi du temps."}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="room" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Emploi du Temps par Salle</CardTitle>
                  <CardDescription>Sélectionnez une salle pour voir son occupation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="room" className="text-sm font-medium">
                        Salle
                      </label>
                      <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                        <SelectTrigger id="room">
                          <SelectValue placeholder="Sélectionnez une salle" />
                        </SelectTrigger>
                        <SelectContent>
                          {amphis.map((amphi) => (
                            <SelectItem key={amphi} value={amphi}>
                              {amphi}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="border rounded-md overflow-x-auto mt-4">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted">
                            <th className="p-2 text-left font-medium text-sm">Jour</th>
                            <th className="p-2 text-left font-medium text-sm">Horaire</th>
                            <th className="p-2 text-left font-medium text-sm">Module</th>
                            <th className="p-2 text-left font-medium text-sm">Professeur</th>
                            <th className="p-2 text-left font-medium text-sm">Filière</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRoomTimetable.length > 0 ? (
                            currentRoomTimetable.map((entry, index) => (
                              <tr key={index}>
                                <td className="p-2 text-sm font-medium border-t">{entry.day}</td>
                                <td className="p-2 text-sm border-t">{entry.time}</td>
                                <td className="p-2 text-sm border-t">{entry.module}</td>
                                <td className="p-2 text-sm border-t">{entry.professor}</td>
                                <td className="p-2 text-sm border-t">
                                  {entry.filiere} - Section {entry.section}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                Aucun emploi du temps disponible pour cette salle.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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

