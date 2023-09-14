import { useSkillsStore } from '@/stores/skills'

export const useSkills = () => {

  const skills_store = useSkillsStore ()
  console.log('skills_store.skills_tree_root',skills_store.skills_tree_root)

  return {

    data: skills_store.skills,
    tree: skills_store.skills_tree_root,
    
    get_primary_name: ( skill ) => skill.names [ skill.primary_name ],

    scan_skills: ( text ) => {
      let new_text = text

      /* match strategy */
      const all_skill_names = skills_store.skills
        .flatMap ( skill => skill.names.map ( name => ({ name, skill }) ) )
        .sort( ( n1, n2 ) => n2?.name.length - n1?.name.length )

      all_skill_names.forEach( skill_name => {
        let skill_name_regex = new RegExp ( `\\b${ skill_name.name.trim () }\\b`, 'g' )
        new_text = new_text.replace (
          skill_name_regex,
          `<span class="skill skill_${ skill_name.skill.id }">${ skill_name.name }</span>`
        )
      })

      return new_text
      
      /* loop strategy */
      /* replaced with match strategy
        NC 23-9-14
      */
      // let do_scan = true
      // text.split ( /\b/ ).forEach ( token => {
      //   console.log('token:', `"${ token }"`)
      //   console.log('do_scan:', do_scan)
      //   // turn off scanning for html tags
      //   if ( token.match ( /</ ) )
      //     do_scan = false
      //   if ( token.match ( />/ ) )
      //     do_scan = true

      //   const skill = skills_store.skills.find ( skill =>
      //     skill.names.includes ( token )
      //   )
      //   if ( skill )
      //     new_text += `<b class="skill_${ skill.id }"><u>${ token }</u></b>`
      //   else
      //     new_text += token
      // })
    }

  }
}