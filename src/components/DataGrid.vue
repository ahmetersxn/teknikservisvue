<template>
    <div id="app">
        <div class="container">
            <vuetable ref="vuetable"
                      :api-mode="false"
                      :deleteId="deleteId"
                      :fields="fields"
                      :urlListe="urlListe"
                      :per-page="perPage"
                      :data-manager="dataManager"
                      pagination-path="pagination"
                      @vuetable:pagination-data="onPaginationData"
            >
                <div slot="actions" slot-scope="props">
                    <button type="button"
                            class="btn btn-default btn-sm"
                            @click="onActionClicked('edit-item', props.rowData)"
                    >
                        <span class="glyphicon glyphicon-edit"></span> Bul
                    </button>
                    <button type="button"
                            class="btn btn-danger btn-sm"
                            @click="onActionClicked('delete-item', props.rowData)"
                    >
                        <span class="glyphicon glyphicon-trash"></span>Sil
                    </button>
                </div>
            </vuetable>
            <div class="container">
                <vuetable-pagination ref="pagination"
                                     @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
            </div>
        </div>
    </div>
</template>

<script scoped>
    import Vuetable from "vuetable-2";
    import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
    import axios from "axios";
    import _ from "lodash";

    export default {
        name: "DataGrid",
        components: {
            Vuetable,
            VuetablePagination
        }, props: {
            deleteId: {type: String, required: false, default: ''},
            urlListe: {type: String, required: false, default: ''},
            urlSil: {type: String, required: false, default: ''},
            fields: {type: Array, required: true},

        },
        data() {
            return {
                perPage: 10,
                data: []
            };
        },

        watch: {
            data(newVal, oldVal) {
                this.$refs.vuetable.refresh();
            }
        },

        mounted() {
            axios.get(this.urlListe).then(response => {
                this.data = response.data;
            });
        },

        methods: {
            onPaginationData(paginationData) {
                this.$refs.pagination.setPaginationData(paginationData);
            },
            onChangePage(page) {
                this.$refs.vuetable.changePage(page);
            },
            dataManager(sortOrder, pagination) {
                if (this.data.length < 1) return;

                let local = this.data;
                if (sortOrder.length > 0) {
                    local = _.orderBy(
                        local,
                        sortOrder[0].sortField,
                        sortOrder[0].direction
                    );
                }
                pagination = this.$refs.vuetable.makePagination(
                    local.length,
                    this.perPage
                );
                let from = pagination.from - 1;
                let to = from + this.perPage;
                return {
                    pagination: pagination,
                    data: _.slice(local, from, to)
                };
            },
            onActionClicked(action, data) {
                let id = "";
                if (this.deleteId == "musteriId") {
                    id = data.musteriId;
                } else if (this.deleteId == "urunId") {
                    id = data.urunId;
                } else if (this.deleteId == "bakimId") {
                    id = data.bakimId;
                } else if (this.deleteId == "calisanId") {
                    id = data.calisanId;
                }


                if (action == "delete-item") {
                    this.$http
                        .delete(this.urlSil + "/" + id)
                        .then((response) => {
                            this.$message.success("Kayit silindi..!");
                            setTimeout(function () {
                                window.location.reload();
                            }, 2000);
                        })
                        .catch((err) => {
                            this.$message.warning("Silme işlemi yapılamadı..!");
                        })
                }
                if (action == "edit-item") {
                    this.$emit("data", data);
                    this.$emit("bul", 1);
                }

            }
        }
    };
</script>