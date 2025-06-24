export interface Agenda {
  medicoId: string
  medicoNome: string
  especialidade: string
  horarios: string[]
}

export const agendas: Agenda[] = [
  {
    medicoId: 'm1',
    medicoNome: 'Dra. Ana Silva',
    especialidade: 'Cardiologia',
    horarios: [
      '2025-07-01T09:00:00-03:00',
      '2025-07-01T10:00:00-03:00'
    ]
  },
  {
    medicoId: 'm2',
    medicoNome: 'Dr. João Souza',
    especialidade: 'Dermatologia',
    horarios: [
      '2025-07-02T14:00:00-03:00',
      '2025-07-03T11:00:00-03:00'
    ]
  }
]
