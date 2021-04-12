import colorPalette from "@/constants/colorPalette";

const {
    COLOR_LANDSCAPE,
    COLOR_BORDERS,
    COLOR_WATER,
    COLOR_LINE,
    COLOR_POINT_FILL,
    COLOR_SELECTED_POINT
} = colorPalette;

const COLORS = {
    BORDERS: COLOR_BORDERS,
    LANDSCAPE: COLOR_LANDSCAPE,
    LINE: COLOR_LINE,
    POINT: COLOR_SELECTED_POINT,
    POINT_FILL: COLOR_POINT_FILL,
    WATER: COLOR_WATER
};

const POINT_MARKER_ICON_CONFIG = {
    //path: "M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
    // path: "M22-48h-44v43h16l6 5 6-5h16z",
    // path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
     path: "M11.462 1c-1.363 0-2.462 1.127-2.462 2.526v42.946c0 1.262 1.231 2.527 2.462 2.527 1.23 0 2.461-1.266 2.461-2.527v-25.894c.841-.367 1.659-.632 2.462-.632 4.923 0 12.185 6.317 17.231 6.317 2.151 0 5.231-.871 7.384-2.527v-17.684c-2.442 1.879-4.916 3.79-7.384 3.79-4.923 0-12.291-6.316-17.231-6.316-.83 0-1.64.152-2.462.316v-.316c0-1.399-1.099-2.526-2.461-2.526z",
    strokeOpacity: 0.7,
    strokeWeight: 2,
    strokeColor: COLORS.POINT,
    fillColor: COLORS.POINT_FILL,
    fillOpacity: 5,
    scale: 0.4,
    // labelOrigin: (-10, -30)
};

const LINE_SYMBOL_CONFIG = {
    path: "M 0,-2 0,2",
    strokeOpacity: 1,
    strokeWeight: 2,
    scale: 1
};

const LINE_PATH_CONFIG = {
    clickable: false,
    geodesic: false,
    strokeOpacity: 1,
    strokeColor: COLORS.LINE,
    icons: [
        {
            icon: LINE_SYMBOL_CONFIG,
            repeat: "10px"
        }
    ]
};

const mapSettings = {
    clickableIcons: true,
    streetViewControl: true,
    panControlOptions: false,
    gestureHandling: "cooperative",
    backgroundColor: COLORS.LANDSCAPE,
    mapTypeControl: false,
    zoomControlOptions: {
        style: "SMALL"
    },
    zoom: 9.7,
    minZoom: 2,
    maxZoom: 100,
    styles: [
        {
            featureType: "landscape",
            stylers: [
               // { hue: COLORS.LANDSCAPE },
               // { saturation: 50.2 },
               // { lightness: -34.8 },
               // { gamma: 1 }
            ]
        },
        {
            featureType: "poi",
            stylers: [{ visibility: "on" }]
        },
        {
            featureType: "road.highway",
            stylers: [
                { hue: COLORS.LANDSCAPE },
                { saturation: -19.8 },
                { lightness: -1.8 },
                { gamma: 1 }
            ]
        },
        {
            featureType: "road.arterial",
            stylers: [
                { hue: COLORS.LANDSCAPE },
                { saturation: 72.4 },
                { lightness: -32.6 },
                { gamma: 1 }
            ]
        },
        {
            featureType: "road.local",
            stylers: [{ visibility: "on" }]
        },
        {
            featureType: "transit",
            stylers: [{ visibility: "on" }]
        },
        {
            featureType: "administrative.province",
            stylers: [{ visibility: "on" }]
        },
        {
            featureType: "administrative.locality",
            stylers: [
                { visibility: "on" },
                { color: COLORS.BORDERS }
            ]
        },
        {
            featureType: "administrative.province",
            stylers: [
                { visibility: "on" },
                { color: COLORS.BORDERS }
            ]
        },
        {
            featureType: "administrative.land_parcel",
            stylers: [{ visibility: "on" }]
        },
        {
            featureType: "administrative.neighborhood",
            stylers: [{ visibility: "on" }]
        },
        {
            featureType: "administrative.country",
            elementType: "geometry.stroke",
            stylers: [{ visibility: "on" }, { color: COLORS.BORDERS }]
        },
        {
            featureType: "administrative",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "water",
            stylers: [
                { hue: COLORS.WATER },
                { saturation: -63.2 },
                { lightness: 38 },
                { gamma: 1 }
            ]
        }
    ]
};

export { mapSettings, LINE_PATH_CONFIG, POINT_MARKER_ICON_CONFIG };
