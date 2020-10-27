<template>
  <div class="assetInfo block">
    <div class="assetMessge topwarpper warpper">
      <p>{{$t('message.text39')}}</p>
      <p class="overFlow">{{records.asset}}</p>
    </div>
    <div class="warpper">
      <ul v-loading="loading" class="assetUl">
        <li>
          <label>{{$t('message.text40')}}:</label>
          {{records.assetname}}
        </li>
        <li>
          <label>{{$t('message.text41')}}:</label>
          {{toThousands(records.supply)}}
        </li>
        <li>
          <label>{{$t('message.text20')}}:</label>
          {{records.type}}
        </li>
        <li>
          <label>{{$t('message.text61')}}:</label>
          {{toThousands(records.addressNum)}}
        </li>
        <li>
          <label>{{$t('message.text4')}}:</label>
          <span class="assetActive" @click="blockIndex(records.blockHash)">{{records.blockHash}}</span>
        </li>
        <li>
          <label>{{$t('message.text383')}}:</label>
          {{toThousands(records.transactions)}}
        </li>
        <li>
          <label>{{$t('message.text42')}}:</label>
          {{records.precision}}
        </li>
        <li>
          <label>{{$t('message.text17')}}:</label>
          {{records.blockTime}}
        </li>
        <li class="li2">
          <label>{{$t('message.text43')}}:</label>
          <span class="assetActive" @click="registerAdd(records.registered)">{{records.registered}}</span>
        </li>
      </ul>
      <p class="assetRank">{{$t('message.text45')}}</p>

      <el-card v-loading="loading1" class="assetInfoTable">
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
        <el-table
          :data="tableData"
          style="width: 100% "
          :cell-style="cellStyle"
          @cell-click="cellClick"
        >
          <el-table-column prop="address" :label="$t('message.text6')"></el-table-column>
          <el-table-column :label="$t('message.text7')">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">{{ toThousands(scope.row.balance)}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getAssetById, topAddress } from "../../api/api";

export default {
  data() {
    return {
      loading: true,
      loading1: true,
      current: 1,
      size: 10,
      total: 0,
      records: {},
      tableData: []
    };
  },
  created() {
    this.getAssetMessage();
    this.ajaxgetlist(this.current);
  },
  methods: {
    getAssetMessage() {
      getAssetById(this.$route.query.assetInfo).then(res => {
        this.records = res.data.data;
        this.loading = false;
      });
    },
    ajaxgetlist(current) {
      topAddress(current, this.size, this.$route.query.assetInfo).then(res => {
        this.tableData = res.data.data.records;
        this.loading1 = false;
        this.total = res.data.data.total;
      });
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "color:rgb(12, 108, 242);cursor:pointer";
      }
    },
    cellClick(row, column, cell, event) {
      if (column.property == "address") {
        this.$router.push({
          path: "/registerAdd",
          query: {
            registerAdd: row.address
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
    },
    blockIndex(val) {
      this.$router.push({
        path: "/blockMessage",
        query: {
          blockMessage: val
        }
      });
    },
    handleCurrentChange(current) {
      this.current = current;
      this.ajaxgetlist(current);
    },
    handleSizeChange(size) {
      this.size = size;
      this.ajaxgetlist(this.current);
    }
  }
};
</script>

<style lang="less" >
@import "../../assets/styles/assetInfo.less";
</style>