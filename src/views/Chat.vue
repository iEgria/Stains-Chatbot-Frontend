<template>
    <div class="bg-gradient-info p-3" style="height: 100vh;">
        <div class="card card-body blur mb-3 p-0" style="height: 85vh">
            <!-- tombol untuk keluar ntr disini -->
            <div style="overflow-y: auto; overflow-x: hidden;" id="chatbox">
                <div class="row mx-1 my-3" v-for="chat in chats" :key="chat.id">
                    <div class="col-10" :class="(chat.fromMe ? 'offset-2' : '')">
                        <div class="card card-body p-3">
                            <div class="d-flex justify-content-between">
                                <div class="fw-bold"> {{ (chat.fromMe ? name : 'Admin') }} :</div>
                                <div class="small"> {{ (chat.created_at) }}</div>
                            </div>
                            {{ chat.chat }}
                        </div>
                    </div>
                </div>
                <div class="row mx-1 my-3" :class="temporaryChatShow ? 'd-block' : 'd-none'">
                    <div class="col-10 offset-2">
                        <div class="card card-body p-3 bg-secondary text-white">
                            <div class="d-flex justify-content-between">
                                <div> {{ name }}</div>
                                <div>Harap Tunggu</div>
                            </div>
                            {{ temporaryMessage }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card card-body blur py-4" style="height: 10vh">
            <form @submit.prevent="sendChat">
                <div class="input-group ">
                    <textarea name="message" class="form-control form-control-lg rounded-pill" v-model="message"></textarea>
                    <button class="btn btn-lg bg-gradient-info mb-0 rounded-pill ms-2 ps-4 pe-4" type="submit">
                        <font-awesome-icon icon="paper-plane" class="fa-2x" />
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data: () => ({
        name: window.localStorage.getItem('clientName'),
        clientId: window.localStorage.getItem('clientId'),
        message: '',
        chats: [],
        temporaryChatShow: false,
        temporaryMessage: '',
    }),
    methods: {
        sendChat() {
            if (this.message == '') {
                alert('Pesan tidak boleh kosong');
            } else {
                this.temporaryChatShow = true;
                this.temporaryMessage = this.message;
                this.message = '';

                this.scrollChat();
                this.axios.post('message/send', { 'clientId': this.clientId, 'message': this.temporaryMessage }).then((response) => {
                    this.temporaryChatShow = false;
                    this.chats.push(response.data.data.chat);
                    this.scrollChat();
                    setTimeout(() => {
                        this.chats.push(response.data.data.jawaban);
                        this.scrollChat();
                    }, 1000);
                });
            }
        },
        scrollChat() {
            setTimeout(() => {
                var container = this.$el.querySelector("#chatbox");
                return container.scrollTop = container.scrollHeight;
            }, 10);

        }
    },
    mounted() {
        document.getElementById("cover-spin").style.display = "block";
        this.axios.get('message/chat?clientId=' + window.localStorage.getItem('clientId')).then((response) => {
            document.getElementById("cover-spin").style.display = "none";
            response.data.data.forEach(element => {
                this.chats.push(element);
                this.scrollChat();
            });
        });
    },
};
</script>