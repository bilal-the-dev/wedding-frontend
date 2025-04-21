<template>
    <div class="min-h-[calc(100vh-20vh)]">
        <nav class="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto relative  shadow-lg">
  <a href="/" class="flex items-center space-x-4">
    <img src="/images/png/logo.png" alt="Logo" class="h-16 w-16 transition-transform hover:scale-110" />
    <h1 class="hidden sm:block text-2xl font-semibold text-gray-200">DayZ Manager™</h1>
  </a>

  <!-- Mobile menu button -->
  <div class="lg:hidden">
    <button @click="menuOpen = !menuOpen" class="text-gray-300 hover:text-white text-white transition-transform transform hover:scale-110">
      <svg v-if="!menuOpen" class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
      <svg v-else class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>

  <!-- Menu items for larger screens -->
  <div class="hidden lg:flex items-center gap-8">
    <a href="/heatmap" class="text-gray-300 hover:text-white text-lg font-medium transition-all duration-300">Global Heatmap</a>
    <a href="/global/leaderboard" class="text-gray-300 hover:text-white text-lg font-medium transition-all duration-300">Global Leaderboard</a>
    <a href="#invite" class="text-gray-300 hover:text-white text-lg font-medium transition-all duration-300">Invite</a>
    <a href="https://www.patreon.com/TheKillFeed" class="flex items-center text-yellow-400 hover:text-yellow-300 text-lg font-medium transition-all duration-300">
      <span class="mr-2 animate-pulse">✨</span> Premium
    </a>
    <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold" @click="login">Login</button>
  </div>

  <!-- Mobile menu items -->
  <transition name="fade">
    <div v-if="menuOpen" class="lg:hidden fixed inset-0 bg-gray-900  flex flex-col items-center justify-center space-y-6 z-50">
      <button @click="menuOpen = false" class="absolute top-5 right-6 text-gray-300 hover:text-white transition-transform transform hover:scale-110">
        <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <a href="/heatmap" class="text-white text-xl font-semibold hover:text-gray-300 transition-all duration-300">Global Heatmap</a>
      <a href="/global/leaderboard" class="text-gray-300 hover:text-white text-lg font-medium transition-all duration-300">Global Leaderboard</a>
      <a href="#invite" class="text-white text-xl font-semibold hover:text-gray-300 transition-all duration-300">Invite</a>
      <a href="#premium" class="text-yellow-400 text-xl font-semibold hover:text-yellow-300 transition-all duration-300">Premium</a>
      <button class="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-2xl font-semibold" @click="login">Login</button>
    </div>
  </transition>
</nav>

        <!-- Hero Section -->
        <div class="flex flex-col items-center justify-center px-6 mt-40 text-center">
            <img src="/images/png/logo.png" alt="Logo" class="w-32 h-auto mb-6" />
            <div class="text-center px-4">
  <h1 class="text-5xl sm:text-6xl font-bold text-white mb-4">
    Welcome to
    <br />
    <span class="relative inline-block">
      <span class="text-red-500">DayZ Manager™</span>
      
    </span>
  </h1>

  <h2 class="text-xl sm:text-2xl text-gray-300 mb-4">
    Day'Z Newest Server Management Tool
  </h2>

  <p class="text-gray-300 max-w-3xl mx-auto text-md sm:text-lg mb-2">
    Offering a wide variety of Tools that will allow effortless Management of your DayZ Servers! <br />
    Click Below to Get Started
  </p>
</div>


  <div class="flex gap-6 mt-4">
    <button class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center text-lg">
      <span class="mr-2">→</span>
      Get Started
    </button>
    <button class="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition text-lg" @click="login">Dashboard</button>
  </div>
