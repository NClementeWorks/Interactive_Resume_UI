<!--TipTap  -->
<script setup>
  import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import Underline from '@tiptap/extension-underline'
  import Superscript from '@tiptap/extension-superscript'
  import TextAlign from '@tiptap/extension-text-align'
  import TextStyle from '@tiptap/extension-text-style'

  import SkillSpan from '@/components/blocks/editor/skills/SkillSpanTiptapNode.js'
  
  import { onBeforeUnmount, toRefs, watch } from 'vue'

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

  // const bubble_menu_options = [
  //   {
  //     action: 'bold',
  //     editor_action: 'toggleBold',
  //   }, {
  //     action: 'italic',
  //     editor_action: 'toggleItalic',
  //   }, {
  //     action: 'underline',
  //     editor_action: 'toggleUnderline',
  //   }, {
  //     action: 'superscript',
  //     editor_action: 'toggleSuperscript',
  //   }, {
  //     icon: 'align-left',
  //     action: 'left',
  //     editor_action: 'setTextAlign',
  //     is_active: { textAlign: 'left' },
  //   }, {
  //     icon: 'align-center',
  //     action: 'center',
  //     editor_action: 'setTextAlign',
  //     is_active: { textAlign: 'center' },
  //   }, {
  //     icon: 'align-right',
  //     action: 'right',
  //     editor_action: 'setTextAlign',
  //     is_active: { textAlign: 'right' },
  //   }, {
  //     icon: 'align-justify',
  //     action: 'justify',
  //     editor_action: 'setTextAlign',
  //     is_active: { textAlign: 'justify' },
  //   },
  // ]

  function skill_from_selection () {
    let selection = window.getSelection()
    console.log('skill_from_selection :: selection', selection )
    
    // TODO: refine selection when accross multiple nodes
    if ( selection.anchorNode !== selection.extentNode )
      return
    
    const selected_text = selection.anchorNode.textContent.substring ( selection.anchorOffset, selection.extentOffset )
    console.log('skill_from_selection :: selected_text =>', `"${ selected_text }"` )
    
    emit ( 'create:skill', selected_text )

    /* Tiptap selection */
    // console.log('skill_from_selection :: selection', editor.value.view.state.selection )
    // const selection = editor.value.view.state.selection
    // if ( selection.empty ) return

    // console.log('selection :: textContent', selection.$anchor.parent.textContent)
    // console.log('selection :: from', selection.from)
    // console.log('selection :: to', selection.to)
    // const parent_offset = selection.$from.path [ selection.$from.path.length - 2 ]
    // console.log('selection :: parent_offset', parent_offset)
    // const selected_text = selection.$anchor.parent.textContent.substring (
    //   selection.from - parent_offset - 1,
    //   selection.to - parent_offset - 1
    // )
    // console.log('selected_text',selected_text)
  }
</script>

<template>

  <div class="tiptap_wrapper">
    <!-- <div class="top_menu d-flex">
      <VBtn
        v-for="option in bubble_menu_options" :key="option.action"
        :icon="`fas fa-${ option.icon || option.action }`"
        class="rounded"
        :class="{ 'is-active': editor?.isActive ( option.is_active || option.action ) }"
        @click="editor?.chain ().focus () [ option.editor_action ] ( option.action ).run ()"
        >
      </VBtn>
    </div> -->

    <EditorContent
      :editor="editor"
      />
      <!-- @mouseup="tiptap_mouse_up" -->
      
    <BubbleMenu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      class="bubble_menu rounded"
      >
      <VBtn
        @click="skill_from_selection"
        >Create Skill</VBtn>
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
  color: white
  // border-radius: 0.5rem

  button
    padding: 0.5rem

    &.is-active
      background: #333
</style>