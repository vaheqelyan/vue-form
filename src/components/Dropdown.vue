<style>
.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.dropdown__content {
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
}

.dropdown:hover .dropdown__content {
  display: block;
  border-radius: 3px;
}

.dropdown__selected:not(:empty) {
  background: rgb(238 238 238);
  padding: 3px 6px 3px 5px;
  border-radius: 3px;
}

.dropdown__item {
  padding: 10px;
}

.dropdown__item--active {
  background: rgb(238 238 238);
}
</style>

<template>
  <div class="dropdown">
    <span>
      {{ placeholder }} <span class="dropdown__selected">{{ selected }}</span>
      <i class="fas fa-caret-down"></i>
    </span>
    <div class="dropdown__content">
      <div
        v-bind:class="[
          'dropdown__item',
          { 'dropdown__item--active': selected === action.name },
        ]"
        v-for="action in actions"
        :key="action.type"
        v-on:click="handleDropdownChange(action)"
      >
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
    placeholder: { type: String },
  },

  methods: {
    handleDropdownChange(action) {
      this.selected = action.name;
      this.handleChange(action);
    },
  },

  data() {
    return {
      selected: "Short answer",
      actions: [
        { name: "Short answer", type: FIELD_TYPE.SHORT_ANSWER },
        { name: "Multiple choice", type: FIELD_TYPE.MULTIPLE_CHOICE },
        { name: "Checkbox choice", type: FIELD_TYPE.CHECKBOX_LIST },
      ],
    };
  },
};
</script>
