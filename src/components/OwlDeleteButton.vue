<template>
    <button type="button" class="btn bg-gradient-danger" :class="this.class" @click="deleteConfirm">{{ this.text }}</button>
</template>

<script>
export default {
    name: "OwlDeleteButton",
    props: {
        url: String,
        text: { type: String, default: 'Hapus' },
        class: String
    },
    methods: {
        deleteConfirm() {
            let self = this;
            this.$swal.fire({
                icon: 'question',
                title: 'Hapus Data',
                text: "Data yang sudah dihapus tidak dapat dikembalikan",
                showCancelButton: true,
                cancelButtonText: 'Batal'
            }).then(function (result) {
                if (result.isConfirmed) {
                    self.axios.delete(self.url).then((response) => {
                        if (response.data.status) {
                            self.$router.push({ name: 'master-admin.index' });
                        } else {
                            self.$swal.fire({
                                icon: 'error',
                                text: "Data Gagal Dihapus",
                            });
                        }
                    });
                }
            });
        }
    }
}
</script>