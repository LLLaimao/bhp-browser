<template>
  <div class="block assets">
    <div class="NEWBLOCKS warpper">
      <span v-text="$t('message.text7')"></span>
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
      >
        <el-table-column prop="assetname" :label="$t('message.text711')" width="120"></el-table-column>
        <el-table-column prop="type" :label="$t('message.text20')" width="150"></el-table-column>
        <el-table-column width="150" :label="$t('message.text25')">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{toThousands(scope.row.supply)}}</div>
          </template>
        </el-table-column>
        <el-table-column width="130" :label="$t('message.text61')">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ toThousands(scope.row.addressNum)}}</div>
          </template>
        </el-table-column>
        <el-table-column width="150" :label="$t('message.text383')">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ toThousands(scope.row.transactions)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="registered" :label="$t('message.text26')"></el-table-column>
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
import { asset } from "../../api/api";

export default {
  data() {
    return {
      loading: true,
      current: 1,
      size: 10,
      total: 0,
      tableData: []
    };
  },
  created() {
    this.ajaxgetlist(this.current);
  },
  methods: {
    ajaxgetlist(current) {
      asset(current, this.size).then(res => {
        this.total = res.data.data.total;
        this.tableData = res.data.data.records;
        this.loading = false;
      });
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 5) {
        return "color:rgb(12, 108, 242);cursor:pointer";
      }
    },
    cellClick(row, column, cell, event) {
      if (column.property == "assetname") {
        this.$router.push({
          path: "/assetInfo",
          query: {
            assetInfo: row.asset
          }
        });
      }
      if (column.property == "registered") {
        if(row.registered){
          this.$router.push({
          path: "/registerAdd",
          query: {
            registerAdd: row.registered
          }
        });
        }
        
      }
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
</style>