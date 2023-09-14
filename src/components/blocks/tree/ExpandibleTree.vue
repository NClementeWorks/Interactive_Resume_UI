<!-- ExpandibleTree -->

<script setup>
  import ExpandibleTreeBranch from '@/components/blocks/tree/ExpandibleTreeBranch.vue';
  import { ref, toRefs } from 'vue';

  const props = defineProps({
    items: {
      type: Array,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    id_field: {
      type: String,
      default: 'id',
    },
  })

  const {
    items,
    loading,
  } = toRefs ( props )

  const emit = defineEmits([
    'clicked:option',
  ])

  const all_items_indices = ref ( [] )
  all_items_indices.value = Array.from ( { length: items.value.length }, ( e, i ) => i )

</script>

<template>
  <VProgressCircular
    v-if="loading"
    class="image_progress"
    />
  <VExpansionPanels
    v-else
    accordion
    multiple
    v-model="all_items_indices"
    class="expandible_tree_panels"
    >
    <ExpandibleTreeBranch
      v-for="branch in items"
      :key="[ 'string', 'number' ].includes ( typeof branch ) ? branch : branch [ id_field ]"
      :content="branch"
      :id_field="id_field"
      @clicked:option="emit ( 'clicked:option', $event )"
      >
      <template #label="{ content }">
        <slot name="label" :content="content"></slot>
      </template>
    </ExpandibleTreeBranch>
  </VExpansionPanels>
</template>

<style lang="sass">

</style>