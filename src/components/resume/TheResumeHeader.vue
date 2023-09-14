<!-- TheResumeHeader -->
<script setup>
  import { useResume } from '@/composables/resume.composable'
  
  const resume = useResume ()
</script>

<template>
  <VCard>
    <VCardText>
      <h1> {{ resume.data.name }}</h1>
      <div>
        {{ resume.get_primary_item ( resume.data.phones ).number }}
        • {{ resume.get_primary_item ( resume.data.emails ).email }}
      </div>
      <div>
        {{ resume.data.social.list.map( social => social.address ).join ( ' • ') }}
        • {{ resume.data.location }}
      </div>
    </VCardText>
</VCard>
</template>