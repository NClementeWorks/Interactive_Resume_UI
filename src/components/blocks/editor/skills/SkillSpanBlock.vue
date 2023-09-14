<!-- SkillSpanBlock -->

<script setup>
  import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3'
  import { onUpdated, ref } from 'vue'
  // import { computed, onUpdated, ref, toRefs, watch } from 'vue'

  // import useSkillReader from '@/composables/skill_reader.composable.js'

  // const _anitphonal_reader = useSkillReader ()

  const props = defineProps ({
    node: {
      type: Object,
      required: true
    },
    updateAttributes: {
      type: Function,
      required: true,
    }
  })

  // const {
  //   node,
  // } = toRefs ( props )

  function set_skill_id () {
    props.updateAttributes ({
      skill_id: skill_id.value,
    })
    
  }

  // const show_select = ref ( false )
  const skill_id = ref ( props.node.attrs.skill_id )
  // watch ( node, new_value => {
  //   const node_found = _anitphonal_reader.get_skill_format_node ( new_value )
  //   if ( node_found )
  //     skill_id.value = node_found.attrs.skill_id
  //     // updating onlky the local property
  //     // avoid updating the node attribute at this ppint
  //     // since it cause the whole process to stop
  //     // NC 2023-09-08
  // })

  onUpdated ( () => {
    set_skill_id ()
    // updating the node attribute after updates are complete
    // see note at watch(node)
    // NC 2023-09-08
  })

  // function update_menu ( event ) {
  //   console.log('update_menu :: event', event)
  //   show_select.value = event
  // }

  // const all_skill_ids = computed ( () => _anitphonal_reader.all_skill_ids.value )
</script>

<template>
  <!-- class="skill_span_wrapper" -->
  <NodeViewWrapper
    class="skill_span_wrapper"
    data-type_skill_span
    :skill_id="skill_id"
    >
    <NodeViewContent class="skill_span_text" />
    (x)
  </NodeViewWrapper>
</template>

<style lang="sass">
.skill_span_wrapper
  display: inline-block

.skill_span_text
  display: inline-block

[skill_id]
  p
    margin: 0

// [skill_id*='Leader']
//   color: gray

[skill_id='All'],
[skill_id='ALL']
  font-weight: bold
</style>