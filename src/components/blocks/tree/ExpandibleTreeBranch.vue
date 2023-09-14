<!-- ExpandibleTreeBranch -->
<script setup>
import { toRefs } from "vue"

  const props = defineProps({
    content: {
      type: Object,
      default: null,
    },
    id_field: {
      type: String,
      default: 'id',
    },
  })

  const {
    content,
  } = toRefs( props )

  const emit = defineEmits([
    'clicked:option',
  ])
</script>

<template>
  <VExpansionPanel
    class="expandible_tree_panel"
    >
    <VExpansionPanelTitle
      v-slot="{ expanded }"
      :collapse-icon="null"
      :expand-icon="null"
      class="px-0 py-1"
      >
      <VIcon
        :icon="`fa-regular fa-${
          content.children?.length
            ? expanded
              ? 'square-minus'
              : 'square-plus'
            : 'square'
        }`"
        color="gray-darken-3"
        class="branch_icon"
        ></VIcon>
      <div class="d-flex justify-center">
        <VLabel>
          <slot name="label" :content="content"></slot>
        </VLabel>
      </div>
    </VExpansionPanelTitle>

    <VExpansionPanelText
      v-if="content.children"
      accordion
      multiple
      :value="content.children.map ( item => [ 'string', 'number' ].includes ( typeof item ) ? item : item [ id_field ])"
      >
      <VExpansionPanels
        class="expandible_tree_panels"
        >
            
        <ExpandibleTreeBranch
          v-for="branch in content.children"
          :key="[ 'string', 'number' ].includes ( typeof branch ) ? branch : branch [ id_field ]"
          :content="branch"
          @clicked:option="emit ( 'clicked:option', $event )"
          >
          <template #label="{ content }">
            <slot name="label" :content="content"></slot>
          </template>
        </ExpandibleTreeBranch>
          
      </VExpansionPanels>
    </VExpansionPanelText>
  </VExpansionPanel>
</template>

<style lang="sass">
.branch_icon
  font-size: .8rem
  margin-right: .5rem

.v-expansion-panel-title
  min-height: unset

  .v-expansion-panel--active > &
    min-height: unset

  .v-expansion-panel-title__overlay
    background: transparent

.v-expansion-panel-text__wrapper
  // remove padding
  padding: 0
  padding-left: 1rem
  // add tree downward lines
  margin-left: .35rem
  border-left: 1px dashed rgb( var( --v-theme-gray-darken-2 ) )

.v-expansion-panel:not(:first-child)::after
  // remove top divider line between panels
  content: unset
</style>