<template>
    <div class="min-h-[calc(100vh-20vh)]">
        <!-- Navbar -->
        <nav class="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
            <div class="flex items-center space-x-3 ml-4">
        <img src="/images/png/logo.png" alt="Logo" class="h-16 w-16" />
        <h1 class="text-[28px] font-semibold text-gray-200">KillFeed</h1>
      </div>

    <!-- Mobile menu button -->
    <div class="lg:hidden">
      <button @click="toggleMenu" class="text-gray-300 hover:text-white transition">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Menu items for larger screens -->
    <div class="hidden lg:flex items-center gap-10">
      <a href="#status" class="text-gray-300 hover:text-white text-xl font-bold transition">Status</a>
      <a href="#invite" class="text-gray-300 hover:text-white text-xl font-bold transition">Invite</a>
      <a href="#premium" class="flex items-center text-yellow-400 hover:text-yellow-300 text-xl font-bold transition">
        <span class="mr-2">✨</span>
        Premium
      </a>
      <button class="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-xl font-bold" @click="login">Login</button>
    </div>

    <!-- Mobile menu items (hidden by default) -->
    <div v-if="menuOpen" class="lg:hidden absolute top-16 left-0 w-full bg-gray-800 text-white p-4">
      <a href="#status" class="block py-4 px-6 text-lg font-bold hover:bg-gray-700 transition">Status</a>
      <a href="#invite" class="block py-4 px-6 text-lg font-bold hover:bg-gray-700 transition">Invite</a>
      <a href="#premium" class="block py-4 px-6 text-lg font-bold hover:bg-gray-700 transition">Premium</a>
      <button class="block w-full py-4 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-2xl font-bold" @click="login">Login</button>
    </div>
  </nav>

        <!-- Hero Section -->
        <div class="flex flex-col items-center justify-center px-6 mt-40 text-center">
            <img src="/images/png/logo.png" alt="Logo" class="w-32 h-auto mb-6" />
  <h1 class="text-6xl font-bold text-white mb-4">
    DayZ Console Killfeed
    <br />
    like
    <span class="relative inline-block">
      <span class="text-red-500">never</span>
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
    before
  </h1>

  <p class="text-gray-300 max-w-3xl mx-auto mb-6 text-xl">The ultimate Discord bot for real-time killfeeds, raid logs, player tracking, and server management. Stay ahead, stay in control, and dominate DayZ like never before!</p>

  <div class="flex gap-6">
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
        title="Step 1: Place Your Bid"
        description="Ready to get started? It's simple! Just enter your bid amount and hit 'Submit.' Whether you're bidding on a product, service, or exclusive deal, this is the first step to join the action!"
        imageSrc="/demo/images/landing/mockup.svg"
        icon="pi pi-ticket"
        textPosition="right"
        :iconSize="{ fontSize: '2.5rem' }"
    />
    <HomeSection
        title="Step 2: Real-Time Updates"
        description="Once your bid is placed, watch the action unfold in real-time. Get notified whenever someone outbids you, and jump in to stay at the top of the game. It’s fast, it’s fun!"
        imageSrc="/demo/images/landing/mockup-desktop.svg"
        icon="pi pi-clock"
        textPosition="left"
        :iconSize="{ fontSize: '2rem' }"
    />
    <HomeSection
        title="Step 3: Winning Bid"
        description="If you're the highest bidder when time's up, congratulations! You’ll receive a notification that you’ve won, and the next steps for completing the transaction will be provided. It's that easy!"
        imageSrc="/demo/images/landing/screen-1.png"
        icon="pi pi-check"
        textPosition="right"
        :iconSize="{ fontSize: '2rem' }"
    />


    <section class="relative py-24 bg-gray-900 text-white">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl font-semibold mb-8">Frequently Asked Questions</h2>
            <p class="text-lg mb-12">Find answers to the most common questions about our online bidding platform.</p>

            <!-- Accordion Container -->
            <div class="space-y-6">
                <!-- FAQ 1 -->
                <div class="accordion-item">
                    <div class="accordion-header bg-gray-800 shadow-lg rounded-lg p-4 mb-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out" @click="toggle(1)">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xl font-semibold">What is online bidding?</h3>
                            <i :class="isOpen(1) ? 'pi pi-minus' : 'pi pi-plus'" class="text-2xl text-gray-400"></i>
                        </div>
                    </div>
                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div v-if="active === 1" class="accordion-content bg-gray-800 pt-2 border-l-4 border-blue-500 shadow-md rounded-b-lg transition-all duration-500 ease-in-out">
                            <p>
                                Online bidding is a process where participants place bids to purchase items or services. The highest bid wins, and the transaction is completed online. This process ensures transparency and allows for competitive
                                pricing in real-time.
                            </p>
                        </div>
                    </transition>
                </div>

                <!-- FAQ 2 -->
                <div class="accordion-item">
                    <div class="accordion-header bg-gray-800 shadow-lg rounded-lg p-4 mb-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out" @click="toggle(2)">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xl font-semibold">How can I place a bid?</h3>
                            <i :class="isOpen(2) ? 'pi pi-minus' : 'pi pi-plus'" class="text-2xl text-gray-400"></i>
                        </div>
                    </div>
                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div v-if="active === 2" class="accordion-content bg-gray-800 p-6 border-l-4 border-blue-500 shadow-md rounded-b-lg transition-all duration-500 ease-in-out">
                            <p>
                                To place a bid, simply register on the platform, browse the available items, and enter the amount you are willing to pay. Once your bid is placed, it will appear in the auction list. You can monitor the auction in
                                real-time and adjust your bid if necessary.
                            </p>
                        </div>
                    </transition>
                </div>

                <!-- FAQ 3 -->
                <div class="accordion-item">
                    <div class="accordion-header bg-gray-800 shadow-lg rounded-lg p-4 mb-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out" @click="toggle(3)">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xl font-semibold">Can I cancel my bid?</h3>
                            <i :class="isOpen(3) ? 'pi pi-minus' : 'pi pi-plus'" class="text-2xl text-gray-400"></i>
                        </div>
                    </div>
                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div v-if="active === 3" class="accordion-content bg-gray-800 p-6 border-l-4 border-blue-500 shadow-md rounded-b-lg transition-all duration-500 ease-in-out">
                            <p>
                                Once a bid is placed, it cannot be canceled. However, if there is an issue with the item or the auction process, you can reach out to our support team for assistance. We encourage careful consideration before placing a
                                bid.
                            </p>
                        </div>
                    </transition>
                </div>

                <!-- FAQ 4 -->
                <div class="accordion-item">
                    <div class="accordion-header bg-gray-800 shadow-lg rounded-lg p-4 mb-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out" @click="toggle(4)">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xl font-semibold">How do I pay for my winning bid?</h3>
                            <i :class="isOpen(4) ? 'pi pi-minus' : 'pi pi-plus'" class="text-2xl text-gray-400"></i>
                        </div>
                    </div>
                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div v-if="active === 4" class="accordion-content bg-gray-800 p-6 border-l-4 border-blue-500 shadow-md rounded-b-lg transition-all duration-500 ease-in-out">
                            <p>
                                After winning a bid, you will be directed to the payment page, where you can complete the transaction using a variety of payment methods. Payments are securely processed, and you will receive a confirmation email once
                                your payment is successful.
                            </p>
                        </div>
                    </transition>
                </div>

                <!-- FAQ 5 -->
                <div class="accordion-item">
                    <div class="accordion-header bg-gray-800 shadow-lg rounded-lg p-4 mb-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out" @click="toggle(5)">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xl font-semibold">Can I change my bid once placed?</h3>
                            <i :class="isOpen(5) ? 'pi pi-minus' : 'pi pi-plus'" class="text-2xl text-gray-400"></i>
                        </div>
                    </div>
                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div v-if="active === 5" class="accordion-content bg-gray-800 p-6 border-l-4 border-blue-500 shadow-md rounded-b-lg transition-all duration-500 ease-in-out">
                            <p>Yes, you can modify your bid during the auction until the auction ends. Simply place a higher bid, and your previous bid will automatically be replaced. Make sure you are confident before placing a new bid.</p>
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
</style>