const FIELD_TYPE = {
  SHORT_ANSWER: "shortAnswer",
  MULTIPLE_CHOICE: "multipleChoice",
  CHECKBOX_LIST: "checkboxList",
};

const FIELD_DATA_REF = {
  [FIELD_TYPE.CHECKBOX_LIST]: "multipleChoice",
  [FIELD_TYPE.MULTIPLE_CHOICE]: "multipleChoice",
  [FIELD_TYPE.SHORT_ANSWER]: FIELD_TYPE.SHORT_ANSWER,
};

const FORM_ACTIONS = {
  ADD_FIELD: "ADD_FIELD",
  SUBMIT_FORM: "SUBMIT_FORM",
};

export { FIELD_TYPE, FIELD_DATA_REF, FORM_ACTIONS };
