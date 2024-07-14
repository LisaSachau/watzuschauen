<template>
    <div>
        <header class="p-4 bg-gradient-to-r from-amber-700/50 from-10% via-emerald-700/50 via-30% to-rose-900/50 to-90%">
            <Navbar/>
        </header>
        <div class="pt-4 pb-4 bg-emerald-50">
        <slot>
        </slot>
        </div>
        <footer class="p-4 bg-gradient-to-r from-amber-700/50 from-10% via-emerald-700/50 via-30% to-rose-900/50 to-90%">
            <Footerbar/>
        </footer>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>