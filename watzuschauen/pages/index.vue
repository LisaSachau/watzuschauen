<template>
    <div>
        <div class="">
            <img v-if="imageUrl" :src="imageUrl" alt="klappt">
        </div>
    </div>
</template>

<script setup>
    const supabase = useSupabaseClient()
    const imageUrl = ref("")
    const errorMsg = ref("")
    const successMsg = ref("")
    async function set_fotos() {
        try{
        const { data, error } = await supabase
            .storage
            .from('fotos_natur')
            .getPublicUrl("Fluss_mit_Wolken.jpg")
            if (error) {
                throw error;
            }
            

             else {
                successMsg.value = "Ihre Daten wurden gespeichert";
                imageUrl.value = data.publicUrl
            } 
            } catch (error) {
            console.error('Fehler: ', error.message);
            errorMsg.value = error.message;
        }
    }
    set_fotos()

</script>

<style lang="scss" scoped>

</style>