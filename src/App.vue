<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
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

export default {
  name: 'App',

  components: {
    MapView,
    GoogleMapMarker
  },
  mounted: function () {
    //this.reloadTemperatures();
    setInterval(() => this.reloadTemperatures(), 10000);
  },
  data: () => ({
    drawer: null,
    apiKey: 'AIzaSyB33DPW2ZbYhMz90iS6J3fUG-T0OHWfnxI',
    markers: [
      {
        id: "craiova",
        position: {lat:44.20, lng: 23.80},
        temperature: "22.7",
        marker: null
      },
      {
        id: "bailesti",
        position: { lat: 44.46, lng: 23.56 },
        temperature: "20.4",
        marker: null
      },
      {
        id: "scaiesti",
        position: { lat: 44.52, lng: 23.57 },
        temperature: "21.5",
        marker: null
      },
      {
        id: "isalnita",
        position: { lat: 44.49, lng: 22.93 },
        temperature: "22.3",
        marker: null
      }
    ]
  }),
  methods: {
    reloadTemperatures() {
      for (let index in this.markers) {
        let marker = this.markers[index];
        axios.get('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + marker.position.lat + '&lon=' + marker.position.lng + '&appid=b27ea89a6bc894e8099332416bb46018')
             .then(function (response) {
                let label = marker.marker.getLabel();
                label.text = response.data.main.temp + '';
                marker.marker.setLabel(label);
             });
        // var label = this.markers[index].marker.getLabel();
        // var t = this.getTemperature(this.markers[index]);
        // console.log(t);
        // t;
        // this.markers[index].marker.setLabel(label);
      }
    }/*,
    getTemperature(marker) {
      const promise = 1;
      console.log(promise.data.main);

      /!*if ((marker.position.lat != undefined) && (marker.position.lng != undefined)) {
        const promise = axios.get('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + marker.position.lat + '&lon=' + marker.position.lng + '&appid=b27ea89a6bc894e8099332416bb46018');
        const data = promise.then((response) => response.data);
        console.log(data.promise);
        return data.data.main.temp + ''
      }

      return null;*!/
    }*/
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