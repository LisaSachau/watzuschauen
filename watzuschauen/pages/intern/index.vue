<template>
    <div>
        <p>User Dashboard</p>
        <div>
            <NuxtLink to="/intern/bearbeiten">Bilder hinzufügen</NuxtLink>
       </div>
       <div>
        <button @click="showfotos">alle Bilder anzeigen</button>
        <ul>
            <li v-for="file in files" :key="file.name">
                <img :src="file.publicUrl">
            </li>
        </ul>
       </div>
       <p v-if="errorMsg" class="text-red-500"> {{ errorMsg }}</p>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})

const supabase = useSupabaseClient()
const files = ref([]) // Array für Dateinamen
const errorMsg = ref("") // Fehlernachricht

async function getfotos() {
  try {
    // Abfrage der Dateien im 'fotos'-Bucket
    const { data, error } = await supabase
      .storage
      .from('fotos') // Bucket-Name
      .list('', {limit: 100}) // Leerstring für alle Dateien, optional limit

    if (error) {
      throw error
    }
    console.log(data)

    files.value = data // Setze die Dateinamen in die files-Variable
    console.log(files.value)
  } catch (error) {
    console.error('Fehler:', error.message)
    errorMsg.value = `Fehler beim Abrufen der Dateinamen: ${error.message}`
  }
}
getfotos()

async function showfotos() {
  try {
    // Erzeuge ein Array von Promises für die öffentlichen URLs
    const publicUrls = await Promise.all(files.value.map(async (file) => {
      const { data, error } = await supabase
        .storage
        .from('fotos')
        .getPublicUrl(file.name); // Hole die öffentliche URL für jede Datei

      if (error) {
        throw error;
      }
      
      return {
        name: file.name,
        publicUrl: data.publicUrl, // Speichere die öffentliche URL
      };
    }));

    // Setze die öffentlichen URLs in die files-Variable
    files.value = publicUrls;
    console.log(files.value); // Ausgabe der Dateien mit URLs
  } catch (error) {
    console.error('Fehler beim Abrufen der öffentlichen URLs:', error.message);
    errorMsg.value = `Fehler beim Abrufen der öffentlichen URLs: ${error.message}`;
  }
}

</script>

<style lang="scss" scoped>

</style>