</div>
    </div>

    <section class="relative py-24 overflow-hidden">
        <!-- Sloped background -->
        <div class="absolute inset-0 bg-gray-900 transform -skew-y-3 origin-top-right scale-110"></div>

        <div class="relative z-10 container mx-auto px-4">
            <!-- Header Text -->
            <div class="text-center mb-16">
                <p class="text-gray-400 uppercase tracking-wider mb-3">STATISTICS</p>
                <h2 class="text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto">The numbers don't lie. <br />DayZ Killfeed at a Glance,  Experience the Impact in Numbers!</h2>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <!-- Created Tickets -->
                <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div class="flex justify-center mb-4">
                        <div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-2">Customers</p>
                    <h3 class="text-3xl font-bold text-white">
                        <span v-text="formattedCount.created"></span>
                    </h3>
                </div>

                <!-- Closed Tickets -->
                <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div class="flex justify-center mb-4">
                        <div class="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-2">Total Players Tracked</p>
                    <h3 class="text-3xl font-bold text-white">
                        <span v-text="formattedCount.closed"></span>
                    </h3>
                </div>

                <!-- Active Users -->
                <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div class="flex justify-center mb-4">
                        <div class="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-2">Active Users</p>
                    <h3 class="text-3xl font-bold text-white">
                        <span v-text="formattedCount.users"></span>
                    </h3>
                </div>

                <!-- Servers -->
                <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div class="flex justify-center mb-4">
                        <div class="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                                />
                            </svg>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-2">Servers</p>
                    <h3 class="text-3xl font-bold text-white">
                        <span v-text="formattedCount.servers"></span>
                    </h3>
                </div>
            </div>

            <!-- Call to Action -->
            <div class="text-center mt-16">
                <p class="text-white text-lg">
                    Convinced?
                    <button class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ml-2">Invite</button>
                    Killfield to your Discord now!
                </p>
            </div>
        </div>
    </section>



    <section class="text-center px-8 pt-32">
        <p class="text-gray-400 uppercase tracking-wider mb-3">Features</p>
        <h2 class="text-7xl font-bold mb-24 text-white">
            How It
            <span class="relative inline-block">
                <span class="text-blue-400">Works</span>
                <span
                    class="absolute bottom-0 left-0 w-full"
                    :style="{
                        height: '2px',
                        background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%)',
                        transform: 'rotate(-2deg)',
                        transformOrigin: 'left bottom'
                    }"
                />
                <span
                    class="absolute bottom-0 left-0 w-full"
                    :style="{
                        height: '1px',
                        background: 'linear-gradient(90deg, #93c5fd 0%, #bfdbfe 50%, #93c5fd 100%)',
                        transform: 'rotate(-2deg) translateY(2px)',
                        transformOrigin: 'left bottom',
                        opacity: 0.7
                    }"
                />
            </span>
        </h2>
    </section>
    <HomeSection
        title="Step 1: Log In Through the Dashboard"
        description="To get started, log in with your Discord account through the dashboard. Once you're in, simply select the service you want to manage.
From there, you’ll gain full access to your personalized dashboard where you can view live stats, track performance, and stay in control of all your services."
        imageSrc="/demo/images/landing/mockup.svg"
        icon="pi pi-ticket"
        textPosition="right"
        :iconSize="{ fontSize: '2.5rem' }"
    />
    <HomeSection
        title="Manage Your Economy in Real-Time"
        description="Once inside the dashboard, you’re in control.
Track log placements, monitor your in-game economy, and manage vital stats — all in real-time.
Whether it's adjusting service data or keeping tabs on key metrics, the dashboard keeps you in sync and ahead of the game.
"
        imageSrc="/demo/images/landing/mockup-desktop.svg"
        icon="pi pi-clock"
        textPosition="left"
        :iconSize="{ fontSize: '2rem' }"
    />
    <HomeSection
        title="Track Your Dominance"
        description="You're all set — now it’s time to watch your services rise.
View leaderboards with detailed stats like most kills, most deaths, and K/D ratios for each of your services.

But it doesn’t stop there — you can also compare with other competing services, tracking their stats and staying ahead of the game.

