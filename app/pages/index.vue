<template>
  <section>
    <section class="home_search" aria-label="Recherche par pays">
      <label for="search" class="home_search-label">Rechercher un pays</label>
      <input
        id="search"
        v-model="query"
        type="search"
        placeholder="Ex: France, Brazil..."
        class="home_search-input"
        aria-controls="matches-list"
        :aria-label="`Rechercher un pays, ${filteredMatches.length} résultat(s)`"
      />
    </section>

    <section class="home_matches" aria-label="Matchs récents">
      <h2 class="home_matches-title">
        {{ query ? `Matchs · ${query}` : 'Matchs récents' }}
      </h2>

      <p v-if="pending" role="status" aria-live="polite">Chargement...</p>
      <p v-else-if="error" role="alert" aria-live="assertive">
        ⚠️ Impossible de charger les matchs. Veuillez réessayer plus tard.
      </p>
      <p v-else-if="filteredMatches.length === 0" role="status">
        Aucun match trouvé pour "{{ query }}".
      </p>

      <ul v-else id="matches-list" aria-live="polite">
        <MatchCard
          v-for="match in filteredMatches"
          :key="`${match.date}-${match.team1}-${match.team2}`"
          :match="match"
        />
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import type { Match } from '~/types/matches'

const { data: matches, pending, error } = await useFetch<Match[]>('/api/matches')

const query = ref('')

const filteredMatches = computed(() => {
  if (!matches.value) return []
  if (!query.value.trim()) return matches.value
  const q = query.value.toLowerCase()
  return matches.value.filter(
    m => m.team1.toLowerCase().includes(q) || m.team2.toLowerCase().includes(q)
  )
})

useHead({
  title: 'FIFA World Cup 2026 · Scores & Matchs',
  meta: [
    {
      name: 'description',
      content: 'Suivez les scores et matchs de la Coupe du Monde 2026 au Canada, USA et Mexique.'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SportsEvent',
        name: 'FIFA World Cup 2026',
        location: 'Canada, USA, Mexico',
        startDate: '2026-06-11',
        endDate: '2026-07-19'
      })
    }
  ]
})
</script>

<style lang="scss" scoped>
.home {
  &_search {
    margin-bottom: $spacing-lg;

    &-label {
      display: block;
      font-size: $font-size-sm;
      color: $color-muted;
      margin-bottom: $spacing-xs;
    }

    &-input {
      width: 100%;
      padding: $spacing-sm;
      font-size: $font-size-md;
      border: 2px solid $color-muted;
      border-radius: $radius-md;
      min-height: $min-touch-target;
      transition: border-color 0.2s;

      &:focus-visible {
        outline: $focus-outline;
        border-color: $color-accent;
      }
    }
  }

  &_matches {
    &-title {
      font-size: $font-size-lg;
      color: $color-primary;
      margin-bottom: $spacing-md;
    }
  }
}
</style>