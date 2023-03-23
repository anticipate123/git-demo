<template>
    <div class="profile">
        <!-- 用户信息表单 -->
        <div class="userInfo">
            <Form ref="form" :model="form" :rules="ruleInfo" :label-width="80">
                <FormItem label="真实姓名" prop="tname">
                    <Input v-model="form.tname" />
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <AutoComplete v-model="form.email" @on-search="autoEmail" placeholder="请输入电子邮箱">
                        <Option v-for="item in mailSuffix" :value="item" :key="item">{{ item }}</Option>
                    </AutoComplete>
                </FormItem>
                <FormItem label="手机号" prop="tel">
                    <Input v-model="form.tel" />
                </FormItem>
                <FormItem label="证件类型" prop="certType">
                    <Select v-model="form.certType">
                        <Option value="身份证">身份证</Option>
                        <Option value="护照">护照</Option>
                        <Option value="工作证">工作证</Option>
                        <Option value="军官证">军官证</Option>
                    </Select>
                </FormItem>
                <FormItem label="证件号码" prop="certId">
                    <Input v-model="form.certId" />
                </FormItem>
                <FormItem label="所在地" prop="location">
                    <Input v-model="form.location" />
                </FormItem>
                <FormItem label="单位/公司" prop="group">
                    <Input v-model="form.group" />
                </FormItem>
                <FormItem label="职称" prop="position">
                    <Input v-model="form.position" />
                </FormItem>
            </Form>
            <div class="updateBtn">
                <Button @click="updateUser" type="primary">提交</Button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   username: {
  //     type: String
  //   }
  // },
  data() {
    return {
      mailSuffix: [],
      form: {
        // 用户信息表单数据
        // username: 'fzz',
        // username: "",
        tname: "",
        certType: "",
        certId: "",
        tel: "",
        email: "",
        location: "",
        group: "",
        position: ""
      },
      ruleInfo: {
        tname: [{ required: true, message: "请填写真实姓名", trigger: "blur" }],
        email: [{ required: true, message: "请填写电子邮箱", trigger: "blur" }],
        tel: [
          { required: false, message: "请填写手机号码", trigger: "blur" },
          {
            type: "number",
            len: 11,
            message: "请输入11位手机号",
            trigger: "blur"
          }
        ],
        certType: [
          { required: false, message: "请选择证件类型", trigger: "change" }
        ],
        certId: [
          { required: false, message: "请填写证件号码", trigger: "blur" }
        ],
        location: [
          { required: false, message: "请填写所在地", trigger: "blur" }
        ],
        group: [
          { required: false, message: "请填写单位（公司）", trigger: "blur" }
        ],
        position: [{ required: false, message: "请填写职称", trigger: "blur" }]
      },
      oldForm: {}
    };
  },
  created() {
    /**
     * 请求获取用户的个人信息
     */
    this.axios
      .post("/api/admin/finduser", {
        username: sessionStorage.getItem("username")
      })
      .then(res => {
        // console.log(res)
        this.form = res.data.data;
        this.oldForm = { ...this.form };
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    /**
     * 自动完成邮箱后缀
     */
    autoEmail(value) {
      this.mailSuffix =
        !value || value.indexOf("@") >= 0
          ? []
          : [value + "@qq.com", value + "@sina.com", value + "@163.com"];
    },
    /**
     * 提交修改信息
     */
    updateUser() {
      console.log(this.username);
      this.axios
        .post("/api/user/updateuserinfo", {
          username: this.username,
          tname: this.form.tname,
          certId: this.form.certId,
          certType: this.form.certType,
          tel: this.form.tel,
          email: this.form.email,
          location: this.form.location,
          group: this.form.group,
          position: this.form.position
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$Message.success("修改成功！");
          } else {
            this.$Message.error(res.data.msg);
            this.form = this.oldForm;
            // this.$router.go(0);
          }
        })
        .catch(error => {
          this.form = this.oldForm;
          // this.$router.go(0);
          this.$Message.error("修改失败，请重试！");
        });
      console.log(this.oldForm);
    }
  }
};
</script>

<style lang="stylus" scoped>
.profile
    padding 15px
    display flex
    justify-content center
    align-items center
.userInfo
    width 40%
    padding 15px
.subhead
    display: flex;
    padding-bottom: 8px;
    margin-bottom: 16px;
    border-bottom: 1px solid #e1e4e8;
    flex-flow: row wrap;
    h2
        font-size: 24px;
        font-weight: 400;
        flex: 1 1 auto;
.updateBtn
    display flex
    justify-content center
</style>
