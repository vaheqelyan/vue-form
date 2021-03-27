<style>
.divider {
  width: 100%;
  height: 1px;
  margin-bottom: 10px;
  margin-top: 10px;
  background: gray;
}
</style>

<template>
  <div>
    <!-- Just input -->
    <form-shortanswer v-if="field.currentForm === 'shortAnswer'"></form-shortanswer>

    <!-- Multiple Choice List (Radio by default) -->
    <form-multiplechoice
      v-bind:list="field.forms.multipleChoice"
      v-if="getFieldReference === 'multipleChoice'"
      v-bind:id="field.id"
      :addOption="addOption"
      v-bind:fieldType="field.currentForm"
      :deleteOption="handleDeleteOption"
    ></form-multiplechoice>

    <div class="divider"></div>

    <div>
      <dropdown :handleChange="handleChange"></dropdown>
      <button v-on:click="handleFieldDelete(field.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import Dropdown from "./Dropdown.vue";

//Forms
import ShortAnswer from "./Forms/ShortAnswer.vue";
import MultipleChoice from "./Forms/MultipleChoice.vue";

import { FIELD_DATA_REF } from "../constants";

export default {
  components: {
    dropdown: Dropdown,
    // Forms
    "form-shortanswer": ShortAnswer,
    "form-multiplechoice": MultipleChoice,
  },
  computed: {
    getFieldReference() {
      return FIELD_DATA_REF[this.field.currentForm];
    },
  },
  props: {
    handleFieldDelete: {
      type: Function,
    },
    field: {
      type: Object,
    },
    addOption: {
      type: Function,
    },
    handleDeleteItem: {
      type: Function,
    },
    changeType: {
      type: Function,
    },
  },
  methods: {
    handleDeleteOption(option) {
      this.handleDeleteItem(option);
    },
    handleChange(data) {
      this.changeType(data.type, this.field.id);
    },
  },
};
</script>
