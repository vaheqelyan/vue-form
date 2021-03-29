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
  padding: 10px;
}
.sidebar__list {
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  color: #4a4a4a;
  border: none;
  background: #fff;
}

.sidebar__list:not(:last-child) {
  margin-bottom: 10px;
}

.sidebar__list:hover {
  background: #e7ecf3;
}
</style>

<template>
  <div class="sidebar">
    <button
      class="sidebar__list"
      v-for="item in actions"
      :key="item.value"
      v-on:click="handleSideBar(item.action)"
    >
      <i v-bind:class="item.icon"></i>
    </button>
  </div>
</template>

<script>
import { FORM_ACTIONS } from "../constants";

export default {
  props: {
    handleSideBar: {
      type: Function,
    },
  },

  data() {
    return {
      actions: [
        { value: "Add", icon: "fa fa-plus-circle", action: FORM_ACTIONS.ADD_FIELD },
        { value: "Submit", icon: "fa fa-paper-plane", action: FORM_ACTIONS.SUBMIT_FORM },
      ],
    };
  },
};
</script>
