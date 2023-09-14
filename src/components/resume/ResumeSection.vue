<!-- ResumeSection -->

<script setup>
  import ResumeSectionParagraph from '@/components/resume/sections/ResumeSectionParagraph.vue'
  import ResumeSectionExperience from '@/components/resume/sections/ResumeSectionExperience.vue'
  import ResumeSectionEductaion from '@/components/resume/sections/ResumeSectionEductaion.vue'

  import { toRefs } from "vue"

  const props = defineProps ({
    section: {
      type: Object,
      default: null,
    }
  })

  const {
    section
  } = toRefs ( props )

  function section_item ( section_type ) {
    switch ( section_type ) {
      case 'career_profile':
        return ResumeSectionParagraph
      case 'work_experience':
        return ResumeSectionExperience
      case 'education':
        return ResumeSectionEductaion
      default:
        return 'div'
    }
  }
</script>

<template>
  <VCard>

    <VCardTitle>
      {{ section?.title }}
    </VCardTitle>

    <VCardText>

      <component :is="section_item ( section?.type )"
        v-for="item in section.items"
        :key="item.id"
        :item="item"
        ></component>

    </VCardText>

  </VCard>
</template>