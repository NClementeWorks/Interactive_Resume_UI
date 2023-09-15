<!-- SkillForm -->

<script setup>
  import { useSkills } from '@/composables/skills.composable'
  import { computed, reactive } from "vue"

  const skills = useSkills ()
  
  const skill = reactive ({
    id: skills.current_skill.value?.id || -1,
    primary_name: skills.current_skill.value?.primary_name || 0,
    names: skills.current_skill.value?.names || [],
    icon: skills.current_skill.value?.icon || null,
    category: skills.current_skill.value?.category || null,
    rating: skills.current_skill.value?.rating || 0,
    experience_time: skills.current_skill.value?.experience_time || null,
    parent_skills: skills.current_skill.value?.parent_skills || null,
  })

  const skill_name = computed ( () => skills.get_primary_name ( skill ))

  function save_and_close () {
    skills.save_skill ( skill )
    close_form ()
  }

  function close_form () {
    skills.show_skill_form.value = false
  }

  function add_parent_skill ( item_skill ) {
    if ( !skill.parent_skills )
      skill.parent_skills = []

    const index = skill.parent_skills?.findIndex ( parent => parent === item_skill.id )
    console.log('index',index)
    if ( index >= 0 )
      skill.parent_skills.splice ( index, 1 )
    else
      skill.parent_skills.push ( item_skill.id )
  }

</script>

<template>
  <VForm>
    <VTextField
      v-model="skill_name"
      ></VTextField>

    <VSelect
      label="Parent Skill"
      v-model="skill.parent_skills"
      :items="skills.data.value"
      item-value="id"
      multiple
      >
      <template #item="{ item }">
        <VListItem
          :value="item.raw.id"
          @click="add_parent_skill ( item.raw )"
          >
          {{ skills.get_primary_name ( item.raw ) }}
        </VListItem>
      </template>

      <template #chip="{ item }">
        <VChip
          >
          {{ skills.get_primary_name ( item.raw ) }}
        </VChip>
      </template>
    </VSelect>

    <VBtn
      @click="close_form"
      >
      Cancel
    </VBtn>

    <VBtn
      @click="save_and_close"
      >
      Save
    </VBtn>
  </VForm>
</template>