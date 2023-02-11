<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-white/20">
        <div class="flex items-center justify-center">
            <div class="spin"></div>
        </div>
    </div>
</template>

<style scoped>
.spin {
    display: block;
    height: 40px;
    width: 40px;
    margin: 30px auto;
    border: 3px solid transparent;
    border-radius: 50%;
    border-top-color: #FF8800;
    animation: spin 1s ease infinite;
}

@keyframes spin {
    to {
        transform: rotateZ(360deg)
    }
}
</style>