<script setup>
import { SettingService } from '@/service/SettingsService';
import { updatePreset } from '@primevue/themes';
import { onBeforeMount } from 'vue';

import { useThemeSetting } from '@/layout/composables/theme';
const settingService = SettingService.INSTANCE;
const { primaryColors, surfaces, getPresetExtColor } = useThemeSetting();

const initialPreset = () => {
    const primaryColor = primaryColors.value.find((c) => c.name === settingService.getPrimaryTheme());
    const presetColor = getPresetExtColor(primaryColor);
    console.log(presetColor);
    updatePreset(presetColor);
};

const initialSurface = () => {
    const surfacePalette = surfaces.value.find((s) => s.name === settingService.getSurfaceTheme())?.palette;
    updateSurfacePalette(surfacePalette);
};

onBeforeMount(() => {
    document.documentElement.classList.toggle('app-dark');
    initialSurface();
    initialPreset();
});
</script>

<template>
    <router-view />
</template>

<style scoped></style>
