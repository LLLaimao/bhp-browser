<template>
  <div class="block warpper">
    <div class="NEWBLOCKS warpper">{{$t('message.text47')}}</div>
    <el-card class="explorerTable">
      <div class="fenPage hide1">
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
        <el-table-column prop="contractHash" :label="$t('message.text48')"></el-table-column>

        <el-table-column :label="$t('message.text49')">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.contractAssetName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="author" :label="$t('message.text50')"></el-table-column>
      </el-table>
      <div class="fenPage">
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
import { getContracts } from "../../api/api";
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
      getContracts(current, this.size).then(res => {
        if (res.data.data) {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total
        }
        this.loading = false;
      });
    },
    handleCurrentChange(current) {
      this.current = current;
      this.ajaxgetlist(current);
    },
    handleSizeChange(size) {
      this.size = size;
      this.ajaxgetlist(this.current);
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "color:rgb(12, 108, 242);cursor:pointer";
      }
    },
    cellClick(row, column, cell, event) {
      if (column.property == "contractHash") {
        localStorage.setItem("contractRow", JSON.stringify(row));
        this.$router.push({
          path: "/contractMessage"
        });
      }
    }
  }
};
</script>

<style lang="less" >
</style>