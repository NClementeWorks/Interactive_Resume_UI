<!-- TheSkillsList -->

<script setup>
  import { useSkills } from '@/composables/skills.composable'
  const skills = useSkills ()
</script>

<template>
  <ul>
    <li v-for="skill in skills.data" :key="skill.id">
      {{ skills.get_primary_name ( skill ) }}
    </li>
  </ul>
</template>