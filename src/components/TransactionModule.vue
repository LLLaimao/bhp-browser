<template>
  <div class="block transactions">
    <div class="NEWBLOCKS warpper">
      <span v-text="$t('message.text5')"></span>
    </div>

    <el-card class="explorerTable warpper">
      <div class="fenPage warpper hide1">
        <div class="fenPageblock">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[5 ,10,20, 50,100]"
            :page-size="size"
            layout="prev, next,pager,sizes,total"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <el-table
        :data="tableData"
        v-loading="loading"
        style="width: 100%"
        :cell-style="cellStyle"
        @cell-click="cellClick"
        @expand-change="expandChange"
      >
        <el-table-column type="expand" width="40">
          <template slot-scope="scope">
            <div class="fromTo" v-loading="loading1">
              <div class="fromToLeft">
                <p>
                  {{$t('message.text34')}}
                  <span v-show="0">{{msg}}</span>
                </p>
                <div v-for="(obj,i) of scope.row.sentFrom" :key="i">
                  <div class="fromToA">
                    <span @click="registerAdd(`${obj.address}`)">{{obj.address}}</span>
                  </div>
                  <div class="fromToSpan">
                    <span>{{obj.value}}</span>&nbsp;
                    <span @click="assetInfo(obj.asset)">{{obj.assetName}}</span>
                  </div>
                </div>
              </div>
              <div class="fromToMiddle">
                <img src="../assets/imgs/arrow.png" alt />
              </div>
              <div class="fromToRight">
                <p>{{$t('message.text35')}}</p>
                <div v-for="(obj,i) of scope.row.sentTo" :key="i">
                  <div class="fromToA">
                    <span @click="registerAdd(`${obj.address}`)">{{obj.address}}</span>
                  </div>
                  <div class="fromToSpan">
                    <span>{{obj.value}}</span>&nbsp;
                    <span @click="assetInfo(obj.asset)">{{obj.assetName}}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="txid" :label="$t('message.text19')"></el-table-column>
        <el-table-column prop="type" :label="$t('message.text20')" width="180"></el-table-column>
        <el-table-column :label="$t('message.text18')" width="150">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ toThousands(scope.row.size)+' Bytes'}}</div>
          </template>
        </el-table-column>
        <el-table-column width="130" :label="$t('message.text27')">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ toThousands(scope.row.blockHeight)}}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('message.text17')" width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.time}}</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="fenPage warpper">
        <div class="fenPageblock">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[5 ,10,20, 50,100]"
            :page-size="size"
            layout="prev, next,pager,sizes,total"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { txDetails } from "../../src/api/api";

export default {
  props: ["tableData", "total"],
  data() {
    return {
      loading: true,
      current: 1,
      size: 10,
      toPage: 0,
      sentFrom: "",
      sentTo: "",
      msg: 1
    };
  },
  created() {},
  mounted() {
    this.$emit("traModule1", this.current, this.toPage);
    this.$emit("traModule2", this.current);
  },
  beforUpdate() {},

  updated() {
    if (this.tableData.length >= 0) {
      this.loading = false;
    } else {
      this.loading = true;
    }
  },
  methods: {
    handleCurrentChange(current) {
      this.$emit("traModule2", current);

      if (this.current == 0) {
        this.current = 1;
      }
      this.toPage = current;
      this.$emit("traModule1", this.current, this.toPage);
      this.current = current;
    },
    handleSizeChange(size) {
      this.size = size;
      this.current = 1;
      // this.endKey = 0;
      // this.startKey = 0;
      this.toPage = 0;
      this.$emit("traModule1", this.current, this.toPage);
      this.$emit("traModule2", this.current);
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return "color:rgb(12, 108, 242);cursor:pointer";
      }
      if (columnIndex === 2 && row.type === "ContractTransaction") {
        return "color:#00af92";
      }
      if (columnIndex === 2 && row.type === "MinerTransaction") {
        return "color:#c9c42f";
      }
      if (columnIndex === 2 && row.type === "RegisterTransaction") {
        return "color:rgb(179, 43, 40)";
      }
      if (columnIndex === 2 && row.type === "IssueTransaction") {
        return "color:rgb(197, 55, 162)";
      }
      if (columnIndex === 2 && row.type === "ClaimTransaction") {
        return "color:rgb(61, 155, 195)";
      }
      if (columnIndex === 2 && row.type === "EnrollmentTransaction") {
        return "color:rgb(40, 40, 40)";
      }
      if (columnIndex === 2 && row.type === "InvocationTransaction") {
        return "color:rgb(139, 100, 208)";
      }
      if (columnIndex === 2 && row.type === "StateTransaction") {
        return "color:#ff6700";
      }
      if (columnIndex === 2 && row.type === "PublishTransaction") {
        return "color:rgb(199, 106, 56)";
      }
    },
    cellClick(row, column, cell, event) {
      if (column.property == "txid") {
        this.$router.push({
          path: "/detailsTran",
          query: {
            detailsTran: row.txid
          }
        });
      }
    },
    async expandChange(row, expandedRows) {
      if (!row.sentFrom) {
        this.loading1 = true;
      }
      await this.gettxDetails(row);
      this.loading1 = false;
    },

    gettxDetails(row) {
      if (!row.sentFrom) {
        txDetails(row.txid).then(res => {
          for (let obj of this.tableData) {
            if (obj.txid === row.txid) {
              this.sentFrom = res.data.data.sentFrom;
              this.sentTo = res.data.data.sentTo;
              obj.sentFrom = this.sentFrom;
              obj.sentTo = this.sentTo;
              this.msg++;
            }
          }
        });
      }
    },

    registerAdd(val) {
      this.$router.push({
        path: "/registerAdd",
        query: {
          registerAdd: val
        }
      });
      if (val == this.$route.query.registerAdd) {
        this.$router.go(0);
      }
    },
    assetInfo(val) {
      this.$router.push({
        path: "/assetInfo",
        query: {
          assetInfo: val
        }
      });
    }
  }
};
</script>

<style lang="less" >
.transactions {
  min-height: 0 !important;
  .explorerTable {
    .el-table__expanded-cell {
      padding: 0 10px;
    }
    .fromTo {
      margin: 0;
      box-shadow: none;
    }
  }
  
}
</style>