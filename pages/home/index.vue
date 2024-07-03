<style>
.bg-home-color{
  border-bottom-left-radius: 90% 80%;
  border-bottom-right-radius: 90% 80%;
}
</style>
<template>
    <div class="bg-primary z-0 h-70 pb-2 bg-home-color">
        <div class="bg-red-500 z-10 h-full bg-home-color">
            <div class="z-20 flex flex-col px-10">
                <!-- header -->
                <div class="flex flex-row pt-5">
                    <div class="flex flex-row items-start flex-1">
                        <div class="w-20 h-20 overflow-hidden border-2 rounded-full mr-4">
                        <NuxtImg
                            :src="imageUser"
                            placeholder="/assets/dummy-profile.png"
                            width="80"
                            height="80"
                            alt="Profile Picture"
                        />
                        </div>
                        <div class="flex flex-col justify-start flex-1">
                            <p class="text-white font-normal text-2xl whitespace-nowrap">{{ greeting }}</p>
                            <p class="text-white font-semibold text-3xl whitespace-nowrap">{{ user.name }}</p>
                            <p class="text-white font-normal text-lg pt-2 pb-10 whitespace-nowrap">{{ user.position }}</p>
                        </div>
                    </div>
                    <div class="flex flex-col justify-start items-end">
                        <p class="text-white">{{ date }}</p>
                        <p class="text-white">{{ time }}</p>
                    </div>
                </div>
                <div class="card bg-base-100  shadow-xl">
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="text-center">Absen Masuk</th>
                                    <th class="text-center">Absen Pulang</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center">{{ attendance }}</td>
                                    <td class="text-center">{{ goHome }}</td>
                                </tr>
                                <tr>
                                    <td class="text-center">
                                        <button 
                                            class="btn text-white" 
                                            :class="disabledAttendance ? 'bg-red-500 disabled' : 'bg-primary'" 
                                            :disabled="disabledAttendance"
                                            >
                                            Datang
                                        </button>
                                    </td>
                                    <td class="text-center">
                                        <button 
                                            class="btn text-white"
                                            :class="disabledGoHome ? 'bg-red-500 disabled' : 'bg-primary'" 
                                            :disabled="disabledGoHome "
                                            >
                                            Pulang
                                        </button>
                                    </td>
                                </tr>
                            </tbody>    
                        </table>    
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const config = useRuntimeConfig()
useHead({
    title: 'Home Presensi Pegawai Indoweb.id',
    link: [
      { rel: 'icon', href: 'https://indoweb.id/wp-content/uploads/2023/09/cropped-fav-Logo-Indoweb-terbaru-32x32.png' },
      { rel: 'icon', href: 'https://indoweb.id/wp-content/uploads/2023/09/cropped-fav-Logo-Indoweb-terbaru-192x192.png', crossorigin: '' },
      { rel: 'apple-touch-icon', href: 'https://indoweb.id/wp-content/uploads/2023/09/cropped-fav-Logo-Indoweb-terbaru-180x180.png' }
    ]
});


const userId = useAuthStore().userId();
const user : DataUserResponse = useAuthStore().dataUser() || {} as DataUserResponse; 
console.log('user', user);
const imageUser = user.photo || '/assets/dummy-profile.png';
const attendance = user.jam_datang || '--:--:--';
const goHome = user.jam_pulang || '--:--:--';
const disabledAttendance = user.jam_datang != '' ? true : false;
const disabledGoHome = user.jam_pulang != '' ? true : false;
console.log('disabledAttendance', disabledAttendance);
console.log('disabledGoHome', disabledGoHome)
const today = new Date();
const greeting = greetingUtils();
const date = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format(today);
const time = ref('--:--:--');


onMounted(() => {
    useAuthStore().fetchUserData(userId);
    setInterval(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        time.value = `${hours}:${minutes}:${seconds}`;
    }, 1000);
});

</script>