Plus, dive into game server settings to tweak features like the DayZ map and more — giving you full control, all from your dashboard."
        imageSrc="/demo/images/landing/screen-1.png"
        icon="pi pi-check"
        textPosition="right"
        :iconSize="{ fontSize: '2rem' }"
    />

    <section class="relative py-24 bg-gray-900 text-white">
    <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-semibold mb-8">Frequently Asked Questions</h2>
        <p class="text-lg mb-12">Everything you need to know about using DayZ Manager™ to run your server like a pro.</p>

        <div class="space-y-6">
            <!-- FAQ 1 -->
            <div class="accordion-item">
                <div class="accordion-header bg-gray-800 shadow-lg rounded-lg p-4 mb-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out" @click="toggle(1)">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-semibold">What is DayZ Manager™?</h3>
                        <i :class="isOpen(1) ? 'pi pi-minus' : 'pi pi-plus'" class="text-2xl text-gray-400"></i>
                    </div>
                </div>
                <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <div v-if="active === 1" class="accordion-content bg-gray-800 pt-2 border-l-4 border-blue-500 shadow-md rounded-b-lg">
                        <p>
                            DayZ Manager™ is a powerful tool that lets you manage every aspect of your DayZ server — from viewing killfeeds and leaderboard stats to customizing your server's map and economy. It’s the ultimate toolkit for serious server owners.
                        </p>
                    </div>
                </transition>
            </div>

            <!-- FAQ 2 -->
            <div class="accordion-item">
                <div class="accordion-header bg-gray-800 shadow-lg rounded-lg p-4 mb-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out" @click="toggle(2)">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-semibold">How do I get started?</h3>
                        <i :class="isOpen(2) ? 'pi pi-minus' : 'pi pi-plus'" class="text-2xl text-gray-400"></i>
                    </div>
                </div>
                <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <div v-if="active === 2" class="accordion-content bg-gray-800 p-6 border-l-4 border-blue-500 shadow-md rounded-b-lg">
                        <p>
                            Simply log in through your Discord account. After logging in, select the server you want to manage. You’ll be redirected to your personalized dashboard where you can monitor kills, economy, server settings, and much more.
                        </p>
                    </div>
                </transition>
            </div>

            <!-- FAQ 3 -->
            <div class="accordion-item">
                <div class="accordion-header bg-gray-800 shadow-lg rounded-lg p-4 mb-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out" @click="toggle(3)">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-semibold">What can I see in the leaderboard?</h3>
                        <i :class="isOpen(3) ? 'pi pi-minus' : 'pi pi-plus'" class="text-2xl text-gray-400"></i>
                    </div>
                </div>
                <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <div v-if="active === 3" class="accordion-content bg-gray-800 p-6 border-l-4 border-blue-500 shadow-md rounded-b-lg">
                        <p>
                            The leaderboard displays real-time stats like top kills, most deaths, K/D ratios, and more — for both your services and others. Stay ahead by analyzing competitive data from other active DayZ services.
                        </p>
                    </div>
                </transition>
            </div>

            <!-- FAQ 4 -->
            <div class="accordion-item">
                <div class="accordion-header bg-gray-800 shadow-lg rounded-lg p-4 mb-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out" @click="toggle(4)">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-semibold">Can I manage the in-game economy?</h3>
                        <i :class="isOpen(4) ? 'pi pi-minus' : 'pi pi-plus'" class="text-2xl text-gray-400"></i>
                    </div>
                </div>
                <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <div v-if="active === 4" class="accordion-content bg-gray-800 p-6 border-l-4 border-blue-500 shadow-md rounded-b-lg">
                        <p>
                            Yes — through the dashboard, you can set up and control logs, item placements, shop pricing, and currency systems. Every change updates instantly, so you always stay in control of your server’s economy.
                        </p>
                    </div>
                </transition>
            </div>

            <!-- FAQ 5 -->
            <div class="accordion-item">
                <div class="accordion-header bg-gray-800 shadow-lg rounded-lg p-4 mb-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out" @click="toggle(5)">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-semibold">Can I change my server map and settings?</h3>
                        <i :class="isOpen(5) ? 'pi pi-minus' : 'pi pi-plus'" class="text-2xl text-gray-400"></i>
                    </div>
                </div>
                <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <div v-if="active === 5" class="accordion-content bg-gray-800 p-6 border-l-4 border-blue-500 shadow-md rounded-b-lg">
                        <p>
                            Absolutely. You can switch DayZ maps, adjust server restarts, change loot spawns, and more — all from within your dashboard. No file editing, no server restarts needed.
                        </p>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</section>


    <section class="py-16  text-white text-center">
  <h2 class="text-4xl font-bold mb-6">Follow Us On</h2>
  
  <!-- Social Media Icons -->
  <div class="flex justify-center gap-6">
    <!-- Discord Icon -->
    <a href="your-discord-link-here" target="_blank" class="text-3xl hover:text-blue-600 transition duration-300">
      <i class="fab fa-discord"></i>
    </a>

    <!-- X (Twitter) Icon -->
    <a href="your-x-link-here" target="_blank" class="text-3xl hover:text-blue-400 transition duration-300">
  <i class="fab fa-twitter"></i> <!-- Correct Font Awesome Twitter Icon -->
