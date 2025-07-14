<template>
    <div class="preloader">
        <img src="/logo.png" alt="Logo" class="logo" />
    </div>
</template>

<style scoped>
.preloader {
    position: fixed;
    inset: 0;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.logo {
    width: 150px;
    height: auto;
    animation: fadeIn 1s ease-in-out;
}
</style>
