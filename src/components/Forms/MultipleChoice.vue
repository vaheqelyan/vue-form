<style></style>

<template>
  <div>
    <div v-for="choice in list" :key="choice.id">
      <input v-bind:type="getInputType" disabled />
      <input type="text" v-model="choice.value" />

      <button v-on:click="deleteValue(choice.id)">X</button>
    </div>

    <button v-on:click="addOption(id)">Add option</button>
  </div>
</template>

<script>
import { FIELD_TYPE } from "../../constants";

let inputMap = {
  [FIELD_TYPE.CHECKBOX_LIST]: "checkbox",
  [FIELD_TYPE.MULTIPLE_CHOICE]: "radio",
};

export default {
  props: {
    fieldType: {
      type: String,
    },
    id: {
      type: String,
    },
    addOption: {
      type: Function,
    },
    deleteOption: {
      type: Function,
    },
    list: {
      type: Array,
    },
  },
  methods: {
    deleteValue: function(optionId) {
      this.deleteOption({ fieldId: this.id, optionId });
    },
  },
  computed: {
    getInputType() {
      return inputMap[this.fieldType];
    },
  },
};
</script>
