<template>
    <div class="login_container">
        <transition name="login">
            <div class="login_box" v-if="show">
                <!--            头像区域-->
                <div class="img_box">
                    <div class="avatar_box">
                        <img src="../assets/login/SIPC_withoutText.png" alt="">
                    </div>
                </div>
                <!--            表单区域-->
                <div>
                    <!--                    model绑定了表单数据 rules规定了校验格式 -->
                    <el-form class="login_form" :model="loginForm" :rules="checkData" ref="loginFormRef">
                        <!--                    用户名-->
                        <el-form-item class="efi" prop="username">
                            <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
                        </el-form-item>
                        <!--                    密码-->
                        <el-form-item class="efi" prop="password">
                            <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password"
                                      @keyup.enter.native="login"></el-input>
                        </el-form-item>
                        <!--                    按钮-->
                        <el-form-item class="ebt">
                            <el-button type="primary" @click="login">登录</el-button>
                            <el-button type="info" @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {Loading} from 'element-ui';

    export default {
        name: "login.vue",
        data() {
            return {
                // 登录表单绑定的对象
                loginForm: {
                    username: '',
                    password: '',
                },
                //字符检验
                checkData: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                    ]
                },
                //mounted动画加载变量
                show: false
            }
        },
        //mounted动画加载函数
        mounted() {
            setTimeout(() => {
            }, 500)
            this.show = true
        },
        methods: {
            //重置表单函数
            reset: function () {
                this.$refs.loginFormRef.resetFields()
            },
            //登录函数
            login: function () {
                //登录前校验表单数据
                this.$refs.loginFormRef.validate(async isRight => {
                    if (isRight) {
                        const loadingInstance = Loading.service({fullscreen: true})
                        const loginMsg = await this.$axios.post('/login', this.loginForm)
                        loadingInstance.close()
                        console.log(loginMsg)
                        let {data: {meta: {status, msg}}} = loginMsg
                        if (status == 200) {
                            console.log(loginMsg)
                            this.$Message({
                                message: msg,
                                type: 'success',
                                duration: 600
                            })
                            let {data: {data: {token,username}}} = loginMsg
                            sessionStorage.setItem('login', token)
                            let loginDate = new Date()
                            sessionStorage.setItem('loginTime',loginDate)
                            //跳转到home主界面
                            this.$router.push({path:'/home',query:{
                                username:username
                            }})
                        } else if (status > 200) {
                            if (msg.toString().indexOf('用户名密码')) {
                                this.$Message({
                                    message: '用户名或密码不正确',
                                    type: 'error',
                                    duration: 1000
                                })
                            } else {
                                this.$Message({
                                    message: msg,
                                    type: 'error',
                                    duration: 1000
                                })
                            }
                        }
                    }
                })
            }
        }
    }

</script>


<style scoped lang="less">
    .login_container {
        background-color: #2b4b6b;
        width: 100%;
        height: 100%;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: center;

        .login_box {
            width: 400px;
            height: 450px;
            background-color: #ffffff;
            display: flex;
            box-shadow: 0 0 2px #eeeeee;
            border-radius: 20px;
            justify-content: center;
            flex-wrap: wrap;

            .img_box {
                width: 100%;
                height: 120px;
                margin-top: 30px;
                display: flex;
                justify-content: center;

                .avatar_box {
                    width: 120px;
                    height: 120px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #eeeeee;
                    box-shadow: 0 0 10px #eeeeee;
                    border-radius: 50%;

                    img {
                        height: 65px;
                        width: 65px;
                    }
                }
            }

            div {
                width: 100%;
                height: calc(100% - 150px);

            }
        }
    }

    .ebt {
        display: flex;
        justify-content: flex-end;
    }

    .login_form {
        margin-top: 50px;
        padding: 0 40px;

        .efi {
            margin: 35px auto;
        }
    }

    /deep/ .el-input__inner {
        letter-spacing: 1.5px;
    }

    /deep/ .el-form-item__error {
        margin-top: 5px;
    }

    .login-enter {
        opacity: 0;
        transform: translateY(30px);
    }

    .login-enter-active {
        transition: .5s all ease-in;
    }

</style>
