import skills_data from '../../mock_data/skills_data'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref ( skills_data )

  return {
    skills
  }
})
