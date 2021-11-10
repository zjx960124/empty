<template>
  <el-dialog
    width="1600px"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
  >
    <form-build :options="formData"></form-build>
  </el-dialog>
</template>

<script>
  export default {
    name: 'Preview',
    props: ['formData'],
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped>

</style>
