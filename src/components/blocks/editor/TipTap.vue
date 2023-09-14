<!--TipTap  -->
<script setup>
  import { useEditor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  // import Document from '@tiptap/extension-document'
  // import Paragraph from '@tiptap/extension-paragraph'
  // import Text from '@tiptap/extension-text'
  // import Heading from '@tiptap/extension-heading'
  // import Bold from '@tiptap/extension-bold'
  // import Italic from '@tiptap/extension-italic'
  import Underline from '@tiptap/extension-underline'
  import Superscript from '@tiptap/extension-superscript'
  import TextAlign from '@tiptap/extension-text-align'
  import TextStyle from '@tiptap/extension-text-style'
  // import History from '@tiptap/extension-history'
  // import HardBreak from '@tiptap/extension-hard-break'

  import SkillSpan from '@/components/blocks/editor/skills/SkillSpanTiptapNode.js'
  
  import { computed, onBeforeUnmount, toRefs, watch } from 'vue'

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
    'transaction:paragraph',
  ])

  const editor = useEditor ({
    extensions: [
      StarterKit,
      // Document.extend({
      //   content: 'skill_span+',
      // }),
      // ...props.customNodes,
      // Paragraph,
      SkillSpan,
      // Text,
      // Heading,
      // Bold,
      // Italic,

      Underline,
      Superscript,
      TextAlign,
      // .configure({
      //   types: ['paragraph'],
      // }),
      TextStyle,
      // History,
      // HardBreak,
    //   .extend({
    //   addKeyboardShortcuts () {
    //     return {
    //       Enter: () => this.editor.commands.setHardBreak()
    //     }
    //   }
    // })
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

  const bubble_menu_options = [
    {
      action: 'bold',
      editor_action: 'toggleBold',
    }, {
      action: 'italic',
      editor_action: 'toggleItalic',
    }, {
      action: 'underline',
      editor_action: 'toggleUnderline',
    }, {
      action: 'superscript',
      editor_action: 'toggleSuperscript',
    }, {
      icon: 'align-left',
      action: 'left',
      editor_action: 'setTextAlign',
      is_active: { textAlign: 'left' },
    }, {
      icon: 'align-center',
      action: 'center',
      editor_action: 'setTextAlign',
      is_active: { textAlign: 'center' },
    }, {
      icon: 'align-right',
      action: 'right',
      editor_action: 'setTextAlign',
      is_active: { textAlign: 'right' },
    }, {
      icon: 'align-justify',
      action: 'justify',
      editor_action: 'setTextAlign',
      is_active: { textAlign: 'justify' },
    },
  ]

  const bubble_menu_heading_options = [ 0, 2, 3, 4, 5, 6 ]
    .map ( option => ({
      name: option == 0 ? 'Paragraph' : `H${option}`,
      level: option,
    }))
  const current_heading = computed ( () => {
    return bubble_menu_heading_options
      .find ( option => editor.value?.isActive ( 'heading', { level: option.level } ) )
      || bubble_menu_heading_options [ 0 ]
  })

</script>

<template>

  <div class="tiptap_wrapper">
    <!-- <BubbleMenu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      class="bubble_menu rounded"
      >

      <IconBtn
        v-for="option in bubble_menu_options" :key="option.action"
        :icon="`fas fa-${ option.icon || option.action }`"
        class="rounded"
        :class="{ 'is-active': editor.isActive ( option.is_active || option.action ) }"
        @click="editor.chain ().focus () [ option.editor_action ] ( option.action ).run ()"
        >
      </IconBtn>
      
      <VSelect
        v-model="current_heading"
        :items="bubble_menu_heading_options"
        item-title="name"
        density="compact"
        hide-details
        >
        <template #item="{ item }">
          <VListItem
            @click="item.raw.level === 0
              ? editor.chain ().focus ().setParagraph ().run ()
              : editor.chain ().focus ().setHeading ( { level: item.raw.level } ).run ()"
            >
            {{ item.value }}
          </VListItem>
        </template>
      </VSelect>
      
      
    </BubbleMenu> -->
    <!-- <IconBtn
      :icon="`fas fa-check`"
      class="rounded"
      @click="editor.chain ().focus () .updateAttributes ( 'paragraph', { dataReader: 'lead' } ).run ()"
      >
    </IconBtn> -->
    
    <div class="top_menu d-flex">
      
      <VBtn
        v-for="option in bubble_menu_options" :key="option.action"
        :icon="`fas fa-${ option.icon || option.action }`"
        class="rounded"
        :class="{ 'is-active': editor?.isActive ( option.is_active || option.action ) }"
        @click="editor?.chain ().focus () [ option.editor_action ] ( option.action ).run ()"
        >
      </VBtn>
      
      <VSelect
        v-model="current_heading"
        :items="bubble_menu_heading_options"
        item-title="name"
        density="compact"
        hide-details
        class="ml-4"
        >
        <template #item="{ item }">
          <VListItem
            @click="item.raw.level === 0
              ? editor?.chain ().focus ().setParagraph ().run ()
              : editor?.chain ().focus ().setHeading ( { level: item.raw.level } ).run ()"
            >
            {{ item.value }}
          </VListItem>
        </template>
      </VSelect>
      
    </div>

    <EditorContent
      :editor="editor"
      />
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

  & > div:not(.top_menu)
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