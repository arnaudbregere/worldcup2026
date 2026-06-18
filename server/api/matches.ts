export default defineCachedEventHandler(
  async () => {
    const data = await $fetch(
      'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json',
      {
        responseType: 'text'
      }
    )

    const json = JSON.parse(data)

    return json.matches
      ?.filter(match => match.score?.ft)
      .slice(0, 10) ?? []
  },
  {
    maxAge: 60 * 60
  }
)