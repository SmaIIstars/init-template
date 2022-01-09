<template>
  <div>devCase</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CustomComponentOptionsWithoutProps } from "@/constants/global-type";

export default defineComponent({
  name: "dev-case",
  dynamicRouteParams: ["id"],
  redirectUri: "0",
  setup() {
    return {};
  },
} as CustomComponentOptionsWithoutProps);
</script>

<style scoped>
</style>