<template>
  <div class="assetInfo block">
    <div class="assetMessge topwarpper warpper">
      <p>{{$t('message.text48')}}</p>
      <p class="overFlow">{{records.contractHash}}</p>
    </div>
    <div class="warpper">
      <ul class="assetUl">
        <li>
          <label>{{$t('message.text51')}}:</label>
          {{records.contractHash}}
        </li>
        <li>
          <label>{{$t('message.text52')}}:</label>
          {{records.version}}
        </li>
        <li>
          <label>{{$t('message.text49')}}:</label>
          {{records.contractAssetName}}
        </li>

        <li>
          <label>{{$t('message.text54')}}:</label>
          {{records.parameters}}
        </li>
        <li>
          <label>{{$t('message.text55')}}:</label>
          <span>{{records.returnType}}</span>
        </li>
        <li>
          <label>{{$t('message.text56')}}:</label>
          {{records.codeVersion}}
        </li>
        <li>
          <label>{{$t('message.text57')}}:</label>
          {{records.author}}
        </li>
        <li>
          <label>{{$t('message.text58')}}:</label>
          {{records.email}}
        </li>
        <li>
          <label>{{$t('message.text59')}}:</label>
          <span>{{records.description}}</span>
        </li>
        <li>
          <label>{{$t('message.text60')}}:</label>
          <span>{{records.properties}}</span>
        </li>
        <!-- <li>
          <label>{{$t('message.text61')}}:</label>
          <span >{{records.registered}}</span>
        </li>
        <li>
          <label>{{$t('message.text62')}}:</label>
          <span >{{records.blockHeight}}</span>
        </li>-->
      </ul>
      <h2>{{$t('message.text53')}}</h2>
      <div class="contractScript call">
        <p>{{records.script}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 1,
      size: 10,
      total: 0,
      records: []
    };
  },
  created() {
    this.records = JSON.parse(localStorage.getItem("contractRow"));
  },
  methods: {}
};
</script>

<style lang="less" >
@import "../../assets/styles/assetInfo.less";
.assetUl {
  li {
    width: 100% !important;
  }
}
.contractScript {
    
  p {
    height: 190px;
    overflow: auto;
    word-wrap: break-word;
    margin-bottom: 0;
  }
}
</style>