<template>
  <div class="colors">
    {{placeholder}}
    <div class="d-flex">
      <label :for="id" :style="{'--color': colorSelected}">
        <input type="color" v-model="colorSelected" :id="id">
      </label>
      <div class="bar"></div>
      <label
        v-for="(color, i) in recommendedColors" :key="i"
        role="button" :for="id"
        :style="{ '--color': color }"
        @click="selectRecommendedColor(color)" 
      ></label>
    </div>
  </div>
</template>
<script lang="js">
export default {
  props: {
    placeholder: {
      type: String,
      default: 'color'
    },
  },
  data: ()=>({
    id: '',
    recommendedColors: [
      '#f55e5c',
      '#3ac0ff',
      '#77df40',
      'transparent',
      '#f4c837',
      '#c56dfb',
      '#ff6c00',
      '#ff4081',
      '#09c097',
      '#f66',
      '#57dc90',
		],
    colorSelected: 'transparent'
  }),
  beforeMount(){
    this.id = `${Math.random()}`
  },
  methods: {
    selectRecommendedColor(color) {
			this.colorSelected = color
		},
  },
  watch: {
    colorSelected(val) {
      this.$emit('change', val);
    }
  }
}
</script>
<style scoped>
  .colors {
    overflow-x: scroll;
    display: flex;
    flex-wrap: wrap;
    padding: 5px 0;
  }
  .colors label {
    border: 1px solid rgba(110, 106, 106, 0.349);
    border-radius: 50%;
    margin: 0 5px;
    width: 40px;
    height: 40px;
    background-color: var(--color);
  }
  .colors label input {
    visibility: hidden;
  }
  .colors .bar {
    height: 100%;
    border: 1px solid rgb(131, 129, 129);
  }
  ::-webkit-scrollbar {
    height: 10px;
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #11c900;
    box-shadow: inset 0 0 6px rgba(0,0,0,.5);
    max-height: 10px;
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
  }
</style>