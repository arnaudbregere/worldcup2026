<template>
  <div>
    <NuxtRouteAnnouncer />
    <header class="home_header">
      <h1 class="home_header-title">⚽ FIFA World Cup 2026</h1>
      <p class="home_header-subtitle">Canada · USA · Mexico</p>
    </header>

    <main class="home_container">

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
          <li
            v-for="match in filteredMatches"
            :key="`${match.date}-${match.team1}-${match.team2}`"
            class="match-card"
            :aria-label="`${match.team1} contre ${match.team2}, score : ${getScore(match)}, ${match.group}, ${match.ground}`"
          >
            <div class="match-card__top">
              <span class="match-card__teams" aria-hidden="true">
                {{ match.team1 }} vs {{ match.team2 }}
              </span>
              <span class="match-card__score" aria-hidden="true">
                {{ getScore(match) }}
              </span>
            </div>
            <span class="match-card__info" aria-hidden="true">
              {{ match.group }} · {{ match.ground }}
            </span>
          </li>
        </ul>
      </section>
    </main>
  </div>
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

const getScore = (match: Match): string => {
  if (!match.score) return 'À venir'
  return `${match.score.ft[0]} - ${match.score.ft[1]}`
}

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
// TODO : exporter dans _home.scss et _match-card.scss
.home {
  &_container {
    max-width: $main-container;
    margin: 0 auto;
    padding: $spacing-lg;
    min-height: 100vh;
  }

  &_header {
    text-align: center;
    padding: $spacing-lg;
    background: linear-gradient(135deg, $color-primary, $color-accent);
    color: $color-white;
    margin-bottom: $spacing-lg;

    &-title {
      font-size: $font-size-xl;
      margin-bottom: $spacing-xs;
    }

    &-subtitle {
      font-size: $font-size-lg;
      opacity: 0.85;
    }
  }

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

.match-card {
  background: $color-card;
  border-radius: $radius-md;
  padding: $spacing-sm;
  margin-bottom: $spacing-xs;
  border-left: 4px solid $color-accent;
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-xs;
  }

  &__teams {
    font-weight: 600;
    color: $color-primary;
    flex: 1;
  }

  &__score {
    font-weight: 700;
    color: $color-accent;
    white-space: nowrap;
  }

  &__info {
    font-size: $font-size-sm;
    color: $color-muted;
  }
}

@media (min-width: #{$breakpoint-md}) {
  .home {
    &_container {
      padding: $spacing-xl;
    }

    &_header {
      &-title {
        font-size: 3rem;
      }
    }
  }

  .match-card {
    padding: $spacing-md;
  }
}
</style>