<style>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>

<template>
  <div class="dropdown">
    <span>Mouse over me</span>
    <div class="dropdown-content">
      <div v-for="action in actions" :key="action.type" v-on:click="handleChange(action)">
        {{ action.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { FIELD_TYPE } from "../constants";

export default {
  props: {
    handleChange: { type: Function },
  },

  data() {
    return {
      actions: [
        { name: "Short answer", type: FIELD_TYPE.SHORT_ANSWER },
        { name: "Multiple choice", type: FIELD_TYPE.MULTIPLE_CHOICE },
        { name: "Checkbox choice", type: FIELD_TYPE.CHECKBOX_LIST },
      ],
    };
  },
};
</script>
