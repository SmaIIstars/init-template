<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CTest2',
  // isAutoRegisterRoute: false,

  dynamicRouteParams: ['id', 'type'],

  setup() {
    return {};
  },
});
</script>

<template>
  <div>c-test2</div>
</template>

<style scoped></style>
