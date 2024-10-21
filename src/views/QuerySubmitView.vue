<template>
  <!-- 全屏滚动效果 -->
  <el-scrollbar height="100vh" v-loading="loading">
    <el-container
      class="bg-gray-100 flex items-center justify-center min-h-screen"
    >
      <el-main class="w-full p-8 bg-white shadow-lg rounded-lg">
        <!-- 标题Travel Plan -->
        <el-row
          class="flex justify-center"
          style="margin-bottom: 2rem; margin-top: 2.3rem"
        >
          <h1
            class="text-3xl font-bold mb-4 text-blue-900 text-center"
            style="font-weight: 700; font-size: 3.4rem"
          >
            Travel Plan
          </h1>
        </el-row>
        <!-- 起始城市、目的城市、人数、天数card -->
        <el-row :gutter="20" style="margin-bottom: 1.5rem">
          <el-col :span="2"></el-col>
          <el-col :span="9" style="margin-right: 0rem">
            <!-- 起始城市、目的城市  -->
            <el-card
              class="bg-blue-100 p-4 rounded-lg mb-6"
              style="background: #cfdfe4; border-radius: 2cap"
            >
              <el-row
                :gutter="20"
                style="margin-left: 1cap; margin-top: 0.6cap"
              >
                <el-col :span="24">
                  <el-form-item
                    label="起始城市"
                    label-position="top"
                    label-width="200px"
                  >
                    <el-input
                      v-model="form.startCity"
                      placeholder="例如：北京"
                      style="
                        width: 15rem;
                        margin-left: 1.5rem;
                        border-radius: 2cap !important;
                      "
                      size="large"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="目的城市"
                    label-position="top"
                    label-width="200px"
                  >
                    <el-input
                      style="width: 15rem; margin-left: 1.5rem"
                      size="large"
                      v-model="form.destinationCity"
                      placeholder="例如：南京"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="1"></el-col>

          <el-col :span="9">
            <!-- 人数、天数 -->
            <el-card
              class="bg-blue-100 p-4 rounded-lg mb-6"
              style="background: #cfdfe4; border-radius: 2cap"
            >
              <el-row
                :gutter="20"
                style="margin-top: 0.6cap; margin-left: 0.1cap"
              >
                <el-col :span="24">
                  <el-form-item label="出行人数" label-width="100px">
                    <el-input-number
                      v-model="form.peopleCount"
                      size="large"
                      style="
                        margin-left: 1.5rem;
                        border-radius: 2cap !important;
                      "
                      :min="1"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="游玩天数" label-width="100px">
                    <el-input-number
                      v-model="form.daysCount"
                      size="large"
                      style="
                        margin-left: 1.5rem;
                        border-radius: 2cap !important;
                      "
                      :min="1"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <!-- 自然语言输入框 -->
        <el-row>
          <el-col :span="2"></el-col>
          <el-col :span="19">
            <el-card
              class="bg-blue-100 p-4 rounded-lg mb-6"
              style="background: #cfdfe4; border-radius: 2cap"
            >
              <el-row class="mb-6" style="margin: 1cap; margin-top: 1.5cap">
                <el-form-item label="其他要求">
                  <el-input
                    type="textarea"
                    v-model="form.additionalRequirements"
                    placeholder="Please input"
                    style="width: 50rem; margin-left: 1cap"
                    :rows="6"
                  ></el-input>
                </el-form-item>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <!-- 搜索、重置按钮 -->
        <el-row class="flex justify-center" style="margin-top: 1rem">
          <el-button
            type="primary"
            style="
              padding: 1.5rem 1.5rem;
              font-size: 1.3rem;
              border-radius: 140px;
              background: rgb(33, 188, 190);
              border: 0px;

              margin-left: -12px;
            "
            @click="handleSearch"
            >搜索</el-button
          >
          <el-button
            type="default"
            plain
            style="
              padding: 1.5rem 1.5rem;
              font-size: 1.3rem;
              border-radius: 140px;
              color: rgb(33, 188, 190);
              border-color: rgb(33, 188, 190);

              margin-left: 50px;
            "
            @click="handleReset"
            >重置</el-button
          >
        </el-row>
      </el-main>
    </el-container>
  </el-scrollbar>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        //表格初始化
        startCity: "上海", //旅游出发城市
        destinationCity: "杭州", //旅游目的城市
        peopleCount: 1, //游玩人数
        daysCount: 1, //游玩天数
        additionalRequirements: "", //自然语言
      },
      loading: false, //向后端提交form后，如果还没得到后端的task_id，前端呈现loading 状态
    };
  },
  methods: {
    async handleSearch() {
      this.loading = true; // 开启加载状态
      try {
        //后端接口
        const response = await axios.post(
          "http://210.28.135.197:8081/test_plan",
          this.form,
        );
        //本地文件,随便找的一个
        //const response = await axios.post('/plan_daily.json', this.form)
        console.log("ok!", response.data);
        //得到信息后跳转计划总览页面
        this.$router.push({
          name: "PlanTotal",
          params: { id: response.data.task_id },
        });
      } catch (error) {
        console.error("Failed to send the form data:", error);
      } finally {
        this.loading = false; // 请求结束后关闭加载状态
      }
    },
    handleReset() {
      //表单重置
      this.form = {
        startCity: "",
        destinationCity: "",
        peopleCount: 1,
        daysCount: 1,
        additionalRequirements: "",
      };
    },
  },
};
</script>

<style scoped>
.el-card__body {
  background: #a2bad4;
}
.bg-gray-100 {
  background-color: #f7fafc;
}
.text-blue-900 {
  color: #2a4365;
}
.bg-blue-100 {
  background-color: #ebf8ff;
}
.bg-white {
  background-color: #ffffff;
}
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.min-h-screen {
  min-height: 100vh;
}
.w-full {
  width: 100%;
}
.max-w-md {
  max-width: 28rem;
}
.p-8 {
  padding: 2rem;
}
.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
.rounded-lg {
  border-radius: 0.5rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.text-3xl {
  font-size: 1.875rem;
}
.text-center {
  text-align: center;
}
.el-form-item--label-top {
  display: flex;
  align-items: center;
}
</style>
