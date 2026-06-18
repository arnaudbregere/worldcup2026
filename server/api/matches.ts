import type { Match } from '~/types/matches'

export default defineCachedEventHandler(
  async (event): Promise<Match[]> => {
    try {
      const data = await $fetch<string>(
        'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json',
        { responseType: 'text' }
      )

      const json = JSON.parse(data)

      if (!json.matches || !Array.isArray(json.matches)) {
        throw createError({ statusCode: 502, message: 'Format de données inattendu' })
      }

      return json.matches.filter((match: Match) => match.score?.ft)

    } catch (err) {
      throw createError({ statusCode: 503, message: 'Service temporairement indisponible' })
    }
  },
  { maxAge: 60 * 60 }
)