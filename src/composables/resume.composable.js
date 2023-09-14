import { useResumeStore } from '@/stores/resume'

export const useResume = () => {

  const resume_store = useResumeStore ()

  return {

    data: resume_store.resume,

    get_primary_item: ( data_item ) => data_item.list.find( item => item.id === data_item.primary ),

  }
}