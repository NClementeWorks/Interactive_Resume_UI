<!-- TheResume -->

<script setup>
  import TheResumeHeader from '@/components/resume/TheResumeHeader.vue'
  import ResumeSection from '@/components/resume/ResumeSection.vue'
  
  import { useResume } from '@/composables/resume.composable'
  
  const resume = useResume ()
</script>

<template>

  <!-- Heading -->
  <TheResumeHeader />

  <!-- Sections -->
  <ResumeSection
    v-for="section in resume.data.sections"
    :key="section.id"
    :section="section"
    />

</template>