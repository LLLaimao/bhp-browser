<template>
  <div class="home">
    <div class="mainTop">
      <div class="warpper">
        <h2 class>
          <span v-text="$t('message.text1')"></span>
        </h2>
        <p v-text="$t('message.text2')"></p>
        <div class="inp">
          <el-input v-model="keyword" @change="getsearch()" :placeholder="$t('message.text8')"></el-input>
          <span class="search1">
            <img src="../../assets/imgs/search.png" alt />
          </span>
        </div>
      </div>
    </div>
    <div class="mainBottom">
      <div class="boxCard warpper">
        <el-row :gutter="20">
          <el-col :sm="12" :lg="6" :xl="6">
            <div @click="details('block')">
              <el-card class="box-card">
                <p>
                  <img src="../../assets/imgs/block.png" alt />
                </p>
                <p>
                  <span>{{$t('message.text11')}}</span>
                  <br />
                  {{blockCounts}}
                </p>
              </el-card>
            </div>
          </el-col>
          <el-col :sm="12" :lg="6" :xl="6">
            <div @click="details('assets')">
              <el-card class="box-card">
                <p>
                  <img src="../../assets/imgs/asset.png" alt />
                </p>
                <p>
                  <span>{{$t('message.text12')}}</span>
                  <br />
                  {{assetCounts}}
                </p>
              </el-card>
            </div>
          </el-col>
          <el-col :sm="12" :lg="6" :xl="6">
            <div @click="details('transactions')">
              <el-card class="box-card">
                <p>
                  <img src="../../assets/imgs/tra.png" alt />
                </p>
                <p>
                  <span>{{$t('message.text13')}}</span>
                  <br />
                  {{txCounts}}
                </p>
              </el-card>
            </div>
          </el-col>
          <el-col :sm="12" :lg="6" :xl="6">
            <div @click="details('addresses')">
              <el-card class="box-card">
                <p>
                  <img src="../../assets/imgs/address.png" alt />
                </p>
                <p>
                  <span>{{$t('message.text14')}}</span>
                  <br />
                  {{addressCounts}}
                </p>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { index, search } from "../../api/api";

export default {
  data() {
    return {
      blockCounts: "",
      addressCounts: "",
      screenWidth: "",
      txCounts: "",
      assetCounts: "",
      keyword: "",
      msg:
        "Sorry, Your search height, hash, address or transaction id does not exist!"
    };
  },
  created() {
    this.getindex();
    localStorage.lang == undefined ? "en" : localStorage.lang;
    if (localStorage.lang == "en") {
      this.msg =
        "Sorry, Your search height, hash, address or transaction id does not exist!";
    } else if (localStorage.lang == "cn") {
      this.msg = "对不起, 您查找的区块高度、哈希、地址或交易 ID 不存在!";
    }
  },
  methods: {
    getindex() {
      index().then(res => {
        const data = res.data.data;
        this.blockCounts = this.toThousands(data.blockCounts);
        this.addressCounts = this.toThousands(data.addressCounts);
        this.txCounts = this.toThousands(data.txCounts);
        this.assetCounts = this.toThousands(data.assetCounts);
      });
    },
    getsearch() {
      search(this.keyword).then(res => {
        if (res.data.data) {
          const data = res.data.data.resultType;
          localStorage.setItem(
            "searchData",
            JSON.stringify(res.data.data.result)
          );
          if (data == 1) {
            this.$router.push({
              path: "/blockMessage",
              query: {
                blockMessage: this.keyword
              }
            });
          }
          if (data == 2) {
            this.$router.push({
              path: "/detailsTran",
              query: {
                detailsTran: this.keyword
              }
            });
          }
          if (data == 3) {
            this.$router.push({
              path: "/registerAdd",
              query: {
                registerAdd: this.keyword
              }
            });
          }
          this.keyword = "";
        } else {
          this.$message({
            message: this.msg,
            offset: 70,
            type: "error",
            showClose: true
          });
        }
      });
    },
    details(hash) {
      this.$router.push("/" + `${hash}`);
    }
  }
};
</script>

<style lang="less" >
@import "../../assets/styles/home.less";
</style>