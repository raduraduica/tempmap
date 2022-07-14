<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-list rounded>
        <v-subheader>LOCATII</v-subheader>
        <v-list-item-group
            color="primary"
        >
          <v-list-item
              v-for="(item, i) in markers"
              :key="i"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.id"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>DIRECTIA REGIONALA DE DRUMURI SI PODURI CRAIOVA</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <map-view
          :mapConfig="mapConfig"
          :apiKey="apiKey"
          class="travel-map"
      >
        <template slot-scope="{ google, map }">
          <GoogleMapMarker
              v-for="marker in markers"
              :key="marker.id"
              :marker="marker"
              :google="google"
              :map="map"
          />
        </template>
      </map-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import MapView from './components/MapView';
import GoogleMapMarker from "./components/GoogleMapMarker";

import { mapSettings } from "@/constants/mapSettings";
let locations = require('/public/locations.json');

export default {
  name: 'App',

  components: {
    MapView,
    GoogleMapMarker
  },
  mounted: function () {
    //this.reloadTemperatures();
    this.interv = setInterval(() => this.reloadTemperatures(), this.timeout);
  },
  data: () => ({
    timeout: 10000,
    drawer: false,
    apiKey: process.env.VUE_APP_GMAP, // 'AIzaSyB33DPW2ZbYhMz90iS6J3fUG-T0OHWfnxI', // google map api key
    openWeatherApiKey: process.env.VUE_APP_OPENWEATHER, //'b27ea89a6bc894e8099332416bb46018', // open weather api key
    markers: locations,
    interv: null
  }),
  methods: {
    reloadTemperatures() {
      for (let index in this.markers) {
        let marker = this.markers[index];

        axios.get('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + marker.position.lat + '&lon=' + marker.position.lng + '&appid=' + this.openWeatherApiKey)
            .then(function (response) {
              let label = marker.marker.getLabel();
              label.text = marker.id + /*'' + response.data.name +*/ ' (' + Math.round(response.data.main.temp) + '°C)';
              //label.text = marker.id + ' (' + marker.temperature + '°C)';
              label.color = '#d85956';
              label.fontSize = '18px';
              marker.marker.setLabel(label);
            });
      }

      clearInterval(this.interv);
      this.interv = setInterval(() => this.reloadTemperatures(), 600000);
    }
  },
  computed: {
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter
      }
    },
    mapCenter() {
      return this.markers[6].position;
    }
  }
};
</script>

<style lang="scss" scoped>
.travel-map {
  height: 100%;
  width: 100%;
}
</style>