<!-- TheSkillsList -->

<script setup>
  import ExpandibleTree from '@/components/blocks/tree/ExpandibleTree.vue'
  import { useSkills } from '@/composables/skills.composable'

  const skills = useSkills ()
</script>

<template>
  <ExpandibleTree
    :items="skills.tree"
    >
    <template #label="{ content }">
      {{ skills.get_primary_name ( content ) }}
    </template>
  </ExpandibleTree>
</template>