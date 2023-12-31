<!--TipTap  -->
<script setup>
  import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import Underline from '@tiptap/extension-underline'
  import Superscript from '@tiptap/extension-superscript'
  import TextAlign from '@tiptap/extension-text-align'
  import TextStyle from '@tiptap/extension-text-style'

  import SkillSpan from '@/components/blocks/editor/skills/SkillSpanTiptapNode.js'
  
  import { useSkills } from '@/composables/skills.composable'
  import { onBeforeUnmount, ref, toRefs, watch } from 'vue'

  const skills = useSkills ()

  const props = defineProps ({
    modelValue: {
      type: String,
      default: '',
    },
    editorProps: {
      type: Object,
      default: null,
    },
    customNodes: {
      type: Array,
      default: new Array(),
    }
  })

  const {
    modelValue,
  } = toRefs ( props )

  watch ( modelValue, ( value ) => {
    // HTML
    const isSame = editor.value.getHTML () === value

    // JSON
    // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

    if ( isSame )
      return

    editor.value.commands.setContent ( value, false )
  })

  const emit = defineEmits ([
    'update:modelValue',
    'create:skill',
  ])

  const editor = useEditor ({
    extensions: [
      StarterKit,
      SkillSpan,

      Underline,
      Superscript,
      TextAlign,
      TextStyle,
    ],
    content: props.modelValue,
    onUpdate: () => {
      // HTML
      emit ( 'update:modelValue', editor.value.getHTML () )

      // JSON
      // this.$emit('update:modelValue', this.editor.getJSON())
    },
    editorProps: props.editorProps,
  })

  defineExpose ({ editor })

  onBeforeUnmount ( () => {
    editor.value.destroy()
  })
  
  function skill_from_selection () {
    let selection = window.getSelection()
    
    // TODO: show alert - no cross node selections allowed
    if ( selection.anchorNode !== selection.extentNode )
      return
    
    const selected_text = selection.anchorNode.textContent.substring ( selection.anchorOffset, selection.extentOffset )
    console.log('skill_from_selection :: selected_text =>', `"${ selected_text }"` )
    
    skills.show_skill_form.value = true
    skills.current_skill.value = skills.get_new_basic_skill ( selected_text )
    emit ( 'create:skill', selected_text )
  }

  const is_skill_selected = ref ( false )

  function show_menu () {
    return ({ editor, view, state, oldState, from, to }) => {
      console.log('BubbleMenu :: shouldShow:', editor, view, state, oldState, from, to)
      
      const skill_span = state.selection.$head.path.find ( node => node.type?.name === 'skill_span' )
      console.log('skill_span',skill_span)
      is_skill_selected.value = !!skill_span

      return !!skill_span || ( from - to !== 0 )
    }
  }
</script>

<template>

  <div class="tiptap_wrapper">

    <EditorContent
      :editor="editor"
      />
      
    <BubbleMenu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      :shouldShow="show_menu ()"
      class="bubble_menu rounded"
      >
      <VBtn
        v-if="!is_skill_selected"
        color="black"
        @click="skill_from_selection"
        >Create Skill</VBtn>
        <VBtn
        v-if="is_skill_selected"
        color="black"
        @click="skill_from_selection"
        >Remove Skill</VBtn>
        <VBtn
        v-if="is_skill_selected"
        color="black"
        @click="skill_from_selection"
        >Edit Skill</VBtn>
    </BubbleMenu>

  </div>
</template>

<style lang="sass">
p.lead
  color: red
p[data-reader="lead"]
  color: magenta
  margin-left: 1rem
  &::first-child
    text-decoration: underline

// .tiptap
//   overflow-x: scroll
.tiptap_wrapper
  position: relative
  height: 100%


  .tiptap
    height: 100%

.top_menu
  top: 0
  position: sticky
  background: white
  z-index: 1
  border-bottom: 1px solid #0002

  button  
    &.is-active
          background: #eee

  .v-select
    color: black
  
.bubble_menu
  background: black
  border-radius: 0.5rem
  color: white
  padding: .5rem

.tippy-arrow
  width: 1rem
  height: 1rem
  border-top: 0.5rem solid
  border-left: 0.5rem solid transparent
  border-right: 0.5rem solid transparent

  button
    padding: 0.5rem

    &.is-active
      background: #333
</style>