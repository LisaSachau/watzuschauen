<template>
    <div class="flex flex-col items-center justify-center space-y-4">
        <p class="font-bold">User Dashboard</p>
        <div>
            <NuxtLink to="/intern/bearbeiten" class="bg-amber-200 rounded hover:bg-amber-500 border-2 border-amber-400 shadow">Bilder hinzufügen</NuxtLink>
       </div>
       <div class="space-x-10">
        <button @click="selectBucketHome" class="bg-green-200 rounded hover:bg-green-500 border-2 border-green-400 shadow" :class="bucket === 'fotos_homepage' ? 'bg-green-600' : 'bg-green-200'">Home-Ordner</button>
        <button @click="selectBucketNatur" class="bg-green-200 rounded hover:bg-green-500 border-2 border-green-400 shadow"  :class="bucket === 'fotos_natur' ? 'bg-green-600' : 'bg-green-200'">Natur-Ordner</button>
        <button @click="selectBucketDenkmal" class="bg-green-200 rounded hover:bg-green-500 border-2 border-green-400 shadow" :class="bucket === 'fotos_denkmal' ? 'bg-green-600' : 'bg-green-200'">Denkmal-Ordner</button>
       </div>
       <div>
        <button @click="showfotos"  class="bg-blue-200 rounded hover:bg-blue-500 border-2 border-blue-400 shadow" :class="files != '' ? 'bg-blue-600' : 'bg-blue-200'">alle Bilder anzeigen</button>
        </div>
        <div v-if="bucket === ''">
          <p>Wähle einen Ordner aus, um Bilder anzuzeigen!</p>
        </div>
        <div class="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="file in files" :key="file.name">
            <img :src="file.publicUrl">
           </div>
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
const bucket = ref("")

function selectBucketHome() {
  if (bucket.value != "fotos_homepage") {
    bucket.value = "fotos_homepage"
  } else {
    bucket.value = ""
    files.value = []
  }
}
function selectBucketNatur() {
  if (bucket.value != "fotos_natur") {
    bucket.value = "fotos_natur"
    console.log(bucket.value)
  } else {
    bucket.value = ""
    files.value = []
  }
}
function selectBucketDenkmal() {
  if (bucket.value != "fotos_denkmal") {
    bucket.value = "fotos_denkmal"
  } else {
    bucket.value = ""
    files.value = []
  }
}

async function getfotos() {
  if (bucket.value != "")
    {
    try {
    // Abfrage der Dateien im 'fotos'-Bucket
    const { data, error } = await supabase
      .storage
      .from(bucket.value) // Bucket-Name
      .list('', {limit: 100}) // Leerstring für alle Dateien, optional limit

    if (error) {
      throw error
    }
    files.value = data // Setze die Dateinamen in die files-Variable
    console.log(files.value)
  } catch (error) {
    errorMsg.value = `Fehler beim Abrufen der Dateinamen: ${error.message}`
    console.log(errorMsg.value)
  }  
  }
  
}


async function showfotos() {
  if (bucket.value != "")
  await getfotos(); 
  {
    try {
    // Erzeuge ein Array von Promises für die öffentlichen URLs
    const publicUrls = await Promise.all(files.value.map(async (file) => {
      const { data, error } = await supabase
        .storage
        .from(bucket.value)
        .getPublicUrl(file.name); // Hole die öffentliche URL für jede Datei
        console.log(file.name)
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
  } catch (error) {
    errorMsg.value = `Fehler beim Abrufen der öffentlichen URLs: ${error.message}`;
  }
  }

}

</script>

<style lang="scss" scoped>

</style>