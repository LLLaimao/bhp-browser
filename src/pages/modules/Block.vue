<template>
  <div class="block warpper">
    <div class="NEWBLOCKS warpper">{{$t('message.text4')}}</div>
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
        <el-table-column width="150" :label="$t('message.text27')">
          <template slot-scope="scope">
            <div
              slot="reference"
              class="name-wrapper"
              @click="ToBlockMessge(scope.$index, scope.row)"
            >{{ toThousands(scope.row.blockHeight)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="txNum" :label="$t('message.text383')" width="180"></el-table-column>
        <el-table-column width="180" :label="$t('message.text17')">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.time}}</div>
          </template>
        </el-table-column>
        <el-table-column width="150" :label="$t('message.text18')">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ toThousands(scope.row.size)+' Bytes'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="blockHash" :label="$t('message.text46')"></el-table-column>
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
import { blocks } from "../../api/api";
export default {
  data() {
    return {
      loading: true,
      current: 1,
      size: 10,
      endKey: 0,
      startKey: 0,
      toPage: 0,
      total: 0,
      tableData: []
    };
  },
  created() {
    this.ajaxgetlist(
      this.current,
      this.endKey,
      this.size,
      this.startKey,
      this.toPage
    );
  },
  methods: {
    ajaxgetlist(current, endKey, size, startKey, toPage) {
      blocks(current, endKey, size, startKey, toPage).then(res => {
        this.total = res.data.data.total;
        this.tableData = res.data.data.records;
        this.loading = false;
        this.startKey = res.data.data.records[this.size - 1].blockHeight;
        this.endKey = res.data.data.records[0].blockHeight;
        this.current = this.toPage;
        for (var obj of this.tableData) {
          obj.time = this.moment(obj.time).format("YYYY-MM-DD HH:mm:ss");
        }
      });
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 4) {
        return "color:rgb(12, 108, 242);cursor:pointer";
      }
    },
    cellClick(row, column, cell, event) {
      if (column.property == "blockHash") {
        this.$router.push({
          path: "/blockMessage",
          query: {
            blockMessage: row.blockHeight
          }
        });
      }
    },
    ToBlockMessge(index, row) {
      this.$router.push({
        path: "/blockMessage",
        query: {
          blockMessage: row.blockHeight
        }
      });
    },
    handleCurrentChange(current) {
      if (this.current == 0) {
        this.current = 1;
      }
      this.toPage = current;
      this.ajaxgetlist(
        this.current,
        this.endKey,
        this.size,
        this.startKey,
        this.toPage
      );
      this.current = current;
    },
    handleSizeChange(size) {
      this.size = size;
      this.current = 1;
      this.endKey = 0;
      this.startKey = 0;
      this.toPage = 0;
      this.ajaxgetlist(
        this.current,
        this.endKey,
        this.size,
        this.startKey,
        this.toPage
      );
    }
  }
};
</script>

<style lang="less" >
</style>