<template>
  <div class="parent">
    <div class="left">
      <Directions :directions="wind.directions"/>
      <Speeds :speeds="wind.speeds"/>
    </div>
    <div class="right">
      <Settings />
    </div>
  </div>
</template>

<script>

import Directions from './components/Directions.vue'
import Speeds from './components/Speeds.vue'
import Settings from './components/Settings.vue'

import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    Directions,
    Speeds,
    Settings
  },
  setup() {

    const wind = ref({
      directions: [
        { id: "nw", img: require("@/assets/nw.jpg")},
        { id: "n", img: require("@/assets/n.jpg")},
        { id: "ne", img: require("@/assets/ne.jpg")},
        { id: "e", img: require("@/assets/e.jpg")},
        { id: "se", img: require("@/assets/se.jpg")},
        { id: "s", img: require("@/assets/s.jpg")},
        { id: "sw", img: require("@/assets/sw.jpg")},
        { id: "w", img: require("@/assets/w.jpg")},
      ],
      speeds: [
        { m_s: 0, mph: 0 },
        { m_s: 1, mph: 2 },
        { m_s: 2, mph: 4 },
        { m_s: 3, mph: 6 },
        { m_s: 4, mph: 8 },
        { m_s: 5, mph: 10 },
        { m_s: 6, mph: 12 },
        { m_s: 7, mph: 14 },
        { m_s: 8, mph: 16 },
        { m_s: 9, mph: 18 },
        { m_s: 10, mph: 20 },
      ]
    })

    return {
      wind
    }

  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.parent {
  display: flex;
  flex-flow: row;
}

.left {
  width: 100%;
}

.right: {
  width: 100%;
}


</style>
