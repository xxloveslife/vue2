<template>
<div class="goods">
  <div class="nav">
    <div class="w">
      <a @click="handleSort(i)" :class="{active:i===isIndex}" href="javascript:;" v-for="(navItem,i) in navList" :key="i">
        {{navItem.title}}
      </a>
      <div class="price-interval">
        <input type="number" class="input" placeholder="价格" v-model="min">
        <span style="margin: 0 5px">-</span>
        <input type="number" placeholder="价格" v-model="max">
        <el-button type="primary" size="small" style="margin-left: 10px;" @click="reset">确定</el-button>
      </div>
    </div>
  </div>
  <div>
    <div class="goods-box w">
      <MallGoods v-for="goods in allGoods" :key="goods.id" :goods="goods"></MallGoods>
    </div>
    <div class="w">
      <el-pagination style="float:right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[8, 20, 40, 80]" :page-size="pageSize" layout="total,sizes, prev, pager, next"
        :total="total"></el-pagination>
    </div>
  </div>
</div>
</template>
<script>
import MallGoods from '@/components/MallGoods'
export default {
  name: "",
  data() {
    return {
      navList: [{
          title: '综合排序'
        },
        {
          title: '价格由低到高'
        },
        {
          title: '价格由高到低'
        },
      ],
      isIndex: 0,
      min: '',
      max: '',
      allGoods: [],
      currentPage: 1,
      pageSize: 20,
      sort: "",
      total: 0,
    }
  },
  watch: {
    $route:'getAllGoods'
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize=val;
      this.getAllGoods();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getAllGoods();
    },
    priceSort(v){
      this.sort=v;
      this.getAllGoods();
    },
    reset(){
      this.sort='';
      this.currentPage=1;
      this.getAllGoods();
    },
    handleSort(i) {
      this.isIndex = i;
      switch (i) {
        case 0:
          this.reset();
          break;
        case 1:
          this.priceSort(1)
          break;
        case 2:
          this.priceSort(-1)
          break;
        default:

      }

    },
    async getAllGoods() {
      const url = this.$route.query.cid ? `/api/goods/allGoods?page=${this.currentPage}&size=${
          this.pageSize
        }&sort=${this.sort}&priceGt=${this.min}&priceLte=${this.max}&cid=${this.$route.query.cid}` : `/api/goods/allGoods?page=${this.currentPage}&size=${
          this.pageSize
        }&sort=${this.sort}&priceGt=${this.min}&priceLte=${this.max}`
      try {
        const res = await this.$http.get(url)

        this.allGoods = res.data.data
        this.total = res.data.total
        console.log('res.data', res.data);
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    //do something after creating vue instance
    this.getAllGoods();
  },
  components: {
    MallGoods,
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/style/mixin";
@import "../../assets/style/theme";

.nav {
    height: 60px;
    line-height: 60px;
    > div {
        display: flex;
        align-items: center;
        a {
            padding: 0 30px 0 0;
            height: 100%;
            @extend %block-center;
            font-size: 12px;
            color: #999;
            &.active {
                color: #5683ea;
            }
            &:hover {
                color: #5683ea;
            }
        }
        input {
            @include wh(80px, 30px);
            border: 1px solid #ccc;
        }
        input + input {
            margin-left: 10px;
        }
    }
    .price-interval {
        padding: 0 15px;
        @extend %block-center;
        input[type="number"] {
            border: 1px solid #ccc;
            text-align: center;
            background: none;
            border-radius: 5px;
        }
    }
}

.goods-box {
    overflow: hidden;
    > div {
        float: left;
        border: 1px solid #efefef;
    }
}

.no-info {
    padding: 100px 0;
    text-align: center;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    .no-data {
        align-self: center;
    }
}

.img-item {
    display: flex;
    flex-direction: column;
}

.el-pagination {
    align-self: flex-end;
    margin: 3vw 10vw 2vw;
}

.section {
    padding-top: 8vw;
    margin-bottom: -5vw;
    width: 1218px;
    align-self: center;
}

.recommend {
    display: flex;
    > div {
        flex: 1;
        width: 25%;
    }
}
</style>
