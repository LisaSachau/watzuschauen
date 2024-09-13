<template>
  <div class="bg-emerald-50 min-h-screen">
    <div class="flex justify-center">
      <div class="w-full max-w-md p-8 space-y-3 rounded-xl bg-emerald-100 shadow-md">
        <h1 class="text-2xl font-bold text-center">Login</h1>
        <h3 class="text-red-500">{{ errorMsg }}</h3>
        <form class="space-y-6" action="#" method="POST" @submit.prevent="logIn">
          <div>
            <label for="email" class="text-sm font-semibold">Email</label>
            <input type="email" id="email" placeholder="Email" v-model="email"
              class="w-full border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-400 focus:ring-opacity-50" />
          </div>
          <div>
            <label for="password" class="text-sm font-semibold">Password</label>
            <input type="password" id="password" placeholder="Password" v-model="password"
              class="w-full border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-400 focus:ring-opacity-50" />
          </div>
          <button type="submit"
            class="w-full py-2 text-white bg-emerald-500 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50">
            Log In
          </button>
          <h3 class="text-green-500">{{ successMsg }}</h3>
        </form>
    </div>
  </div>
  </div>
</template>

<script setup>
   const supabase = useSupabaseClient()
   const router = useRouter()
  const email = ref("")
  const password = ref(null) 
  const errorMsg = ref(null)
  const successMsg = ref(null)
  async function logIn() {
    try {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })
        if (error) throw error
        router.push("/intern/index")
    } catch (error) {
        errorMsg.value = error.message
    }
  }
</script>