<!-- ResumeSectionAwards -->

<script setup>
  import { toRefs } from "vue"

  const props = defineProps ({
    item: {
      type: Object,
      default: null,
    }
  })

  const {
    item
  } = toRefs ( props )
</script>

<template>
  <p v-text="item?.html_text"></p>
</template>