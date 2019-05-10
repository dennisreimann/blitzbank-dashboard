<template>
  <main>
    <h1>Tools</h1>

    <NewAddress />

    <NodeConnection />
  </main>
</template>

<script>
import NewAddress from '../sections/NewAddress'
import NodeConnection from '../sections/NodeConnection'

export default {
  components: {
    NewAddress,
    NodeConnection
  }
}
</script>
