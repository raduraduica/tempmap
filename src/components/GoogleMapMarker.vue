<script>
import { POINT_MARKER_ICON_CONFIG } from "@/constants/mapSettings";

export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    }
  },

  mounted() {
    const { Marker } = this.google.maps;

    this.marker.marker = new Marker({
      position: this.marker.position,
      marker: this.marker,
      map: this.map,
      icon: POINT_MARKER_ICON_CONFIG,
      label: {text: this.marker.temperature, color: "rgb(77,109,155)", fontSize: "16px", fontWeight:'bold'},
    });
  },

  render() {
    return null;
  }
};
</script>
