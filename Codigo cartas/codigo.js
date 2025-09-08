const { createApp, ref, onMounted } = Vue

createApp({
  setup() {
    const datos = ref([])

    onMounted(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => {
          datos.value = json
        })
    })

    return { datos }
  }
}).mount('#app')
