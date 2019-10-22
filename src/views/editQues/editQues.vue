<template>
    <questionOptions operation="edit" :isCreate="true"></questionOptions>
</template>

<script>
import questionOptions from "../../component/questionOptions/questionOptions";
export default {
    name:'editQues',
  data () {
    return {
    };
  },

  components: {
      questionOptions
  },

  computed: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
