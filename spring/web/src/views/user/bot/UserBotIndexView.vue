<template>
   <div class="containner">
        <div class="row">
            <div class="col-3">
                <div class="card" style="margin-top: 20px;">
                    <div class="card-body">
                        <img :src="$store.state.user.photo" alt="" style="width: 100%;">
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div class="card" style="margin-top: 20px;">
                    <div class="card-header">
                        <span style="font-size: 130%;">
                            mybot
                        </span>
                            <button type="button" class="btn btn-dark float-end" data-bs-toggle="modal" data-bs-target="#add-bot-btn">
                                Create Bot
                            </button>
                            <div class="modal fade" id="add-bot-btn" tabindex="-1">
                            <div class="modal-dialog modal-xl">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Create Bot</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="add-bot-title" class="form-label">Name</label>
                                        <input v-model="botadd.title" type="text" class="form-control" id="add-bot-title" placeholder="bot name">
                                    </div>
                                    <div class="mb-3">
                                        <label for="add-bot-description" class="form-label">Description</label>
                                        <textarea v-model="botadd.description" class="form-control" id="add-bot-description" rows="3" placeholder="bot description"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="add-bot-code" class="form-label">Code</label>
                                        <VAceEditor
                                            v-model:value="botadd.content"
                                            @init="editorInit"
                                            lang="c_cpp"
                                            theme="textmate"
                                            style="height: 300px" />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <div class="error_message">{{ botadd.error_message }}</div>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                                    <button type="button" class="btn btn-primary" @click="add_bot">submit</button>
                                </div>
                                </div>
                            </div>
                            </div>
                    </div>
                    <div class="card-body">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>create time</th>
                                    <th>method</th>
                                </tr>
                            </thead>
                                <tbody>
                                    <tr v-for="bot in bots" :key = "bot.id">
                                        <td style="font-size: 130%;">{{ bot.title }}</td>
                                        <td style="font-size: 130%;">{{ bot.createtime }}</td>
                                        <td>
                                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" :data-bs-target="'#update-bot-modal-' + bot.id" style="margin-right: 10px;">update</button>
                                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" :data-bs-target="'#remove-bot-modal-' + bot.id">delete</button>

                                            <div class="modal fade" :id="'update-bot-modal-' + bot.id" tabindex="-1">
                                                <div class="modal-dialog modal-xl">
                                                    <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">Update Bot</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="mb-3">
                                                            <label for="update-bot-title" class="form-label">Name</label>
                                                            <input v-model="bot.title" type="text" class="form-control" id="update-bot-title">
                                                        </div>
                                                        <div class="mb-3">
                                                            <label for="update-bot-description" class="form-label">Description</label>
                                                            <textarea v-model="bot.description" class="form-control" id="update-bot-description" rows="3"></textarea>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label for="update-bot-code" class="form-label">Code</label>
                                                            <VAceEditor
                                                                v-model:value="bot.content"
                                                                @init="editorInit"
                                                                lang="c_cpp"
                                                                theme="textmate"
                                                                style="height: 300px" />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <div class="error_message">{{ bot.error_message }}</div>
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                                                        <button type="button" class="btn btn-primary" @click="update_bot(bot)">submit</button>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>

                                                <!-- Modal -->
                                                <div class="modal fade" :id="'remove-bot-modal-' + bot.id" tabindex="-1" >
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">Tips</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        sure?
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                                                        <button type="button" class="btn btn-primary"  @click="remove_bot(bot)">delete</button>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                                
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>


<script>
    import { ref, reactive } from 'vue';
    import $ from 'jquery'
    import { useStore } from 'vuex';
    import { Modal } from 'bootstrap/dist/js/bootstrap';
    import { VAceEditor } from 'vue3-ace-editor';
    import ace from 'ace-builds';

    export default {
        components: {
            VAceEditor
        },
        setup() {
            ace.config.set(
                "basePath", 
                "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/")

           const store = useStore();
           let bots = ref([]);

           const botadd = reactive({
                title:  "",
                description:    "",
                content: "",
                error_message: "",
           })

           const refresh_list = () =>{
            $.ajax({
                url: "https://app2402.acapp.acwing.com.cn/api/user/bot/getlist/",
                type: "get",
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    bots.value = resp;
                }
            })
           }
           refresh_list();

           const add_bot = () =>{
                botadd.error_message = "";
                $.ajax({
                    url: "https://app2402.acapp.acwing.com.cn/api/user/bot/add/",
                    type: "post",
                    data: {
                        title: botadd.title,
                        description: botadd.description,
                        content: botadd.content,
                    },
                    headers: {
                        Authorization: "Bearer " + store.state.user.token,
                    },
                    success(resp) {
                        if(resp.error_message === "success"){
                            botadd.title = "";
                            botadd.description = "";
                            botadd.content = "";
                            Modal.getInstance("#add-bot-btn").hide();
                            refresh_list();
                        }
                        else{
                            botadd.error_message = resp.error_message;
                        }
                    }
                })
           }

           const remove_bot = (bot) =>{
                $.ajax({
                    url: "https://app2402.acapp.acwing.com.cn/api/user/bot/remove/",
                    type: "post",
                    data: {
                        bot_id: bot.id
                    },
                    headers: {
                        Authorization: "Bearer " + store.state.user.token,
                    },
                    success(resp) {
                        if(resp.error_message === "success"){
                            Modal.getInstance('#remove-bot-modal-' + bot.id).hide();
                            refresh_list();
                        }
                    }
                })
           }

           const update_bot = (bot) =>{
                botadd.error_message = "";
                $.ajax({
                    url: "https://app2402.acapp.acwing.com.cn/api/user/bot/update/",
                    type: "post",
                    data: {
                        bot_id: bot.id,
                        title: bot.title,
                        description: bot.description,
                        content: bot.content,
                    },
                    headers: {
                        Authorization: "Bearer " + store.state.user.token,
                    },
                    success(resp) {
                        if(resp.error_message === "success"){
                            Modal.getInstance('#update-bot-modal-' + bot.id).hide();
                            refresh_list();
                        }
                        else{
                            botadd.error_message = resp.error_message;
                        }
                    }
                })
           }

           return {
                bots,
                botadd,
                refresh_list,
                add_bot,
                remove_bot,
                update_bot,
           }
        }
    }
</script>

<style scoped>
    div.error_message {
        color: red;
    }
</style>