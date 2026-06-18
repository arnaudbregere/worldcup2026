
import type { Match } from '~/types/matches'
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