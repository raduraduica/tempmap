<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-list rounded>
        <v-subheader>LOCATII</v-subheader>
        <v-list-item-group
            v-model="selectedItem"
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

      <v-toolbar-title>Temperaturi Judetul Dolj</v-toolbar-title>
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
    setInterval(() => this.reloadTemperatures(), 10000); // reload every 10 mins
  },
  data: () => ({
    drawer: true,
    apiKey: 'AIzaSyB33DPW2ZbYhMz90iS6J3fUG-T0OHWfnxI', // google map api key
    openWeatherApiKey: 'b27ea89a6bc894e8099332416bb46018', // open weather api key
    markers: locations
  }),
  methods: {
    reloadTemperatures() {
      for (let index in this.markers) {
        let marker = this.markers[index];
        axios.get('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + marker.position.lat + '&lon=' + marker.position.lng + '&appid=' + this.openWeatherApiKey )
             .then(function (response) {
                let label = marker.marker.getLabel();
                label.text = response.data.main.temp + '';
                marker.marker.setLabel(label);
             });
      }
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
      return this.markers[0].position;
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