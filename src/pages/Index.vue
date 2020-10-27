<template>
  <div class="indexMain">
    <div class="headerFixed" id="headerFixed">
      <div class="header">
        <div class="backImg" @click="backImg()" v-show="!hide3">
          <img src="../assets/imgs/back.png" alt />
        </div>

        <span v-show="!hide3" class="img" @click="backHome()">
          <img src="../assets/imgs/logo_big.png" alt />
        </span>
        <span v-show="hide3" class="img1" @click="backHome()">
          <img src="../assets/imgs/logo4.png" alt />
        </span>
        <div class="headerSlect" v-show="!hide3">
          <img @click="menuTab()" src="../assets/imgs/menu.png" alt />
          <ul class="headerul" @click="downHide()" v-show="menu">
            <li>
              <router-link to="/" v-text="$t('message.text3')"></router-link>
            </li>
            <li>
              <router-link to="/block" v-text="$t('message.text4')"></router-link>
            </li>
            <li>
              <router-link to="/transactions" v-text="$t('message.text5')"></router-link>
            </li>
            <li>
              <router-link to="/addresses" v-text="$t('message.text6')"></router-link>
            </li>
            <li>
              <router-link to="/assets" v-text="$t('message.text7')"></router-link>
            </li>
          </ul>
          <div class="showDropdown" @click="menuTab()" v-show="menu"></div>
        </div>
        <div class="routerSearch" v-show="hide3">
          <ul class="router" v-show="hide3">
            <li>
              <router-link to="/" v-text="$t('message.text3')" :class="tab=='首页'?'aActive':''"></router-link>
            </li>
            <li>
              <router-link to="/block" v-text="$t('message.text4')" :class="tab=='区块'?'aActive':''"></router-link>
            </li>
            <li>
              <router-link
                to="/transactions"
                v-text="$t('message.text5')"
                :class="tab=='交易'?'aActive':''"
              ></router-link>
            </li>
            <li>
              <router-link
                to="/addresses"
                v-text="$t('message.text6')"
                :class="tab=='地址'?'aActive':''"
              ></router-link>
            </li>
            <li>
              <router-link
                to="/assets"
                v-text="$t('message.text7')"
                :class="tab=='资产'?'aActive':''"
              ></router-link>
            </li>
            <!-- <li>
              <router-link
                to="/contracts"
                v-text="$t('message.text47')"
                :class="tab=='合约资产'?'aActive':''"
              ></router-link>
            </li> -->
          </ul>
          <div class="indexSerch" v-show="hide2">
            <el-input
              class="indexInput"
              v-model="keyword1"
              @change="getsearch()"
              :placeholder="$t('message.text8')"
            ></el-input>
            <span class="search">
              <img src="../assets/imgs/search.png" alt />
            </span>
          </div>
        </div>
        <el-select
          class="select"
          v-show="hide1"
          @change="langChange"
          v-model="selectValue"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="routerView">
      <router-view />
    </div>
    <div class="footer">
      <div class="footerdiv">
        <el-select
          class="select"
          v-show="!hide1"
          @change="langChange"
          v-model="selectValue"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <p>CopyRight © 2017 - 2020 bhpa.io All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { search } from "../api/api";
export default {
  data() {
    return {
      hide1: true,
      hide2: true,
      hide3: true,
      menu: false,
      screenWidth: "",
      selectValue: "",
      value: "",
      tab: "首页",
      keyword1: "",
      options: [
        {
          value: "cn",
          label: "中文"
        },
        {
          value: "en",
          label: "English"
        }
      ],
      msg:
        "Sorry, Your search height, hash, address or transaction id does not exist!"
    };
  },
  created() {
    this.selectValue =
      localStorage.lang == undefined ? "en" : localStorage.lang;
    if (localStorage.lang == "en") {
      this.msg =
        "Sorry, Your search height, hash, address or transaction id does not exist!";
    } else if (localStorage.lang == "cn") {
      this.msg = "对不起, 您查找的区块高度、哈希、地址或交易 ID 不存在!";
    }

    if (this.$route.name == "blockMessage") {
      this.tab = "区块";
    } else if (this.$route.name == "detailsTran") {
      this.tab = "交易";
    } else if (this.$route.name == "registerAdd") {
      this.tab = "地址";
    } else if (this.$route.name == "assetInfo") {
      this.tab = "资产";
    } else if (this.$route.name == "contracts") {
      this.tab = "合约资产";
    } else {
      switch (location.hash.replace("#", "")) {
        case "/home":
          this.tab = "首页";
          break;
        case "/block":
          this.tab = "区块";
          break;
        case "/blockMessage":
          this.tab = "区块";
          break;
        case "/transactions":
          this.tab = "交易";
          break;
        case "/detailsTran":
          this.tab = "交易";
          break;
        case "/addresses":
          this.tab = "地址";
          break;
        case "/registerAdd":
          this.tab = "地址";
          break;
        case "/assets":
          this.tab = "资产";
          break;
        case "/assetInfo":
          this.tab = "资产";
          break;
        case "/contracts":
          this.tab = "合约资产";
          break;
        case "/contractMessage":
          this.tab = "合约资产";
          break;

        default:
          this.tab = location.hash.replace("#", "");
          break;
      }
    }
  },
  mounted() {
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
      })();
    };
  },
  watch: {
    screenWidth: {
      handler(newVal, objVal) {
        if (newVal < 1000) {
          this.hide1 = false;
        } else this.hide1 = true;
        if (newVal < 750) {
          this.hide2 = false;
        } else this.hide2 = true;
        if (newVal <= 600) {
          this.hide3 = false;
        } else this.hide3 = true;
      }
    },
    $route(to, from) {
      this.menu = false;
      switch (to.name) {
        case "home":
          this.tab = "首页";
          break;
        case "block":
          this.tab = "区块";
          break;
        case "blockMessage":
          this.tab = "区块";
          break;
        case "transactions":
          this.tab = "交易";
          break;
        case "detailsTran":
          this.tab = "交易";
          break;
        case "addresses":
          this.tab = "地址";
          break;
        case "registerAdd":
          this.tab = "地址";
          break;
        case "assets":
          this.tab = "资产";
          break;
        case "assetInfo":
          this.tab = "资产";
          break;
        case "contracts":
          this.tab = "合约资产";
          break;
        case "/contractMessage":
          this.tab = "合约资产";
          break;
        default:
          this.tab = location.hash.replace("#", "");
          break;
      }
    }
  },
  methods: {
    backHome() {
      this.$router.push("/");
    },
    downHide() {
      this.menu = false;
    },
    backImg() {
      this.$router.back(-1);
    },
    menuTab() {
      this.menu = !this.menu;
    },
    langChange(e) {
      localStorage.setItem("lang", e);
      this.$i18n.locale = e;
      window.location.reload();
    },
    getsearch() {
      search(this.keyword1).then(res => {
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
                blockMessage: this.keyword1
              }
            });
            if (this.keyword1 == this.$route.query.blockMessage) {
              this.$router.go(0);
            }
          }
          if (data == 2) {
            this.$router.push({
              path: "/detailsTran",
              query: {
                detailsTran: this.keyword1
              }
            });
            if (this.keyword1 == this.$route.query.detailsTran) {
              this.$router.go(0);
            }
          }
          if (data == 3) {
            this.$router.push({
              path: "/registerAdd",
              query: {
                registerAdd: this.keyword1
              }
            });
            if (this.keyword1 == this.$route.query.registerAdd) {
              this.$router.go(0);
            }
          }
        } else {
          this.$message({
            message: this.msg,
            offset: 70,
            type: "error",
            showClose: true
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../assets/styles/index.less";
</style>