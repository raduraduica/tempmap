<template>
  <v-container>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot
          :google="google"
          :map="map"
      />
    </template>
  </v-container>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {
  name: "MapView",
  props: {
    mapConfig: Object,
    apiKey: String,
  },
  data: function () {
    return {
      google: null,
      map: null,
    }
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    })
    this.google = googleMapApi
    this.initializeMap()
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap
      this.map = new this.google.maps.Map(
          mapContainer, this.mapConfig
      )
    },
  }
}
</script>

<style scoped>
.google-map {
  width: 100%;
  min-height: 100%;
}
</style>