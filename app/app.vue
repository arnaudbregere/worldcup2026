<template>
  <div>
    <NuxtRouteAnnouncer />
    <main class="home_container">
      <h1 class="home_title">World Cup 2026</h1>
      <NuxtPage />
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
  &_title {
    color: $color-primary;
    font-size: $font-size-xl;
    text-align: center;
  }
}

</style>
