<template>
  <div id="app">
    <img alt="Blitzbank Dashboard" src="./assets/logo.png">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #003366;
  max-width: 600px;
  margin: 0 auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
}

a {
  color: #F39E39;
}

pre {
  text-align: left;
}

#nav a.router-link-exact-active {
  color: #003366;
}
</style>
