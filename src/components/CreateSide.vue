<style>
.sidebar {
  width: 50px;
  height: 300px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  border-radius: 5px;
  position: absolute;
  right: -60px;
  top: 0;
  background: #fff;
}
</style>

<template>
  <div class="sidebar">
    <div
      class="list"
      v-for="item in actions"
      :key="item.value"
      v-on:click="handleSideBar(item.action)"
    >
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
import { FORM_ACTIONS } from "../constants";
export default {
  props: {
    handleSideBar: { type: Function },
  },

  data() {
    return {
      actions: [
        { value: "Add", action: FORM_ACTIONS.ADD_FIELD },
        { value: "Submit", action: FORM_ACTIONS.SUBMIT_FORM },
      ],
    };
  },
};
</script>
