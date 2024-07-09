<template>
    <div class="w-full relative h-full">
        <MapboxMap
            v-if="loadMap"
            map-id="{ID}"
            :options="options"
            class="absolute w-full h-full mapbox-container"
        />

        <div class="absolute top-0 left-0 right-0 bg-white p-4">
            <p class="text-center text-lg font-semibold">Lokasi Pegawai Indoweb.id</p>
            <p>{{ options }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useState } from '#app';
useHead({
    title: 'Lokasi Pegawai Indoweb.id',
    link: [
    { rel: 'icon', href: 'https://indoweb.id/wp-content/uploads/2023/09/cropped-fav-Logo-Indoweb-terbaru-32x32.png' },
    { rel: 'icon', href: 'https://indoweb.id/wp-content/uploads/2023/09/cropped-fav-Logo-Indoweb-terbaru-192x192.png', crossorigin: '' },
    { rel: 'apple-touch-icon', href: 'https://indoweb.id/wp-content/uploads/2023/09/cropped-fav-Logo-Indoweb-terbaru-180x180.png' }
    ]
});

// Define the map style
let ID = 'mapbox://styles/mapbox/light-v11';
const user: DataUserResponse = useAuthStore().dataUser() || {} as DataUserResponse;
let loadMap = useState('loadMap', () => false);

// Define the initial map options using useState
let options = useState('mapOptions', () => ({
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [0, 0], // starting position [lng, lat]
    zoom: 10 // starting zoom
}));


// Function to set the location
const setLocation = (latitude: number, longitude: number) => {
    options.value.center = [longitude, latitude];
    loadMap.value = true;
};

// Success callback for geolocation
const success = (position : any) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation(latitude, longitude);
};

// Error callback for geolocation
const error = (err : any) => {
    console.error(`ERROR(${err.code}): ${err.message}`);
};

// On component mount, get the user's geolocation
onMounted(() => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
});
</script>
