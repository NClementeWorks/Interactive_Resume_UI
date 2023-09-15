<!-- ResumeSectionParagraph -->

<script setup>
  import TipTap from '@/components/blocks/editor/TipTap.vue'

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
  <TipTap
    v-model="scanned_text"
    />
</template>