<template>
  <div class="detailsTran">
    <div class="detailsTran1 topwarpper warpper">
      <p>{{$t('message.text201')}}: {{searchData.type}}</p>
      <p class="overFlow">{{$t('message.text382')}}: {{searchData.txid}}</p>
    </div>
    <div class="warpper">
      <ul v-loading="loading" class="Block-detailsTranUl">
        <li>
          <div class="divLi divLi1">
            <p
              @click="blockIndex(`${searchData.blockHeight}`)"
            >{{toThousands(searchData.blockHeight)}}</p>
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
            <p>{{toThousands(searchData.txFee)}}</p>
            <span>{{$t('message.text203')+ '（BHP）'}}</span>
          </div>
        </li>
        <li>
          <div class="divLi">
            <p>{{toThousands(searchData.netFee)}}</p>
            <span>{{$t('message.text32')+ '（GAS）'}}</span>
          </div>
        </li>
        <li>
          <div class="divLi">
            <p>{{toThousands(searchData.sysFee)}}</p>
            <span>{{$t('message.text33')+ '（GAS）'}}</span>
          </div>
        </li>
      </ul>

      <div class="fromTo" v-show="nullShow" v-loading="loading1">
        <div class="fromToLeft">
          <p>{{$t('message.text34')}}</p>
          <div v-for="(obj,i) of sentFrom" :key="i">
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
          <img src="../../assets/imgs/arrow.png" alt />
        </div>
        <div class="fromToRight">
          <p>{{$t('message.text35')}}</p>
          <div v-for="(obj,i) of sentTo" :key="i">
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

      <div class="fromTo" v-show="nullShow1" v-loading="loading1">
        <div class="fromToLeft">
          <p>{{$t('message.text34')}}</p>
          <div v-for="(obj,i) of sentFrom1" :key="i">
            <div class="fromToA">
              <span @click="registerAdd(`${obj.address}`)">{{obj.address}}</span>
            </div>
            <div class="fromToSpan">
              <span>{{obj.value}}</span>&nbsp;
              <span @click="assetInfo(obj.asset,obj.assetName)">{{obj.assetName}}</span>
            </div>
          </div>
        </div>
        <div class="fromToMiddle">
          <img src="../../assets/imgs/arrow.png" alt />
        </div>
        <div class="fromToRight">
          <p>{{$t('message.text35')}}</p>
          <div v-for="(obj,i) of sentTo1" :key="i">
            <div class="fromToA">
              <span @click="registerAdd(`${obj.address}`)">{{obj.address}}</span>
            </div>
            <div class="fromToSpan">
              <span>{{obj.value}}</span>&nbsp;
              <span @click="assetInfo(obj.asset,obj.assetName)">{{obj.assetName}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="remarks" v-for="(v,i) in remark" :key="i">
        <h2>
          <span>{{$t('message.text202')}}</span>
          <div v-show="ciphertext" class="encryption">
            <!-- <span v-show="encryption">{{$t('message.text63')}}</span> -->
            <img
              class="jiami"
              v-show="encryption"
              @click="open(v.id)"
              src="../../assets/imgs/jiami.png"
              alt
            />
            <img v-show="!encryption" src="../../assets/imgs/jiemi.png" alt />
          </div>
        </h2>
        <div v-loading="loading3" class="call">
          <p>{{v.attrUsage}}:</p>
          <p class="remark">{{v.attrData}}</p>
        </div>
      </div>
      <h2>{{$t('message.text36')}}</h2>
      <div v-loading="loading3" class="call">
        <p>PUSHBYTES64:</p>
        <p>{{invocation}}</p>
      </div>
      <h2>{{$t('message.text37')}}</h2>
      <div v-loading="loading4" class="verify">
        <p>PUSHBYTES32:</p>
        <p>{{verification}}</p>
      </div>
      <h2 v-show="scriptShow">Script</h2>
      <div v-show="scriptShow" class="callScript call">
        <p>{{searchData.script}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  txScript,
  txDetails,
  search,
  txAttributes,
  getTxDetailByScript,
  decrypt
} from "../../api/api";

export default {
  data() {
    return {
      loading: true,
      loading1: true,
      loading11: true,
      loading3: true,
      loading4: true,
      scriptShow: true,
      nullShow: true,
      nullShow1: false,
      searchData: {},
      sentFrom: [],
      sentTo: [],
      sentFrom1: [],
      sentTo1: [],
      invocation: "",
      verification: "",
      remark: [],
      params: {
        cipherText: "xxx",
        key: ""
      },

      success: "Decryption success",
      error: "Incorrect key, decryption failed",
      message1: "Please enter the key",
      message2: "enter",
      message3: "cancel",
      message4: "Enter only 8 character !",

      encryption: true, //图标切换
      ciphertext: false //判断是否需要解密
    };
  },
  created() {
    if (this.$route.query.detailsTran) {
      this.gettxDetails(this.$route.query.detailsTran);
      this.gettxScript(this.$route.query.detailsTran);
      this.getSearch();
      this.grtRemark(this.$route.query.detailsTran);
      this.loading = false;
    }
    if (localStorage.lang == "en") {
      this.success = "Decryption success";
      this.error = "Incorrect key, decryption failed";
      this.message1 = "Please enter the key";
      this.message2 = "enter";
      this.message3 = "cancel";
      this.message4 = "Enter only 8 character !";
    } else if (localStorage.lang == "cn") {
      this.success = "解密成功";
      this.error = "密钥不正确，解密失败";
      this.message1 = "请输入秘钥";
      this.message2 = "确定";
      this.message3 = "取消";
      this.message4 = "字符长度为8位！";
    }
  },
  methods: {
    open(id) {
      this.$prompt(this.message1, {
        confirmButtonText: this.message2,
        cancelButtonText: this.message3,
        inputPattern: /^.{8}$/,
        inputErrorMessage: this.message4
      })
        .then(({ value }) => {
          this.params.key = value;
          decrypt(this.params).then(res => {
            console.log(res.data.data);
            if (res.data.code == "200") {
              for (let obj of this.remark) {
                if (obj.id == id) {
                  obj.attrData = res.data.data;
                }
                //解密成功提示
                this.$message({
                  message: this.success,
                  offset: 70,
                  type: "success",
                  showClose: true
                });
                this.encryption = false; //解锁成功 切换图标
              }
            } else {
              //解密失败提示
              this.$message({
                message: this.error,
                offset: 70,
                type: "error",
                showClose: true
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    getSearch() {
      search(this.$route.query.detailsTran).then(res => {
        this.searchData = res.data.data.result;
        if (this.searchData.type == "InvocationTransaction") {
          this.InvocationTransaction(this.searchData.txid);
        }
        if (!this.searchData.script) {
          this.scriptShow = false;
        }
        this.loading = false;
        this.searchData.time = this.moment(this.searchData.time).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      });
    },
    InvocationTransaction(txid) {
      getTxDetailByScript(txid).then(res => {
        // console.log(res);
        this.sentFrom1 = res.data.data.sentFrom;
        this.sentTo1 = res.data.data.sentTo;
        if (this.sentFrom1.length == 0 && this.sentTo1.length == 0) {
          this.nullShow1 = false;
        } else {
          this.nullShow1 = true;
        }
        this.loading11 = false;
      });
    },
    grtRemark(val) {
      txAttributes(val).then(res => {
        this.remark = res.data.data;
        for (let obj of this.remark) {
          if (obj.attrData.slice(0, 10) == "ciphertext") {
            this.ciphertext = true;
            this.params.cipherText = obj.attrData.slice(10);
          }
        }
      });
    },
    gettxScript(val) {
      txScript(val).then(res => {
        if (res.data.data[0]) {
          this.invocation = res.data.data[0].invocation;
          this.verification = res.data.data[0].verification;
          this.loading3 = false;
          this.loading4 = false;
        } else if (!res.data.data[0]) {
          this.loading3 = false;
          this.loading4 = false;
        }
      });
    },
    gettxDetails(val) {
      txDetails(val).then(res => {
        this.sentFrom = res.data.data.sentFrom;
        this.sentTo = res.data.data.sentTo;
        if (this.sentFrom.length == 0 && this.sentTo.length == 0) {
          this.nullShow = false;
        } else {
          this.nullShow = true;
        }
        this.loading1 = false;
      });
    },
    registerAdd(val) {
      this.$router.push({
        path: "/registerAdd",
        query: {
          registerAdd: val
        }
      });
    },
    assetInfo(val, assetName) {
      if (assetName == "RUSD") {
        this.$router.push({
          path: "/contractMessage",
          query: {
            contractMessage: val
          }
        });
      } else {
        this.$router.push({
          path: "/assetInfo",
          query: {
            assetInfo: val
          }
        });
      }
    },
    blockIndex(val) {
      this.$router.push({
        path: "/blockMessage",
        query: {
          blockMessage: val
        }
      });
    }
  }
};
</script>
<style lang="less" >
@import "../../assets/styles/detailsTran.less";
.callScript {
  p {
    max-height: 190px;
    overflow: auto;
    word-wrap: break-word;
    margin-bottom: 0;
  }
}
.encryption {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  span {
    font-size: 14px;
  }
  img {
    width: 30px;
    height: 30px;
    padding: 0 5px;
  }
  .jiami {
    cursor: pointer;
  }
}
@media screen and (max-width: 1024px) {
  .el-message-box {
    width: 90%;
  }
  .encryption {
    padding-left: 10px;
  }
}
.remarks {
  h2 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>