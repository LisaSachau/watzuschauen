<template>
    <div>
        <p><input type="file" @change="onFileChange"/></p>
        <p><input type="text" v-model="customFileName" placeholder="Geben Sie einen Dateinamen ein" /></p>
        <button @click="uploadImage">Bild hochladen</button>

        <p v-if="successMsg">{{ successMsg }}</p>
        <p v-if="errorMsg" style="color: red">{{ errorMsg }}</p>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const customFileName = ref("")
const selectedFile = ref(null)
const successMsg = ref("")
const errorMsg = ref("")

// Diese Funktion wird aufgerufen, wenn der Benutzer eine Datei auswählt
function onFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
  } else {
    selectedFile.value = null
  }
}

// Diese Funktion lädt das ausgewählte Bild in den Bucket hoch
async function uploadImage() {
  if (!selectedFile.value) {
    errorMsg.value = "Bitte wählen Sie eine Datei aus."
    return
  }

  const file = selectedFile.value
  const fileName = customFileName.value || file.name

  try {
    // Bild in den 'fotos'-Bucket hochladen
    const { data, error } = await supabase
      .storage
      .from('fotos') // Bucket-Name
      .upload(fileName, file)

    if (error) {
      throw error
    }

    successMsg.value = "Bild erfolgreich hochgeladen!"
    console.log("Hochgeladenes Bild:", data)
  } catch (error) {
    errorMsg.value = `Fehler beim Hochladen: ${error.message}`
  }
}

</script>

<style lang="scss" scoped>

</style>