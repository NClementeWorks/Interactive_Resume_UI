<script setup>
  // import resume_data from '../mock_data/resume_data'
    // import skills_data from '../mock_data/skills_data'

  import TheResumeHeader from '@/components/resume/TheResumeHeader.vue'
  import ResumeSection from '@/components/resume/ResumeSection.vue'
  
  import { useResume } from '@/composables/resume.composable'
  import { useSkills } from '@/composables/skills.composable'
  
  const resume = useResume ()
  const skills = useSkills ()
</script>

<template>
  <VRow>
    <VCol cols="2">

      <VCard>
        <VCardTitle>
          <h3>Skills</h3>
        </VCardTitle>
        
        <VCardText>
          <ul>
            <li v-for="skill in skills.data" :key="skill.id">
              {{ skills.get_primary_name ( skill ) }}
            </li>
          </ul>

        </VCardText>

        <VCardActions>
          <VBtn
            @click="skills.scan_skills( resume.data.sections [ 0 ].items [ 0 ].html_text )"
            >Scan Skills</VBtn>
        </VCardActions>
      </VCard>

    </VCol>

    <VCol>

      <VBtn>Edit</VBtn>

      <!-- Heading -->
      <TheResumeHeader />
  
      <!-- Sections -->
      <ResumeSection
        v-for="section in resume.data.sections"
        :key="section.id"
        :section="section"
        />

    </VCol>
  </VRow>
</template>
