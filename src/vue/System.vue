<template>
  <main>
    <h1>Node Information</h1>

    <LndInfo />
    <BtcInfo />
    <SysInfo />
  </main>
</template>

<script>
import BtcInfo from './sections/BtcInfo'
import LndInfo from './sections/LndInfo'
import SysInfo from './sections/SysInfo'

export default {
  components: {
    BtcInfo,
    LndInfo,
    SysInfo
  }
}
</script>
