<script lang="ts">
import { defineComponent } from 'vue';
import cmpTest from './components/cmp-test.vue';

export default defineComponent({
  name: 'Test',
  components: {
    cmpTest,
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <div>test</div>
  <router-view></router-view>
</template>

<style scoped></style>
