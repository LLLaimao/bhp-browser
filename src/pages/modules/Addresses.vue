<template>
  <div class="block addresses">
    <div class="NEWBLOCKS warpper">
      <span v-text="$t('message.text6')"></span>
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
        <el-table-column prop="address" :label="$t('message.text06')"></el-table-column>
        <el-table-column width="230" :label="$t('message.text23')">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.firstTime }}</div>
          </template>
        </el-table-column>
        <el-table-column width="230" :label="$t('message.text24')">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.lastTime}}</div>
          </template>
        </el-table-column>

        <el-table-column width="200" :label="$t('message.text383')">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ toThousands(scope.row.txNum)}}</div>
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
import { address } from "../../api/api";

export default {
  data() {
    return {
      loading: true,
      current: 1,
      size: 10,
      total: 0,
      input: "",
      tableData: []
    };
  },
  created() {
    this.ajaxgetlist(this.current);
  },
  methods: {
    ajaxgetlist(current) {
      address(current, this.size).then(res => {
        this.total = res.data.data.total;
        this.tableData = res.data.data.records;
        this.loading = false;
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