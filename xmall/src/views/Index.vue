<template>
  <div >
    <MHeader></MHeader>

    <router-view class="haha"></router-view>
  </div>
</template>
<script>
import MHeader from '@/common/MHeader'
export default {

  name: "",
  data: () => ({

  }),
  components: {
    MHeader,
  }
}
</script>
<style lang="scss" scoped>
</style>
