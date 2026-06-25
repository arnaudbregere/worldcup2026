<template>
  <header class="home_header">
    <h1 class="home_header-title">⚽ FIFA World Cup 2026</h1>
    <p class="home_header-subtitle">Canada · USA · Mexico</p>
  </header>
</template>

<style lang="scss" scoped>
.home_header {
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

  @media (min-width: #{$breakpoint-md}) {
    &-title {
      font-size: 3rem;
    }
  }
}
</style>