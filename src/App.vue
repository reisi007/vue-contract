<template>
  <nav class="bg-gray-200">
    <header class="bg-white shadow" v-if="$route.meta.title">
      <div class="bg-reisishot max-w-screen-xl mx-auto py-6 px-4 h-full sm:px-6 lg:px-8">
        <h1 class=" text-3xl font-bold leading-tight text-gray-900">
          {{ $route.meta.title }}
        </h1>
      </div>
    </header>
  </nav>


  <div class="content">
    <router-view/>
  </div>

</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({})
</script>
