import skills_data from '../../mock_data/skills_data'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref ( skills_data )

  const build_skills_tree = () => {
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
  }

  build_skills_tree ()

  return {
    skills,
    get skills_tree_root () { return skills.value.filter ( skill => !skill.parent_skills ) },
  }

})
