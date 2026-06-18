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
      </section>
    </main>
  </div>
</template>
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

</style>
