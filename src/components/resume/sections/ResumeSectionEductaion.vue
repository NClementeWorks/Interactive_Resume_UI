<!-- ResumeSectionEductaion -->

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
  <div>{{ item.institution }}</div>
  <div>{{ item.degree }}</div>
  <div>{{ item.major }}</div>
  <div>{{ item.date }}</div>
  <div>{{ item.location.city }}, {{ item.location.state }}</div>
</template>