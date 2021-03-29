<style>
.form {
  margin-top: 15px;
}

.form__divider {
  width: 100%;
  height: 1px;
  margin-bottom: 10px;
  margin-top: 10px;
  background: gray;
}

.form__delete {
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  color: #4a4a4a;
  background: #fff;
  border: none;
  display: inline;
}

.form__delete:hover {
  background: #e7ecf3;
}
</style>

<template>
  <div>
    <!-- Just input -->
    <div class="form">
      <form-shortanswer v-if="field.currentForm === 'shortAnswer'"></form-shortanswer>

      <!-- Multiple Choice List (Radio by default) -->
      <form-multiplechoice
        v-if="getFieldReference === 'multipleChoice'"
        :addOption="addOption"
        :deleteOption="handleDeleteItem"
        v-bind:fieldType="field.currentForm"
        v-bind:id="id"
        v-bind:list="field.forms.multipleChoice"
      ></form-multiplechoice>
    </div>

    <div class="form__divider"></div>

    <dropdown :handleChange="handleTypeChange" placeholder="Select type"></dropdown>
    |
    <button v-on:click="handleFieldDelete(id)" class="form__delete">
      <i class="far fa-trash-alt"></i>
    </button>
    |
    <label>
      <input type="checkbox" v-model="field.required" />
      Required
    </label>
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
    id: {
      type: String,
    },
  },
  methods: {
    handleTypeChange(data) {
      this.changeType(data.type, this.id);
    },
  },
};
</script>
