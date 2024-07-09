    <template>
        <div class="w-full relative h-full">
            <MapboxMap
                map-id="{ID}"
                :options="options"
                class="absolute w-full h-full mapbox-container"
            />
            
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

let ID = 'mapbox://styles/mapbox/light-v11';
const user: DataUserResponse = useAuthStore().dataUser() || {} as DataUserResponse;

// Define the initial map options using useState
const options = useState('mapOptions', () => ({
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [0, 0], // starting position [lng, lat]
    zoom: 10 // starting zoom
}));

// Function to set the location
const setLocation = (latitude: number, longitude: number) => {
    options.value.center = [longitude, latitude];
    console.log('options', options.value);
};

// Success callback for geolocation
const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation(latitude, longitude);
};



// Error callback for geolocation
const error = (err) => {
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
