<template>
    <div class="users_container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <el-row>
                <el-col :span="8">
                    <el-input placeholder="请输入搜索关键字" class="input-with-select"
                              v-model="queryInfo.query"
                              @keyup.enter.native="getUserList"
                              :clearable="true"
                              @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search"
                                   @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
                </el-col>

            </el-row>

            <el-table
                    max-height="550px"
                    :data="userList"
                    style="width: 100%"
                    ref="elTable">
                <el-table-column
                        type="index"
                        align="center"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column width="10"></el-table-column>
                <el-table-column
                        prop="username"
                        label="用户名"
                        sortable
                        min-width="150"
                >
                </el-table-column>
                <el-table-column width="10"></el-table-column>
                <el-table-column
                        prop="mobile"
                        label="电话"
                        sortable
                        min-width="140"
                        max-width="160">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        sortable
                        min-width="180"
                        max-width="210">
                </el-table-column>
                <el-table-column
                        prop="role_name"
                        label="角色"
                        sortable
                        min-width="140"
                        max-width="160">
                </el-table-column>
                <el-table-column
                        prop="create_time"
                        sortable
                        label="建立时间"
                        min-width="120"
                        max-width="140">
                </el-table-column>
                <el-table-column
                        prop="mg_state"
                        label="状态"
                        sortable
                        min-width="80">
                    <template slot-scope="scope">
                        <el-switch
                                @change="userStateChange(scope.row)"
                                v-model="scope.row.mg_state"
                                active-color="#13ce66"
                                inactive-color="#8CC5FF">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-tooltip class="item" effect="dark" content="修改" placement="top"
                                        :open-delay=350 :hide-after=1500 >
                                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除用户" placement="top"
                                        :open-delay=350 :hide-after=1500>
                                <el-button type="warning" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row)"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="用户角色" placement="top"
                                        :open-delay=350 :hide-after=1500>
                                <el-button type="success" icon="el-icon-user" size="mini"></el-button>
                            </el-tooltip>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5,10, 20, 30, 50]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>

            <!--            添加用户的对话框-->
            <el-dialog
                    title="新增用户"
                    align="center"
                    :visible.sync="dialogVisible"
                    width="50%"
                    :before-close="handleClose">

                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px"
                         class="demo-ruleForm" label-position="left">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="addForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="addForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addForm.email"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false" style="margin-right: 10px">取 消</el-button>
                    <el-button type="primary" @click="submitUserInfo">确 认 提 交</el-button>
                </span>
            </el-dialog>

            <!--            修改用户信息对话框-->
            <el-dialog
                    title="修改用户"
                    align="center"
                    :visible.sync="editdialogVisible"
                    width="50%"
                    :before-close="handleClose">

                <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="100px"
                         class="demo-ruleForm" label-position="left">
                    <el-form-item label="用户名" >
                        <el-input v-model="editForm.username" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="editForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="editForm.email"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="editdialogVisible=false" style="margin-right: 10px">取 消</el-button>
                    <el-button type="primary" @click="submitEditUserInfo">确 认 提 交</el-button>
                </span>
            </el-dialog>

        </el-card>


    </div>
</template>

<script>
    export default {
        name: "users.vue",
        data() {
            return {
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 5
                },
                addForm: {
                    username: '',
                    password: '',
                    mobile: '',
                    email: ''
                },
                addFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {pattern: /^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/, message: '4-16位字母,数字,汉字,下划线', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {pattern: /^([a-zA-Z0-9]{8,16})$/, message: '8-16位字母,数字,下划线', trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {pattern: /^1[3456789][0-9]{9}$/, message: '请输入正确的手机号码', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {
                            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: '请输入正确的邮箱地址',
                            trigger: 'blur'
                        }
                    ]
                },
                editForm:{},
                userList: [],
                total: 0,
                currentPage: 1,
                dialogVisible: false,
                editdialogVisible: false
            }
        },
        methods: {
            async getUserList() {
                const {data: res} = await this.$axios.get('users', {
                    params: this.queryInfo
                })
                if (res.meta.status != 200) {
                    return this.$Message.error('获取用户列表失败!')
                }
                this.userList = res.data.users
                this.pagesize = res.data.pagesize
                this.pagenum = res.data.pagenum
                this.total = res.data.total
            },
            submitUserInfo() {
                this.$refs.addFormRef.validate(async isRight => {
                    if (isRight) {
                        const {data: res} = await this.$axios.post('users', this.addForm)
                        if (res.meta.status >= 200 && res.meta.status < 300) {
                            this.$Message({
                                type: 'success',
                                message: res.meta.msg,
                                duration: 600
                            })
                        } else {
                            this.$refs.addFormRef.resetFields()
                            return this.$Message.error(res.meta.msg)
                        }
                        this.dialogVisible = false
                        this.getUserList()
                    }
                })

            },
            submitEditUserInfo() {
                this.$refs.editFormRef.validate(async isRight => {
                    if (isRight) {
                        const {data: res} = await this.$axios.put(`users/${this.editForm.id}`, this.editForm)
                        if (res.meta.status >= 200 && res.meta.status < 300) {
                            this.$Message({
                                type: 'success',
                                message: res.meta.msg,
                                duration: 600
                            })
                        } else {
                            this.$refs.editFormRef.resetFields()
                            return this.$Message.error(res.meta.msg)
                        }
                        this.$refs.editFormRef.resetFields()
                        this.editdialogVisible = false
                        this.getUserList()
                    }
                })

            },
            async handleSizeChange(val) {
                this.queryInfo.pagesize = val;
                await this.getUserList()
            },
            async handleCurrentChange(val) {
                this.queryInfo.pagenum = val;
                await this.getUserList()
                this.$refs.elTable.bodyWrapper.scrollTop = 0;
            },
            async userStateChange(userInfo) {
                const {data: res} = await this.$axios.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
                if (res.meta.status != 200) {
                    userInfo.mg_state != userInfo.mg_state
                    return this.$Message.error('更新用户状态失败!')
                }
                this.$Message({
                    type: 'success',
                    message: '更新状态成功',
                    duration: 600
                })
            },
            async showEditDialog(id){
                const {data: res} = await this.$axios.get(`users/${id}`)
                this.editForm = res.data
                this.editForm.id=id;
                if (res.meta.status != 200) {
                    return this.$Message.error('查询用户信息失败!')
                }
                this.editdialogVisible=true

            },
            deleteUser(scope){
                this.$MessageBox.confirm(`此操作将永久删除 ${scope.username} 用户, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async ()=> {
                    const {data: res} = await this.$axios.delete(`users/${scope.id}`)
                    if (res.meta.status != 200) {
                        userInfo.mg_state != userInfo.mg_state
                        return this.$Message.error('删除用户失败!')
                    }
                    this.$Message({
                        type: 'success',
                        message: '删除用户成功',
                        duration: 600
                    })
                    this.getUserList()
                }).catch(() => {})
            },
            handleClose() {
                this.editdialogVisible=false
                this.dialogVisible=false
            }
        },
        created() {
            this.getUserList()
        }
    }
</script>

<style lang="less">
    .users_container {
        padding: 30px;

        .el-breadcrumb {
            margin-bottom: 30px;
        }

        .el-card {
            padding: 10px 5px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
        }
    }
</style>

<style scoped lang="less">

    .el-row {
        text-align: center;
        height: 40px;
        line-height: 40px;
    }

    .el-table {
        margin-top: 40px;
    }

    .el-pagination {
        margin-top: 40px;
    }

</style>
