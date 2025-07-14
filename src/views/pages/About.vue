<template>
    <div>
        <!-- NavBar remains at top -->
        <div>
            <NavBar />
        </div>

        <!-- About Us Content -->
        <section class="bg-white text-[#333] py-16 px-6">
            <div class="max-w-6xl mx-auto space-y-16">
                <!-- Hero Section -->
                <div class="text-center space-y-6">
                    <h1 class="text-5xl font-extrabold text-[#FF5A60]">About Us</h1>
                    <p class="text-lg max-w-2xl mx-auto">Your one-stop destination to <span class="text-[#FF5A60] font-semibold">discover, book, and manage venues</span> for any event — from weddings to corporate meetups.</p>
                </div>

                <!-- What We Do -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div class="space-y-4">
                        <h2 class="text-3xl font-bold text-[#FF5A60]">What We Offer</h2>
                        <p>From elegant wedding halls to cozy party spaces, we bring you a curated collection of venues available across locations. Browse, compare, and book the right one — effortlessly.</p>
                        <ul class="list-disc pl-5 space-y-2">
                            <li>Weddings, parties, and event venues</li>
                            <li>Photos, reviews, and availability details</li>
                            <li>Instant online booking</li>
                        </ul>
                    </div>
                    <div>
                        <img src="/card-1.png" alt="Venue" class="rounded-xl shadow-lg w-full object-cover" />
                    </div>
                </div>

                <!-- Become a Host -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img src="/card-2.png" alt="Host" class="rounded-xl shadow-lg w-full object-cover" />
                    </div>
                    <div class="space-y-4">
                        <h2 class="text-3xl font-bold text-[#FF5A60]">List Your Venue</h2>
                        <p>Got a space people would love? Turn it into a revenue stream by listing it on our platform. You’ll be able to:</p>
                        <ul class="list-disc pl-5 space-y-2">
                            <li>Create venue listings with images & info</li>
                            <li>Manage availability & bookings</li>
                            <li>Receive direct inquiries from users</li>
                        </ul>
                        <router-link to="/login" class="inline-block mt-4 bg-[#FF5A60] text-white px-6 py-3 rounded-full hover:bg-[#e04850] transition duration-300"> Get Started </router-link>
                    </div>
                </div>

                <!-- Why Choose Us -->
                <div class="bg-[#FFF0F1] p-10 rounded-xl shadow-md space-y-6">
                    <h2 class="text-3xl font-bold text-[#FF5A60] text-center">Why Choose Us?</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <h3 class="font-semibold text-xl text-[#FF5A60] mb-2">Trusted Platform</h3>
                            <p>Verified venues and secure bookings to ensure peace of mind.</p>
                        </div>
                        <div>
                            <h3 class="font-semibold text-xl text-[#FF5A60] mb-2">User Friendly</h3>
                            <p>Clean design, simple forms, and fast search to save your time.</p>
                        </div>
                        <div>
                            <h3 class="font-semibold text-xl text-[#FF5A60] mb-2">All-in-One Solution</h3>
                            <p>Book venues or host your own — all in one place, with one login.</p>
                        </div>
                    </div>
                </div>

                <!-- CTA -->
                <div class="text-center">
                    <router-link to="/venues" class="inline-block bg-[#FF5A60] text-white px-8 py-4 text-lg font-medium rounded-full hover:bg-[#e04850] transition duration-300"> Explore Venues Now </router-link>
                </div>
            </div>
        </section>

        <!-- Footer stays at bottom -->
        <Footer />
    </div>
</template>

<script setup>
// All logic can go here if needed later
</script>

<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
