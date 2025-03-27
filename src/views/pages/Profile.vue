=
<template>
    <PageHeader title="Your Profile" />
    <div class="bg-gray-900 rounded-lg p-8">
        <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
                <div class="relative">
                    <img :src="`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`" alt="Avatar" class="w-16 h-16 rounded-full" />
                    <span class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div>
                    <h3 class="text-lg font-bold">{{ userData.username }}</h3>
                    <p class="text-gray-500">{{ userData.globalName }}</p>
                </div>
            </div>
            <div>
                <button class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors duration-300" @click="toggleProfileModal">
                    <i class="pi pi-user"></i>
                </button>
            </div>
        </div>

        <div class="mt-8">
            <h2 class="text-xl font-bold mb-4">User Details</h2>
            <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col">
                    <span class="text-gray-400 mb-1">ID</span>
                    <span>{{ userData.id }}</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-gray-400 mb-1">Discriminator</span>
                    <span>{{ userData.discriminator }}</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-gray-400 mb-1">Verified</span>
                    <span>{{ userData.verified ? 'Yes' : 'No' }}</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-gray-400 mb-1">Locale</span>
                    <span>{{ userData.locale }}</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-gray-400 mb-1">Email</span>
                    <span>{{ userData.email }}</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-gray-400 mb-1">MFA Enabled</span>
                    <span>{{ userData.mfaEnabled ? 'Yes' : 'No' }}</span>
                </div>
            </div>
        </div>

        <div class="mt-8">
            <h2 class="text-xl font-bold mb-4">Subscription Details</h2>
            <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col">
                    <span class="text-gray-400 mb-1">Premium Type</span>
                    <span>{{ userData.premiumType === 0 ? 'None' : 'Nitro' }}</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-gray-400 mb-1">Accent Color</span>
                    <span>{{ userData.accent_color }}</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-gray-400 mb-1">Banner Color</span>
                    <span>{{ userData.banner_color }}</span>
                </div>
            </div>
        </div>

        <div v-if="showProfileModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div class="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg" @click.stop>
                <div class="flex items-center space-x-4 mb-4">
                    <img :src="`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`" alt="Avatar" class="w-16 h-16 rounded-full" />
                    <div>
                        <h3 class="text-lg font-bold">{{ userData.username }}</h3>
                        <p class="text-gray-500">{{ userData.globalName }}</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col">
                        <span class="text-gray-400 mb-1">ID</span>
                        <span>{{ userData.id }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-gray-400 mb-1">Discriminator</span>
                        <span>{{ userData.discriminator }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-gray-400 mb-1">Verified</span>
                        <span>{{ userData.verified ? 'Yes' : 'No' }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-gray-400 mb-1">Locale</span>
                        <span>{{ userData.locale }}</span>
                    </div>
                </div>
                <div class="mt-6 flex justify-end">
                    <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300" @click="toggleProfileModal"><i class="pi pi-times"></i> Close</button>
                </div>
            </div>
        </div>

        <div class="mt-8 flex justify-end">
            <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2" @click="logout">
                <i class="pi pi-sign-out"></i>
                <span>Logout</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { logoutFromApp, me } from '../../service/auth.services';

const userData = ref({});
onMounted(async () => {
 const {data} = await me();
userData.value = data;
});

const showProfileModal = ref(false);

function toggleProfileModal() {
    showProfileModal.value = !showProfileModal.value;
}

const router = useRouter();
async function logout() {
    await logoutFromApp();
    localStorage.removeItem('userId');
    router.push('/');
}
</script>
