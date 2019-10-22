<template>
    <questionOptions operation="create" :isCreate="true" ></questionOptions>
</template>

<script>
import questionOptions from "../../component/questionOptions/questionOptions";

export default {
    name:'addQues',
  data () {
    return {
    };
  },
  components: {
      questionOptions,
  },
  computed: {},
  methods: {}
}

</script>
<style lang='scss' scoped>
    .addIndex{

    }
</style>
