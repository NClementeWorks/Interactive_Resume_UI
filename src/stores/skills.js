import skills_data from '../../mock_data/skills_data'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref ( skills_data )

  const skills_tree_root = computed ( () => {
    skills.value.forEach ( skill => skill.children = undefined )
    
    skills.value.forEach ( skill => {
      if ( skill.parent_skills )
        skill.parent_skills.forEach ( parent_skill_id => {
          const parent = skills.value.find ( parent_skill => parent_skill.id === parent_skill_id )
          if ( parent )
            if ( parent.children )
              parent.children.push ( skill )
            else
              parent.children = [ skill ]
        })
    })

    return skills.value.filter ( skill => !skill.parent_skills )
  })

  const current_skill = ref ( null )
  const show_skill_form = ref ( false )

  return {
    skills,
    skills_tree_root,
    current_skill,
    show_skill_form,
  }

})
