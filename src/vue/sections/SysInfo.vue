<template>
  <section>
    <h2>System</h2>

    <template v-if="info">
      <h4>Overview</h4>
      <AttributeList>
        <Attribute label="External IP">
          <code>{{ info.externalIP }}</code>
        </Attribute>
        <Attribute
          label="Uptime"
          :value="info.uptime"
        />
        <Attribute
          label="Current Time"
          :value="info.time"
        />
      </AttributeList>

      <h4>Disk</h4>
      <AttributeList>
        <Attribute label="Use">
          <Progress
            class="progress"
            :percent="disk.usedPercent"
            :warn-threshold="70"
            :alert-threshold="90"
          />
        </Attribute>
        <Attribute
          label="Used"
          :value="disk.used"
        />
        <Attribute
          label="Free"
          :value="disk.free"
        />
        <Attribute
          label="Total"
          :value="disk.total"
        />
      </AttributeList>

      <h4>Memory</h4>
      <AttributeList>
        <Attribute label="Use">
          <Progress
            class="progress"
            :percent="memory.usedPercent"
            :warn-threshold="85"
            :alert-threshold="92"
          />
        </Attribute>
        <Attribute
          label="Used"
          :value="memory.used"
        />
        <Attribute
          label="Free"
          :value="memory.free"
        />
        <Attribute
          label="Total"
          :value="memory.total"
        />
      </AttributeList>

      <h4>Network</h4>
      <AttributeList>
        <Attribute
          label="Receiving"
          :value="network.rxSec"
        />
        <Attribute
          label="Transmitting"
          :value="network.txSec"
        />
        <Attribute
          label="Received (total)"
          :value="network.rxTotal"
        />
        <Attribute
          label="Transmitted (total)"
          :value="network.txTotal"
        />
      </AttributeList>

      <h4>Operating System</h4>
      <AttributeList>
        <Attribute
          label="Hostname"
          :value="os.hostname"
        />
        <Attribute
          label="Platform"
          :value="os.platform"
        />
        <Attribute
          label="Version"
          :value="os.version"
        />
        <Attribute
          label="Architecture"
          :value="os.architecture"
        />
      </AttributeList>
    </template>
    <Loading v-else />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import AttributeList from '../components/AttributeList'
import Attribute from '../components/Attribute'
import Loading from '../components/Loading'
import Progress from '../components/Progress'

export default {
  components: {
    AttributeList,
    Attribute,
    Loading,
    Progress
  },

  computed: mapState('system', ['os', 'info', 'memory', 'disk', 'network'])
}
</script>

<style scoped>
</style>
