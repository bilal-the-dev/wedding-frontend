<template>
    <Toast />
    <section class="px-4 md:px-8 lg:px-16 relative z-20">
        <div class="max-w-7xl mx-auto">
            <div class="glass-effect rounded-3xl p-8 md:p-12 mb-8 space-y-8">
                <!-- Venue Name -->
                <div>
                    <label class="block text-lg font-medium mb-2 text-gray-700">Venue Name</label>
                    <InputText v-model="model.venueName" placeholder="Enter your venue name" class="w-full" />
                </div>

                <!-- Categories -->
                <div>
                    <label class="block text-lg font-medium mb-2 text-gray-700">Category</label>
                    <div class="flex flex-wrap gap-3">
                        <button
                            v-for="(cat, index) in categoryOptions"
                            :key="index"
                            @click="toggleItem('categories', cat)"
                            :class="['px-4 py-2 rounded-full border transition', model.categories.includes(cat) ? 'bg-[#FF5A60] text-white border-[#FF5A60]' : 'bg-white text-black border-gray-300 hover:bg-[#FF5A60] hover:text-white']"
                        >
                            {{ cat }}
                        </button>
                    </div>
                </div>

                <!-- Location -->
                <div>
                    <label class="block text-lg font-medium mb-2 text-gray-700">Location</label>
                    <InputText v-model="model.location" placeholder="Enter event location" class="w-full" />
                </div>

                <!-- Charges Per Hour -->
                <div>
                    <label class="block text-lg font-medium mb-2 text-gray-700">Charges per Hour (PKR)</label>
                    <InputNumber v-model="model.charges" mode="currency" currency="PKR" locale="en-PK" class="w-full" />
                </div>

                <!-- Guest Capacity -->
                <div>
                    <label class="block text-lg font-medium mb-2 text-gray-700">Guest Capacity</label>
                    <InputNumber v-model="model.guests" :min="0" placeholder="Enter number of guests" class="w-full" />
                </div>

                <!-- Amenities -->
                <div>
                    <label class="block text-lg font-medium mb-2 text-gray-700">Amenities</label>
                    <div class="flex flex-wrap gap-3">
                        <button
                            v-for="(amenity, index) in amenityOptions"
                            :key="index"
                            @click="toggleItem('amenities', amenity)"
                            :class="['px-4 py-2 rounded-full border transition', model.amenities.includes(amenity) ? 'bg-[#FF5A60] text-white border-[#FF5A60]' : 'bg-white text-black border-gray-300 hover:bg-[#FF5A60] hover:text-white']"
                        >
                            {{ amenity }}
                        </button>
                    </div>
                </div>

                <!-- Phone Number -->
                <div>
                    <label class="block text-lg font-medium mb-2 text-gray-700">Call Now</label>
                    <InputMask v-model="model.phoneNumber" mask="0399-9999999" placeholder="03xx-xxxxxxx" class="w-full" />
                </div>

                <!-- Multiple Image Uploads -->
                <div>
                    <label class="block text-lg font-medium mb-2 text-gray-700">Upload Venue Images</label>
                    <FileUpload mode="advanced" name="venueImages[]" customUpload :auto="false" :multiple="true" accept="image/*" @select="onImageSelect" class="w-full" />
                </div>

                <!-- Description -->
                <div>
                    <label class="block text-lg font-medium mb-2 text-gray-700">Event Description</label>
                    <Textarea v-model="model.description" rows="6" class="w-full" placeholder="Describe your event in detail..." />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import FileUpload from 'primevue/fileupload';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import { nextTick, ref, toRef, watch } from 'vue';

// Props
const props = defineProps({
    modelValue: Object, // eventForm (ref passed down)
    categories: Array,
    amenities: Array
});

const emit = defineEmits(['update:modelValue']);

// Local reactive model
const model = ref({});
let isUpdatingFromParent = false;

// Initialize model with props
if (props.modelValue) {
    model.value = { ...props.modelValue };
}

const categoryOptions = toRef(props, 'categories');
const amenityOptions = toRef(props, 'amenities');

// Watch for changes from parent (props.modelValue)
watch(
    () => props.modelValue,
    (newVal) => {
        if (newVal && !isUpdatingFromParent) {
            isUpdatingFromParent = true;
            model.value = { ...newVal };
            nextTick(() => {
                isUpdatingFromParent = false;
            });
        }
    },
    { deep: true }
);

// Watch for local changes and emit to parent
watch(
    model,
    (newVal) => {
        if (!isUpdatingFromParent) {
            emit('update:modelValue', newVal);
        }
    },
    { deep: true }
);

function toggleItem(key, value) {
    const list = model.value[key];
    const index = list.indexOf(value);
    index === -1 ? list.push(value) : list.splice(index, 1);
}

function onImageSelect(event) {
    model.value.images = [...event.files];
}
</script>

<style scoped>
.glass-effect {
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.luxury-button {
    background: linear-gradient(135deg, #ff5a60 0%, #ff7b80 100%);
    position: relative;
    overflow: hidden;
    transform: perspective(1000px) rotateX(0deg);
    transition: all 0.3s ease;
}

.luxury-button:hover {
    transform: perspective(1000px) rotateX(-5deg);
    box-shadow: 0 15px 35px rgba(255, 90, 96, 0.4);
}

.luxury-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
}

.luxury-button:hover::before {
    left: 100%;
}
</style>
