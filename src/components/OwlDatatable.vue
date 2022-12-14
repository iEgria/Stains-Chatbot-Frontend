<template>
    <table class="table">
        <thead>
            <tr>
                <td>
                    <div class="d-flex justify-content-between">
                        <div>Name</div>
                        <div>Name</div>
                    </div>
                </td>
                <td>
                    <div class="d-flex justify-content-between">
                        <div>Diskripsi</div>
                        <div>Name</div>
                    </div>
                </td>
                <td>Diskripsi</td>
                <td>Shape</td>
                <td width="1px"> </td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(tbody, index) in tbodys" v-bind:key="index">
                <td>{{ tbody.name }} Ipsum</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "OwlDataTable",
    props: {
        url: String,
        text: { type: String, default: 'Hapus' },
        class: String,
    },
    data: () => {
        return {
            tbodys: [
                { name: 'Lorem - 1', description: 'Ipsum - 1', shape: 'asas', id: 1 },
                { name: 'Lorem - 2', description: 'Ipsum - 2', shape: 'asas', id: 2 },
                { name: 'Lorem - 3', description: 'Ipsum - 3', shape: 'asas', id: 3 },
                { name: 'Lorem - 4', description: 'Ipsum - 4', shape: 'asas', id: 4 },
            ],
        };
    }

}
</script>