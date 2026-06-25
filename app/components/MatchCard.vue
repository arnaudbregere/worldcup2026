<template>
  <li
    class="match-card"
    :aria-label="`${match.team1} contre ${match.team2}, score : ${score}, ${match.group}, ${match.ground}`"
  >
    <div class="match-card__top">
      <span class="match-card__teams" aria-hidden="true">
        {{ match.team1 }} vs {{ match.team2 }}
      </span>
      <span class="match-card__score" aria-hidden="true">
        {{ score }}
      </span>
    </div>
    <span class="match-card__info" aria-hidden="true">
      {{ match.group }} · {{ match.ground }}
    </span>
  </li>
</template>

<script setup lang="ts">
import type { Match } from '~/types/matches'

const props = defineProps<{
  match: Match
}>()

const score = computed((): string => {
  if (!props.match.score) return 'À venir'
  return `${props.match.score.ft[0]} - ${props.match.score.ft[1]}`
})
</script>

<style lang="scss" scoped>
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
  .match-card {
    padding: $spacing-md;
  }
}
</style>