<template>
  <div>
    <!-- Buttons zum Auswählen der richtigen Upload-Oberfläche -->
    <div class="flex justify-center">
      <span class="space-x-10 p-4">
        <NuxtLink to="/intern/" class="bg-amber-200 rounded hover:bg-amber-500 border-2 border-amber-400 shadow">Zurück</NuxtLink>
        <button @click="selectModeHome" class="bg-green-200 rounded hover:bg-green-500 border-2 border-green-400 shadow" :class="mode === 'home' ? 'bg-green-600' : 'bg-green-200'">Home-Page</button>
        <button @click="selectModeNatur" class="bg-green-200 rounded hover:bg-green-500 border-2 border-green-400 shadow" :class="mode === 'natur' ? 'bg-green-600' : 'bg-green-200'">Natur-Page</button>
        <button @click="selectModeDenkmal" class="bg-green-200 rounded hover:bg-green-500 border-2 border-green-400 shadow" :class="mode === 'denkmal' ? 'bg-green-600' : 'bg-green-200'">Denkmal-Page</button></span>
    </div>
    <div class="flex justify-center">
    <div v-show="mode === ''" class="p-4 space-y-2">
      <p>Bitte wähle einen Ordner aus, zu dem du ein Bild hinzufügen möchtest!</p>
    </div>
    </div>
    <!-- Fotos in den Home-Bucket hochladen -->
    <div class="flex justify-center">
      <div v-show="mode === 'home'" class="p-4 space-y-2 ">
      <p class="font-bold">In den Ordner Home hinzufügen:</p>
        <p><input type="file" @change="onFileChange"/></p>
        <p><input type="text" v-model="customFileName" placeholder="Geben Sie einen Dateinamen ein" class="w-64 p-2 border rounded border-gray-300 hover:border-blue-500 hover:bg-blue-50" /></p>
        <button @click="uploadToHome" class="bg-blue-200 rounded hover:bg-blue-500 border-2 border-blue-400 shadow">Bild hochladen</button>

        <p v-if="successMsg">{{ successMsg }}</p>
        <p v-if="errorMsg" style="color: red">{{ errorMsg }}</p>
    </div>
    </div>

    <!-- Fotos in den Natur-Bucket hochladen -->
    <div class="flex justify-center">
    <div v-show="mode === 'natur'" class="p-4 space-y-2">
      <p class="font-bold">In den Ordner Natur hinzufügen:</p>
        <p><input type="file" @change="onFileChange"/></p>
        <p><input type="text" v-model="customFileName" placeholder="Geben Sie einen Dateinamen ein" class="w-64 p-2 border rounded border-gray-300 hover:border-blue-500 hover:bg-blue-50" /></p>
        <button @click="uploadToNatur" class="bg-blue-200 rounded hover:bg-blue-500 border-2 border-blue-400 shadow">Bild hochladen</button>

        <p v-if="successMsg">{{ successMsg }}</p>
        <p v-if="errorMsg" style="color: red">{{ errorMsg }}</p>
    </div>
    </div>
    <!-- Fotos in den Denkmal-Bucket hochladen -->
    <div class="flex justify-center">
    <div v-show="mode === 'denkmal'" class="p-4 space-y-2">
        <p class="font-bold">In den Ordner Denkmal hinzufügen:</p>
        <p><input type="file" @change="onFileChange"/></p>
        <p><input type="text" v-model="customFileName" placeholder="Geben Sie einen Dateinamen ein" class="w-64 p-2 border rounded border-gray-300 hover:border-blue-500 hover:bg-blue-50" /></p>
        <button @click="uploadToDenkmal" class="bg-blue-200 rounded hover:bg-blue-500 border-2 border-blue-400 shadow">Bild hochladen</button>

        <p v-if="successMsg">{{ successMsg }}</p>
        <p v-if="errorMsg" style="color: red">{{ errorMsg }}</p>
    </div>
    </div>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const customFileName = ref("")
const selectedFile = ref(null)
const successMsg = ref("")
const errorMsg = ref("")
const mode = ref("")

function selectModeHome() {
  if (mode.value != "home"  || mode.value === "") {
    mode.value = "home"
    clearMsgandFile()
  } else {
    mode.value = ""
    clearMsgandFile()
  }
}
function selectModeNatur() {
  if (mode.value != "natur" || mode.value === "") {
    mode.value = "natur"
    clearMsgandFile()
  } else {
    mode.value = ""
    clearMsgandFile()
  }
}
function selectModeDenkmal() {
  if (mode.value != "denkmal") {
    mode.value = "denkmal"
    clearMsgandFile()
  } else {
    mode.value = ""
    clearMsgandFile()
  }
}
function clearMsgandFile() {
  successMsg.value = ""
  errorMsg.value = ""
  selectedFile.value = ""
  customFileName.value = ""
  selectedFile.value = null
}

// Diese Funktion wird aufgerufen, wenn der Benutzer eine Datei auswählt
function onFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
  } else {
    selectedFile.value = null
  }
}
// Diese Funktionen laden das ausgewählte Bild in den jeweiligen Bucket hoch
async function uploadToHome() {
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
      .from('fotos_homepage')
      .upload(fileName, file)

    if (error) {
      throw error
    }
    successMsg.value = "Bild erfolgreich hochgeladen!"
    errorMsg.value = ""
  } catch (error) {
    errorMsg.value = `Fehler beim Hochladen: ${error.message}`
    successMsg.value = ""
  }
}
async function uploadToNatur() {
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
      .from('fotos_natur')
      .upload(fileName, file)

    if (error) {
      throw error
    }
    successMsg.value = "Bild erfolgreich hochgeladen!"
  } catch (error) {
    errorMsg.value = `Fehler beim Hochladen: ${error.message}`
  }
}
async function uploadToDenkmal() {
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
      .from('fotos_denkmal')
      .upload(fileName, file)

    if (error) {
      throw error
    }
    successMsg.value = "Bild erfolgreich hochgeladen!"
  } catch (error) {
    errorMsg.value = `Fehler beim Hochladen: ${error.message}`
  }
}
</script>

<style lang="scss" scoped>

</style>