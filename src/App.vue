<style>
.app {
  max-width: 600px;
  width: 100%;
  min-height: 100px;
  margin: 0 auto;
  position: relative;
  background: transparent;
}

.app__field {
  width: 100%;
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
}

.app__dragHandler {
  height: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grab {
  cursor: grab;
}

.ghost {
  opacity: 0.5;
}

.flip-list-move {
  transition: transform 0.5s;
}
</style>

<template>
  <div class="app">
    <app-menu :handleMenu="handleMenu"></app-menu>
    <draggable
      v-model="fields"
      @end="handleDragEnd"
      handle=".grab"
      ghost-class="ghost"
      :scroll-sensitivity="200"
      :force-fallback="true"
    >
      <transition-group type="transition" name="flip-list">
        <div v-for="field in fields" :key="field">
          <div class="app__field">
            <div class="app__dragHandler">
              <i class="fas fa-grip-horizontal grab"></i>
            </div>

            <input v-model="fieldsData[field].questionName" placeholder="Field name" />

            <form-reducer
              :addOption="addOption"
              :handleDeleteItem="deleteOption"
              :handleFieldDelete="deleteField"
              :changeType="changeType"
              v-bind:field="fieldsData[field]"
              v-bind:id="field"
            ></form-reducer>
          </div>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import Forms from "./components/Forms.vue";
import draggable from "vuedraggable";

import { FIELD_TYPE, FIELD_DATA_REF, FORM_ACTIONS } from "./constants";

const uid = () =>
  "_" +
  Math.random()
    .toString(36)
    .substr(2, 9);

const createOption = () => ({
  id: uid(),
  value: "",
});

// Create field
const createField = () => {
  return {
    questionName: "",
    forms: {
      multipleChoice: [{ value: "Option 1", id: uid() }],
      shortAnswer: "",
    },
    required: false,
    currentForm: FIELD_TYPE.SHORT_ANSWER,
  };
};

export default {
  name: "App",
  components: {
    "app-menu": Menu,
    "form-reducer": Forms,
    draggable: draggable,
  },
  data() {
    return {
      fields: [],
      fieldsData: {},
      oldIndex: "",
      newIndex: "",
    };
  },
  methods: {
    changeType: function(newType, id) {
      const getField = this.fieldsData[id];

      const shouldResetData =
        FIELD_DATA_REF[getField.currentForm] !== FIELD_DATA_REF[newType];

      const newField = createField();

      this.fieldsData = {
        ...this.fieldsData,
        [id]: {
          ...getField,
          forms: shouldResetData ? newField.forms : getField.forms,
          currentForm: newType,
        },
      };
    },

    deleteOption({ fieldId, optionId }) {
      const getFieldData = this.fieldsData[fieldId];
      this.fieldsData = {
        ...this.fieldsData,
        [fieldId]: {
          ...getFieldData,
          forms: {
            ...getFieldData.forms,
            multipleChoice: getFieldData.forms.multipleChoice.filter(
              option => option.id !== optionId,
            ),
          },
        },
      };
    },

    addOption(getFieldId) {
      const getFieldData = this.fieldsData[getFieldId];

      this.fieldsData = {
        ...this.fieldsData,
        [getFieldId]: {
          ...getFieldData,
          forms: {
            ...getFieldData.forms,
            multipleChoice: getFieldData.forms.multipleChoice.concat(createOption()),
          },
        },
      };
    },

    handleMenu(action) {
      switch (action) {
        case FORM_ACTIONS.ADD_FIELD:
          let id = uid();
          this.fields.push(id);
          this.fieldsData[id] = createField();
          break;
        case FORM_ACTIONS.SUBMIT_FORM:
          alert("open your console plz");
          console.log(JSON.parse(JSON.stringify(this.fields)));
          console.log(JSON.parse(JSON.stringify(this.fieldsData)));
      }
    },

    deleteField(fieldId) {
      this.fields = this.fields.filter(field => field !== fieldId);
      const { [fieldId]: _, ...restFields } = this.fieldsData;
      this.fieldsData = restFields;
    },

    // -- DND--
    handleDragEnd(ev) {
      this.newIndex = ev.newIndex;
      this.oldIndex = ev.oldIndex;
    },
  },
};
</script>
