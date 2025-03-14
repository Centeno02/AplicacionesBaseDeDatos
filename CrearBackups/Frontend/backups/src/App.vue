<template>
  <div id="app">
    <BackupView />
  </div>
</template>

<script>
import BackupView from './components/BackupView.vue';

export default {
  components: {
    BackupView
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}
</style>
