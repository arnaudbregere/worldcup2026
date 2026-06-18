export interface Match {
  round: string
  date: string
  time?: string
  team1: string
  team2: string
  group: string
  ground: string
  score?: {
    ft: [number, number]
    ht?: [number, number]
  }
}