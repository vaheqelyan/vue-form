<style>
.wrapper {
  max-width: 600px;
  width: 100%;
  min-height: 100px;
  margin: 0 auto;
  position: relative;
  background: transparent;
}

.card {
  width: 100%;
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>

<template>
  <div class="wrapper">
    <div v-for="field in fields" :key="field.id">
      <div class="card">
        <input type="text" v-model="field.questionName" />
        <form-reducer
          :addOption="addOption"
          :handleDeleteItem="deleteOption"
          :handleFieldDelete="handleFieldDelete"
          :changeType="changeType"
          v-bind:field="field"
        ></form-reducer>
      </div>
    </div>
    <app-sidebar :handleSideBar="handleSideBar"></app-sidebar>
  </div>
</template>

<script>
import SideBar from "./components/CreateSide.vue";
import Forms from "./components/Forms.vue";

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
    id: uid(),
    forms: {
      multipleChoice: [{ value: "Option 1", id: uid() }],
      shortAnswer: "",
    },
    currentForm: FIELD_TYPE.SHORT_ANSWER,
  };
};

export default {
  name: "App",
  components: {
    "app-sidebar": SideBar,
    "form-reducer": Forms,
  },
  data() {
    return {
      fields: [],
    };
  },
  methods: {
    changeType(newType, id) {
      const getField = this.fields.find(field => field.id === id);

      const shouldResetData =
        FIELD_DATA_REF[getField.currentForm] !== FIELD_DATA_REF[newType];

      const newField = createField();

      this.fields = this.fields.map(value => {
        if (value.id === id) {
          return {
            ...value,
            forms: shouldResetData ? newField.forms : value.forms,
            currentForm: newType,
          };
        }
        return value;
      });
    },

    deleteOption({ fieldId, optionId }) {
      this.fields = this.fields.map(field => {
        if (field.id === fieldId) {
          return {
            ...field,
            forms: {
              ...field.forms,
              multipleChoice: field.forms.multipleChoice.filter(
                option => option.id !== optionId,
              ),
            },
          };
        }
        return field;
      });
    },
    addOption(getFieldId) {
      this.fields = this.fields.map(field => {
        if (field.id === getFieldId) {
          return {
            ...field,
            forms: {
              ...field.forms,
              multipleChoice: field.forms.multipleChoice.concat(createOption()),
            },
          };
        }
        return field;
      });
    },

    handleSideBar(action) {
      switch (action) {
        case FORM_ACTIONS.ADD_FIELD:
          this.fields.push(createField());
          break;
        case FORM_ACTIONS.SUBMIT_FORM:
          console.log(this.fields);
      }
    },

    handleFieldDelete(fieldId) {
      this.fields = this.fields.filter(field => field.id !== fieldId);
    },
  },
};
</script>
