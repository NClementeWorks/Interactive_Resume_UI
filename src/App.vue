<script setup>
  // import resume_data from '../mock_data/resume_data'
    // import skills_data from '../mock_data/skills_data'

  import TheSkillsList from '@/components/skills/TheSkillsList.vue'
  import TheResume from '@/components/resume/TheResume.vue'
</script>

<template>
  <VApp>
    <VCard>
      <VLayout>

        <VRow>
          <VCol cols="3">

            <VCard>
              <VCardTitle>
                <h3>Skills</h3>
              </VCardTitle>
              
              <VCardText>
                <TheSkillsList />
              </VCardText>
            </VCard>

          </VCol>

          <VCol>

            <VCard>
              <VBtn>Edit</VBtn>
              <TheResume />
            </VCard>

          </VCol>
        </VRow>

      </VLayout>
    </VCard>
  </VApp>
</template>

<style lang="sass">
@import '@/assets/style.sass'
</style>
