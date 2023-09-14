<!-- ResumeSectionExperience -->

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
  <div>{{ item.company }} – {{ item.position }}</div>
  <div>{{ item.blurb }}</div>
  <div>{{ item.dates.from }} – {{ item.dates.to }}</div>
  <div>{{ item.location }}</div>
  
  <div v-html="item.html_text"></div>
</template>