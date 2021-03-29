<style>
.multipleChoice {
}

.multipleChoice__remove {
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

.multipleChoice__item:not(:last-child) {
  margin-bottom: 10px;
}

.multipleChoice__remove:hover {
  background: #e7ecf3;
}

.multipleChoice__add {
  margin-top: 15px;
  font-size: 14px;
  padding: 5px;
  background: #f8f9fa;
  border-radius: 3px;
  border: 1px solid #aeb1b4;
  cursor: pointer;
}

.grab {
  color: #b2b2b2;
}
</style>

<template>
  <div class="multipleChoice">
    <draggable :list="list" @end="handleDragEnd" handle=".grab" ghost-class="ghost">
      <transition-group type="transition" name="flip-list">
        <div v-for="(choice, index) in list" :key="choice.id" class="multipleChoice__item">
          <i class="fas fa-grip-vertical grab"></i>

          <input v-bind:type="getInputType" disabled />

          <input v-model="choice.value" :placeholder="'Option ' + index" />

          <button v-on:click="deleteValue(choice.id)" class="multipleChoice__remove">
            <i class="fal fa-times"></i>
          </button>
        </div>
      </transition-group>
    </draggable>

    <button class="multipleChoice__add" v-on:click="addOption(id)">Add option</button>
  </div>
</template>

<script>
import { FIELD_TYPE } from "../../constants";
import draggable from "vuedraggable";

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
  components: {
    draggable: draggable,
  },
  data() {
    return {
      newIndex: "",
      oldIndex: "",
    };
  },
  methods: {
    deleteValue: function(optionId) {
      this.deleteOption({ fieldId: this.id, optionId });
    },
    handleDragEnd(event) {
      this.newIndex = event.newIndex;
      this.oldIndex = event.oldIndex;
    },
  },
  computed: {
    getInputType() {
      return inputMap[this.fieldType];
    },
  },
};
</script>
