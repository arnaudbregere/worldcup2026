interface Match {
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

export default defineCachedEventHandler(
  async (): Promise<Match[]> => {
    const data = await $fetch<string>(
      'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json',
      { responseType: 'text' }
    )
    const json = JSON.parse(data)
    return json.matches?.filter((match: Match) => match.score?.ft).slice(0, 10) ?? []
  },
  { maxAge: 60 * 60 }
)