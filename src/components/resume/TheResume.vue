<!-- TheResume -->

<script setup>
  import TheResumeHeader from '@/components/resume/TheResumeHeader.vue'
  import ResumeSection from '@/components/resume/ResumeSection.vue'
  import SkillForm from '@/components/skills/SkillForm.vue'
  import DialogBox from '@/components/blocks/dialog/DialogBox.vue'
  
  import { useResume } from '@/composables/resume.composable'
  import { useSkills } from '@/composables/skills.composable'
  
  const resume = useResume ()
  const skills = useSkills ()
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

  <!-- Skill Form -->
  <DialogBox
    :show="skills.show_skill_form.value"
    title="Skill"
    >
    <SkillForm
      />
  </DialogBox>

</template>