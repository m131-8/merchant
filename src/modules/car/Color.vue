<template>
  <article>
    <header class="title-bar">
      <h2>请选择车身颜色</h2>
    </header>
    <div class="select-color-item">
      <ul>
        <li v-for="(item, index) in colorList" :key="index" @click.stop="selColor(item)">
          <a href="javascript:;" :class="`class_bg_${item.id}`">{{item.name}}</a>
        </li>
        <li @click.stop="selColor({id: 21, name: '多彩色'})">
          <a href="javascript:;" class="more_one">
            <span style="background-color: #1F7DD4;"></span>
            <span style="background-color: #B50109;"></span>
            <span style="background-color: #73A954;"></span>
            <span style="background-color: #D5B457;"></span>
          </a>
        </li>
      </ul>
    </div>
  </article>
</template>
<script>
import {
  Flexbox,
  FlexboxItem
} from 'cvux/src/components'
export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      colorList: [{
        id: 2,
        name: '白色'
      }, {
        id: 1,
        name: '黑色'
      }, {
        id: 4,
        name: '灰色'
      }, {
        id: 16,
        name: '绿色'
      }, {
        id: 3,
        name: '银色'
      }, {
        id: 15,
        name: '青色'
      }, {
        id: 20,
        name: '银灰色'
      }, {
        id: 8,
        name: '蓝色'
      }, {
        id: 19,
        name: '深灰色'
      }, {
        id: 14,
        name: '紫色'
      }, {
        id: 12,
        name: '米色'
      }, {
        id: 5,
        name: '红色'
      }, {
        id: 17,
        name: '香槟色'
      }, {
        id: 9,
        name: '栗色'
      }, {
        id: 10,
        name: '金色'
      }, {
        id: 7,
        name: '褐色'
      }, {
        id: 13,
        name: '黄色'
      }, {
        id: 18,
        name: '咖啡色'
      }, {
        id: 6,
        name: '棕色'
      }, {
        id: 11,
        name: '橙色'
      }]
    }
  },
  created() {},
  filters: {
  },
  methods: {
    selColor(item) {
      if (item) {
        this.$store.commit('updateColorId', item.id)
        this.$store.commit('updateColor', item.name)
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="less">
@import "../../stylesheets/modules/car/color";
  .select-color-item {
    padding: 30/@w2;
    background: #fff;
    border-top: 1px solid #E7E7E9;
    border-bottom: 1px solid #E7E7E9;
    ul {
      font-size: 0;
      margin-left: -48/@w2;
      overflow: hidden;
    }
    li {
      float: left;
      width: 50%;
      box-sizing: border-box;
      margin-bottom: 20/@w2;
      padding-left: 48/@w2;
    }

    a {
      border: 1px solid #eee;
      display: block;
      height: 68/@w2;
      color: #fff;
      line-height: 68/@w2;
      text-align: center;
      font-size: 30/@w2;
      border-radius: (4/@w2);
    }

    .class_bg_1 {
      background-color: #000;
    }
    .class_bg_2 {
      background-color: #D1D3D3;
      color: #000;
    }
    .class_bg_3 {
      background-color: #D1D3D3;
      color: #000;
    }
    .class_bg_4 {
      background-color: #DEDEDE;
      color: #000;
    }
    .class_bg_5 {
      background-color: #B50109;
    }
    .class_bg_6 {
      background-color: #C78457;
    }
    .class_bg_7 {
      background-color: #563A36;
    }
    .class_bg_8 {
      background-color: #1F7DD4;
    }
    .class_bg_9 {
      background-color: #6F2B28;
    }
    .class_bg_10 {
      background-color: #D5B457;
    }
    .class_bg_11 {
      background-color: #F48444;
    }
    .class_bg_12 {
      background-color: #FFFADD;
      color: #000;
    }
    .class_bg_13 {
      background-color: #FFD900;
      color: #000;
    }
    .class_bg_14 {
      background-color: #9E51A8;
    }
    .class_bg_15 {
      background-color: #B6EAEA;
      color: #000;
    }
    .class_bg_16 {
      background-color: #73A954;
    }
    .class_bg_17 {
      background-color: #CAB693;
    }
    .class_bg_18 {
      background-color: #894F34;
    }
    .class_bg_19 {
      background-color: #949293;
    }
    .class_bg_20 {
      background-color: #D1D3D3;
    }
    .more_one {
      position: relative;
      span {
        float: left;
        width: 50%;
        height: 50%;
      }
      &:before {
        position: absolute;
        top: 0;
        left: 35%;
        content: '多彩色';
      }
    }
    a:active {
      opacity: 0.7;
    }
  }
</style>
