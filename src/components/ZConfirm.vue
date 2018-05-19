<template>
  <div class='tip-login' v-if="_show">
    <div class='bg-filter'></div>
    <div class='tip-filter-box'>
      <h3 class='title'><slot></slot></h3>
      <div class='btn-confirm'>
        <a id='cancel' class='btn btn-cancel' @click.stop="cancel">取消</a><a id='sure' class='btn' @click="sure">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ZConfirm',
    props: ['show'],
    data() {
      return {}
    },
    computed: {
      _show: {
        get() {
          return this.show
        },
        set(val) {
          this.$emit('update:show', val)
        }
      }
    },
    methods: {
      cancel() {
        this.$emit('update:show', false)
        this.$emit('cancel')
      },
      sure() {
        this.$emit('update:show', false)
        this.$emit('sure')
      }
    }
  }
</script>

<style lang="less">
@import "../stylesheets/base/fn";
.tip-login .tip-filter-box {
    padding: 20/@w2;
  .title {
    text-align: center;
    font-size: 30/@w2;
    margin: 74/@w2 0 84/@w2;
  }
}

.btn-confirm {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    -webkit-box-align: center;
    box-align: center;
    margin-left: -10/@w2;
  .btn {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-left: 10/@w2;
    display: block;
    box-sizing: border-box;
  .radius(8/@w2);
  }
  .btn-cancel {
    background: #fff;
    border: 1px solid #3b5999;
    color: #3b5999;
  }
}

.tip-filter-box {
  z-index: 126;
  border-radius: 16/@w2;
  background: #fff;
  padding: 16/@w2 0 16/@w2 0;
  position: fixed;
  width: 84%;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  margin: 0 -42%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
}

//弹层部分
.bg-filter {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  background: #000;
  opacity: .4;
  z-index: 125;
  overflow: hidden;
}

</style>
