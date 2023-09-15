<!-- DialogBox -->

<script setup>
import { toRefs } from "vue"

  const props = defineProps ({
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  })

  const {
    show,
    title,
  } = toRefs ( props )
</script>

<template>  
  <VDialog
    v-model="show"
    width="auto"
    >
    <VCard>
      <VCardTitle>
        {{ title }}
      </VCardTitle>
      <VCardText>
        <slot></slot>
      </VCardText>
    </VCard>
  </VDialog>
</template>