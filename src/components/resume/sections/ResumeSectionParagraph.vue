<!-- ResumeSectionParagraph -->

<script setup>
import { useSkills } from '@/composables/skills.composable'
import { computed, toRefs } from "vue"

const skills = useSkills ()

const props = defineProps ({
  item: {
    type: Object,
    default: null,
  }
})

const {
  item
} = toRefs ( props )

  const scanned_text = computed (() => 
    skills.scan_skills( item.value?.html_text )
  )
</script>

<template>
  <p v-html="item?.html_text"></p>
  <VDivider class="my-4"></VDivider>
  <p v-html="scanned_text"></p>
</template>