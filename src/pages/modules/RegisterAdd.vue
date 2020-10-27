<template>
  <div class="registerAdd block">
    <div class="addressesMaseege warpper">
      <p>{{$t('message.text38')}}</p>
      <p class="overFlow">{{$route.query.registerAdd}}</p>
    </div>
    <div class="warpper">
      <ul v-loading="loading" class="registerUl">
        <li v-for="(obj,i) in searchData" :key="i">
          <div>
            <p>{{obj.value}}</p>
            <p>{{obj.assetName}}</p>
          </div>
        </li>
      </ul>
    </div>
    <Transactions ref="traModule" @traModule2="ajaxgetlist" :tableData="tableData" :total="total"></Transactions>
  </div>
</template>

<script>
import Transactions from "../../components/TransactionModule";
import {
  getAddressBalance,
  search,
  getTransactionByAddress
} from "../../api/api";

export default {
  name: "registerAdd",
  components: {
    Transactions
  },
  data() {
    return {
      loading: true,
      tableData: [],
      total: 0,
      searchData: [],
      balances1: [{ assetName: "无资产" }],
      searchKey: "",
      filter:{
      time: "",
      }
    };
  },
  methods: {
    ajaxgetlist(current) {
      getTransactionByAddress(
        current,
        this.$refs.traModule.size,
        this.$route.query.registerAdd,
        this.filter
      ).then(res => {
        this.total = res.data.data.total;
        this.tableData = res.data.data.records;
        this.loading = false;
      });
    },
    getSearch(val) {
      this.$route.query.registerAdd = val;
      getAddressBalance(val).then(res => {
        this.searchData = res.data.data;
        this.loading = false;
        if (this.searchData.length == 0) {
          this.searchData = this.balances1;
        }
      });
    },
    getUrlKey(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    }
  },
  created() {
    if(this.getUrlKey("date")){
      this.filter.time = this.moment(this.getUrlKey("date")).format(
          "YYYY-MM-DD HH:mm:ss"
        )
    }else{
    this.filter.time = this.getUrlKey("date")

    }
    
    console.log(this.filter.time);
    if (this.$route.query.registerAdd) {
      this.getSearch(this.$route.query.registerAdd);
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == from.name) {
        this.$router.go(0);
      }
    }
  }
};
</script>

<style lang="less" >
@import "../../assets/styles/registerAdd.less";
</style>