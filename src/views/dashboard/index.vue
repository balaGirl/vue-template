<template>
  <div>
    <canvas
      ref="canvas"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
    />
    <div>
      颜色：
      <el-input
        v-model="color"
        style="width: 100px"
        type="color"
        @change="changeColor"
      />
      粗细：<el-select
        v-model="size"
        style="width: 100px"
        placeholder="请选择"
        @change="changeSize"
      >
        <el-option
          v-for="item in [4, 8, 16, 24]"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button @click="reset">重置</el-button>
      <el-button @click="save">保存</el-button>
      <el-button @click="revoke">撤销</el-button>
    </div>
  </div>
</template>

<script>
import { getStroke } from "perfect-freehand";
import getSvgPathFromStroke from "./util";
const SIZE = 8; //画笔大小
const COLOR = "#000"; //画笔颜色
export default {
  data() {
    return {
      size: SIZE,
      color: COLOR,
      isDrawing: false,
      points: [], //当前绘制中的坐标点
      path: null, // 当前绘制中的线条路径
      pathAll: [], //所有绘制的坐标点
      canvas: null,
      ctx: null,
      options: {
        size: SIZE,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5,
      },
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.canvas.width = 500;
    this.canvas.height = 300;
    this.ctx = this.canvas.getContext("2d");
  },
  methods: {
    handlePointerDown(e) {
      this.isDrawing = true;
      e.target.setPointerCapture(e.pointerId);
      this.points = [[e.offsetX, e.offsetY, e.pressure]];
    },
    handlePointerMove(e) {
      if (e.buttons !== 1) return;
      this.points.push([e.offsetX, e.offsetY, e.pressure]);
      // 防止锯齿==start 1.清除画布 2.重新渲染直接的路径
      this.reRender();
      // ==end
      this.ctx.fillStyle = this.color; //设置当前画笔颜色
      const stroke = getStroke(this.points, this.options);
      const pathData = getSvgPathFromStroke(stroke);
      const myPath = new Path2D(pathData);
      this.ctx.fill(myPath);
      // 保存一下path
      this.path = myPath;
    },
    handlePointerUp() {
      this.isDrawing = false;
      this.pathAll.push({
        path: this.path,
        color: this.color,
      });
    },
    // 重新渲染画布
    reRender() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.pathAll.forEach((item) => {
        this.ctx.fillStyle = item.color; //设置画笔颜色
        this.ctx.fill(item.path); //填充路径
      });
    },
    // 重置
    reset() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.pathAll = [];
      this.points = [];
      this.size = SIZE;
      this.color = COLOR;
      this.options.size = this.size;
    },
    // 撤销
    revoke() {
      if (this.pathAll.length == 0) return;
      this.pathAll.pop();
      this.reRender();
    },
    // 保存
    save() {
      const dataURL = this.canvas.toDataURL("image/png");
      console.log("dataURL: ", dataURL);
    },
    changeColor(value) {
      this.color = value;
    },
    changeSize(value) {
      this.options.size = value;
    },
  },
};
</script>

<style>
canvas {
  border: 1px solid #000;
}
</style>
