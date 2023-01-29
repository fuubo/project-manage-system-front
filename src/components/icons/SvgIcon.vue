<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#fff",
  },
  clickable: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "1em",
  },
  className: {
    type: String,
    default: "",
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const svgClass = computed(() => "svg-icon " + props.className || "");
const styleObject = computed(() => {
  return {
    width: props.size,
    height: props.size,
    cursor: props.clickable ? "pointer" : "",
  };
});
const emit = defineEmits(["on-click"]);
</script>
<template>
    <svg aria-hidden="true" :class="svgClass" :style="styleObject" @click="emit('on-click')">
        <use :xlink:href="symbolId" :fill="color" :stroke="color" />
    </svg>
</template>
<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
