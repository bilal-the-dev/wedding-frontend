<template>
    <footer class="bg-gray-100 text-[#1a1a1a] py-12 px-6 md:px-16">
        <div class="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            <!-- Logo + Categories -->
            <div>
                <!-- Logo -->
                <div class="mb-6">
                    <img src="/logo.png" alt="Festivo Logo" class="w-32 h-auto" />
                </div>

                <!-- Categories -->
                <h3 class="font-semibold text-lg mb-2">Categories</h3>
                <ul class="list-disc list-inside space-y-1 text-sm">
                    <li>Social Events</li>
                    <li>Corporate Events</li>
                    <li>Entertainment Events</li>
                    <li>Educational Events</li>
                    <li>Non-Profit Events</li>
                    <li>Sporting Events</li>
                    <li>Cultural & Art Events</li>
                    <li>Religious & Spiritual Events</li>
                    <li>Trade & Industries Events</li>
                    <li>Community & Civic Events</li>
                </ul>
            </div>

            <!-- Social & Address -->
            <div class="text-sm space-y-6">
                <div>
                    <h3 class="font-semibold text-lg mb-2">Follow us on</h3>
                    <div class="flex items-center gap-4 text-xl text-gray-600">
                        <i class="pi pi-instagram hover:text-[#FF5A60] transition"></i>
                        <i class="pi pi-facebook hover:text-[#FF5A60] transition"></i>
                        <i class="pi pi-twitter hover:text-[#FF5A60] transition"></i>
                        <i class="pi pi-pinterest hover:text-[#FF5A60] transition"></i>
                    </div>
                </div>

                <div>
                    <h3 class="font-semibold text-lg mb-1">Address</h3>
                    <p>XYZ,<br />Pakistan - 00000</p>
                </div>
            </div>

            <!-- Contact Form -->
            <div>
                <h3 class="font-semibold text-lg mb-4">Get in Touch</h3>
                <form class="space-y-4 text-sm">
                    <div>
                        <input type="text" placeholder="Name" class="w-full border-b border-gray-400 bg-transparent outline-none py-1 px-2 focus:border-[#FF5A60]" />
                    </div>
                    <div>
                        <input type="email" placeholder="E-mail" class="w-full border-b border-gray-400 bg-transparent outline-none py-1 px-2 focus:border-[#FF5A60]" />
                    </div>
                    <div>
                        <textarea placeholder="Message" rows="3" class="w-full border border-gray-400 bg-transparent outline-none py-1 px-2 focus:border-[#FF5A60]"></textarea>
                    </div>
                    <button type="submit" class="bg-[#FF5A60] hover:bg-[#e34c51] text-white px-5 py-2 rounded-md font-semibold">Submit</button>
                </form>
            </div>
        </div>
    </footer>
</template>

<script setup>
// No logic required unless handling form submission
</script>