</a>


    <!-- Facebook Icon -->
    <a href="your-facebook-link-here" target="_blank" class="text-3xl hover:text-blue-600 transition duration-300">
      <i class="fab fa-facebook"></i>
    </a>

    <!-- Instagram Icon (example) -->
    <a href="your-instagram-link-here" target="_blank" class="text-3xl hover:text-pink-600 transition duration-300">
      <i class="fab fa-instagram"></i>
    </a>

    <!-- Add More Socials as needed -->
  </div>
</section>



</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import HomeSection from '../../../components/HomeSection.vue';

const active = ref(null);
const menuOpen = ref(false);
// Toggle the active state for the accordion items
const toggle = (index) => {
    if (active.value === index) {
        active.value = null;
    } else {
        active.value = index;
    }
};

// Check if the accordion item is open
const isOpen = (index) => active.value === index;

// Before entering the transition, ensure smooth animation
const beforeEnter = (el) => {
    el.style.maxHeight = '0';
};

// During the transition, smoothly expand the content
const enter = (el) => {
    el.offsetHeight; // Trigger reflow
    el.style.transition = 'max-height 0.5s ease-in-out';
    el.style.maxHeight = el.scrollHeight + 'px';
};

// On leave, collapse the content
const leave = (el) => {
    el.style.transition = 'max-height 0.3s ease-in-out';
    el.style.maxHeight = '0';
};
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
const targetNumbers = {
    created: 2288587,
    closed: 2178093,
    users: 12433525,
    servers: 48723
};

const currentCount = ref({
    created: 0,
    closed: 0,
    users: 0,
    servers: 0
});

const formattedCount = computed(() => ({
    created: currentCount.value.created.toLocaleString(),
    closed: currentCount.value.closed.toLocaleString(),
    users: currentCount.value.users.toLocaleString(),
    servers: currentCount.value.servers.toLocaleString()
}));

const animateNumber = (key, target) => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        currentCount.value[key] = Math.floor(current);
    }, duration / steps);
};

onMounted(() => {
    Object.entries(targetNumbers).forEach(([key, value]) => {
        animateNumber(key, value);
    });
});
const AUTH_URL = import.meta.env.VITE_APP_REDIRECT_URL;
const login = () => {
    console.log('Logging in with Discord...');
    console.log(AUTH_URL);
    window.location.href = AUTH_URL;
};
</script>

<style scoped>
/* Transition effect for smooth accordion expansion */
.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>