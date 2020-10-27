<template>
  <div class="Txs block">
    <Transactions ref="traModule" @traModule1="ajaxgetlist" :tableData="tableData" :total="total"></Transactions>
  </div>
</template>

<script>
import Transactions from "../../components/TransactionModule";
import { transactions } from "../../api/api";

export default {
  name: "transactions",
  components: {
    Transactions
  },
  created() {},
  mounted() {},
  methods: {
    ajaxgetlist(current, toPage) {
      if (toPage == 0) {
        this.endKey = 0;
        this.startKey = 0;
      }
      transactions(
        current,
        this.endKey,
        this.$refs.traModule.size,
        this.startKey,
        toPage
      ).then(res => {
        for (let obj of res.data.data.records) {
          obj.createTime = this.moment(obj.createTime * 1000).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        this.total = res.data.data.total;
        this.tableData = res.data.data.records;
        this.startKey = res.data.data.records[this.$refs.traModule.size - 1].id;
        this.endKey = res.data.data.records[0].id;
        this.current = this.toPage;
      });
    }
  },
  data() {
    return {
      endKey: 0,
      startKey: 0,
      total: 0,
      tableData: []
    };
  }
};
</script>

<style lang="less" >
</style>