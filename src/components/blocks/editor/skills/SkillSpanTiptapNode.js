/* SkillSpanTiptapNode */

import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import SkillSpanBlock from './SkillSpanBlock.vue'

export default Node.create ({
  
  name: 'skill_span',

  group: 'inline',

  inline: true,

  content: 'text*',

  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'span[data-type="skill_span"]',
      },
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['span', mergeAttributes ( HTMLAttributes, { 'data-type': 'skill_span' } ), 0 ]
  },

  addNodeView () {
    return VueNodeViewRenderer ( SkillSpanBlock )
  },

  addAttributes() {
    return {
      skill_id: {
        default: '',
      },
    }
  },
})