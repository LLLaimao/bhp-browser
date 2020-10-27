<template>
  <div class="blockMessage block">
    <div class="blockMaseege1 topwarpper warpper">
      <div>
        <p>{{$t('message.text28')}}</p>
        <p class="overFlow">{{searchData.blockHash}}</p>
      </div>
    </div>
    <div class="warpper">
      <div class="btn">
        <el-button class="btn1" @click="btn1()">{{$t('message.text29')}}</el-button>
        <div>
          <el-button
            v-show="btnShow1"
            class="btn2"
            @click="btn2(`${searchData.previousBlockHash}`)"
          >{{$t('message.text30')}}</el-button>
          <el-button
            v-show="btnShow2"
            class="btn2"
            @click="btn3(`${searchData.nextBlockHash}`)"
          >{{$t('message.text301')}}</el-button>
        </div>
      </div>
      <ul v-loading="loading" class="Block-detailsTranUl">
        <li>
          <div class="divLi">
            <p>{{toThousands(searchData.blockHeight)}}</p>
            <span>{{$t('message.text27')}}</span>
          </div>
        </li>
        <li>
          <div class="divLi">
            <p>{{searchData.time}}</p>
            <span>{{$t('message.text17')}}</span>
          </div>
        </li>
        <li>
          <div class="divLi">
            <p>{{toThousands(searchData.size)}} Bytes</p>
            <span>{{$t('message.text18')}}</span>
          </div>
        </li>
        <li>
          <div class="divLi">
            <p>{{searchData.version}}</p>
            <span>{{$t('message.text21')}}</span>
          </div>
        </li>
        <li>
          <div class="divLi divLi1">
            <p class="Merkle">{{searchData.merkleRoot}}</p>
            <span>{{$t('message.text31')}}</span>
          </div>
        </li>
        <li>
          <div class="divLi">
            <p>{{toThousands(searchData.txNum)}}</p>
            <span>{{$t('message.text383')}}</span>
          </div>
        </li>
      </ul>
    </div>
    <Transactions ref="traModule" @traModule2="ajaxgetlist" :tableData="tableData" :total="total"></Transactions>
  </div>
</template>

<script>
import { search, getTxTransfersByBlock } from "../../api/api";
import Transactions from "../../components/TransactionModule";
export default {
  name: "blockMessage",
  components: {
    Transactions
  },
  data() {
    return {
      loading: true,
      searchData: {},
      msg: "区块",
      blockHeight: "",
      total: 0,
      tableData: [],
      flag: false,
      btnShow1: true,
      btnShow2: true
    };
  },
  methods: {
    btn1() {
      this.$router.push("/block");
    },
    btn2(val) {
      if (val) {
        this.loading = true;
        this.blockHeight = this.blockHeight - 1;
        this.$router.push({
          path: "/blockMessage",
          query: {
            blockMessage: this.blockHeight
          }
        });
        this.getSearch(val);
      }
    },
    btn3(val) {
      if (val) {
        this.loading = true;
        this.blockHeight = this.blockHeight + 1;
        this.$router.push({
          path: "/blockMessage",
          query: {
            blockMessage: this.blockHeight
          }
        });
        this.getSearch(val);
      }
    },
    getSearch(val) {
      search(val).then(res => {
        if (res.data.data.result) {
          this.searchData = res.data.data.result;
          if (this.searchData.nextBlockHash == null) {
            this.btnShow2 = false;
          } else {
            this.btnShow2 = true;
          }
          if (this.searchData.blockHeight == 0) {
            this.btnShow1 = false;
          } else {
            this.btnShow1 = true;
          }
          this.blockHeight = res.data.data.result.blockHeight;
          getTxTransfersByBlock(
            this.blockHeight,
            this.$refs.traModule.current,
            this.$refs.traModule.size
          ).then(res => {
            this.flag = true;
            if (res.data.data.records) {
              this.tableData = res.data.data.records;
              this.total = res.data.data.total;
            }
          });
          this.loading = false;
          this.searchData.time = this.moment(this.searchData.time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
      });
    },
    ajaxgetlist(current) {
      if (this.flag) {
        getTxTransfersByBlock(
          this.blockHeight,
          current,
          this.$refs.traModule.size
        ).then(res => {
          if (res.data.data.records) {
            this.tableData = res.data.data.records;
            this.total = res.data.data.total;
          }
        });
      }
    }
  },
  created() {
    if (this.$route.query.blockMessage) {
      this.getSearch(this.$route.query.blockMessage);
      this.loading = false;
    }
  }
};
</script>
<style lang="less" >
@import "../../assets/styles/blockMessage.less";

</style>