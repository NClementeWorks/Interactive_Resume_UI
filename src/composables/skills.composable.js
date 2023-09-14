import { useSkillsStore } from '@/stores/skills'

export const useSkills = () => {

  const skills_store = useSkillsStore ()

  return {

    data: skills_store.skills,

    get_primary_name: ( skill ) => skill.names [ skill.primary_name ],

    scan_skills: ( text ) => {
      let new_text = ''
      let do_scan = true
      text.split ( /\b/ ).forEach ( token => {
        console.log('token:', `"${ token }"`)
        console.log('do_scan:', do_scan)
        // turn off scanning for html tags
        if ( token.match ( /</ ) )
          do_scan = false
        if ( token.match ( />/ ) )
          do_scan = true

        const skill = skills_store.skills.find ( skill =>
          skill.names.includes ( token )
        )
        if ( skill )
          new_text += `<b class="skill_${ skill.id }"><u>${ token }</u></b>`
        else
          new_text += token
      })
      return new_text
    }

  }
}