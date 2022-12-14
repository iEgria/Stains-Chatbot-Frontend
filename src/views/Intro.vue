<template>
    <section>
        <div class="page-header min-vh-100">
            <div class="container">
                <div class="row">
                    <div class="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto p-3">
                        <div class="card blur m shadow-lg">
                            <div class="card-header pb-0 text-left bg-transparent">
                                <h3 class="font-weight-bolder text-info text-gradient">Chatbot</h3>
                                <p class="mb-0 text-dark">Hallo, dengan siapa kami harus memanggilmu?</p>
                            </div>
                            <div class="card-body">
                                <form @submit.prevent="intro">
                                    <div class="mb-3">
                                        <input type="text" name="name" class="form-control" placeholder="Nama Kamu" v-model="clientName">
                                    </div>
                                    <div class="text-center">
                                        <button type="submit" class="btn bg-gradient-info w-100 mb-0">Masuk</button>
                                    </div>
                                </form>
                                <hr class="dark horizontal">
                                <small>Lakukan check stock dan harga sebelum datang ke toko untuk kefisienan kamu 😄</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Intro",
    mounted() {
        document.body.classList.add('bg-gradient-info');
        if (window.localStorage.getItem('clientId') != null) {
            this.$router.push({ name: 'chat' });
        }
    },
    unmounted() {
        document.body.classList.remove('bg-gradient-info');
    },
    data() {
        return {
            clientName: '',
        };
    },
    methods: {
        intro() {
            document.getElementById("cover-spin").style.display = "block";
            if (this.clientName == '') {
                window.localStorage.setItem('clientName', 'Anonim');
                window.localStorage.setItem('clientId', Math.random().toString(36).slice(2) + 'Anonim' + Math.random().toString(36).slice(2));
            } else {
                window.localStorage.setItem('clientName', this.clientName);
                window.localStorage.setItem('clientId', Math.random().toString(36).slice(2) + this.clientName + Math.random().toString(36).slice(2));
            }
            this.axios.post('intro', { 'clientId': window.localStorage.getItem('clientId'), 'clientName': window.localStorage.getItem('clientName') }).then(() => {
                document.getElementById("cover-spin").style.display = "none";
                this.$router.push({ name: 'chat' });
            });
        }
    }

};
</script>