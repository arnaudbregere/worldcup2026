<template>
  <div>
    <NuxtRouteAnnouncer />

      <header class="home_header">
      <h1 class="home_header-title">⚽ FIFA World Cup 2026</h1>
      <p class="home_header-subtitle">Canada · USA · Mexico</p>
    </header>
    <NuxtPage />
    <main class="home_container">
      <section class="home_matches" aria-label="Matchs récents">
        <h2 class="home_matches-title">Matchs</h2>
        <p v-if="pending">Chargement...</p>
        <p v-else-if="error">Erreur de chargement.</p>
        <ul v-else>
          <li
            v-for="match in matches"
            :key="`${match.date}-${match.team1}-${match.team2}`"
            class="match-card"
          >
            <span class="match-card__teams">
              {{ match.team1 }} vs {{ match.team2 }}
            </span>
             <span class="match-card__score">
              {{ getScore(match) }}
            </span>
            <span class="match-card__info">
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
const { data: matches, pending, error } = await useFetch('/api/matches')

const getScore = (match: Match): string => {
  if (!match.score) return 'À venir'

  return `${match.score.ft[0]} - ${match.score.ft[1]}`
}
</script>
<style lang="scss" scoped>
.home {
  &_container {
    max-width: $main-container;
    margin: 0 auto;
    padding: $spacing-lg;
      min-height: 100vh;
  }
  &_header {
    margin-bottom: $spacing-lg;
    &-title {
      color: $color-primary;
      font-size: $font-size-xl;
      text-align: center;
  }
    &-subtitle {
      color: $color-muted;
      font-size: $font-size-lg;
      text-align: center;
    }
  }
  &-matches {
    &-title {
      font-size: $font-size-lg;
      margin-bottom: $spacing-md;
    }
  }

}
.match-card {
  background: $color-card;
  border-radius: $radius-md;
  padding: $spacing-sm;
  margin-bottom: $spacing-xs;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &__teams {
    font-weight: 600;
    color: $color-primary;
  }

  &__info {
    font-size: $font-size-sm;
    color: $color-muted;
  }
}

</style>
