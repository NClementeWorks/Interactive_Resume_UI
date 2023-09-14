import resume_data from '../../mock_data/resume_data'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useResumeStore = defineStore('resume', () => {
  const resume = ref ( resume_data )

  return {
    resume
  }
})
