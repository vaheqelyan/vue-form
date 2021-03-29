<style>
.menu {
  display: flex;
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  width: 100%;
  height: 50px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  border-radius: 5px;
  background: #fff;
  padding: 10px;
  z-index: 1;
}
.menu__list {
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

.menu__list:not(:last-child) {
  margin-bottom: 10px;
}

.menu__list:hover {
  background: #e7ecf3;
}
</style>

<template>
  <div class="menu">
    <button
      class="menu__list"
      v-for="item in actions"
      :key="item.value"
      v-on:click="handlemenu(item.action)"
    >
      <i v-bind:class="item.icon"></i>
    </button>
  </div>
</template>

<script>
import { FORM_ACTIONS } from "../constants";

export default {
  props: {
    handleMenu: {
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
