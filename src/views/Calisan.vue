<template>
    <div class="container">
        <div class="form-group row">
            <div class="col-sm-5"></div>
            <div class="col-sm-7">
                <h3><span class="badge badge-primary">Çalişan Girişi</span></h3>
            </div>
        </div>
        <hr>
        <form>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Çalışan Adi</label>
                <div class="col-sm-4">
                    <input type="text"  v-model="adi" name="adi"   class="form-control" placeholder="Çalışan adını giriniz." >
                </div>
                <label class="col-sm-2 col-form-label">Çalışan Soyadi</label>
                <div class="col-sm-4">
                    <input type="text"   v-model="soyadi" name="soyadi"   class="form-control" placeholder="Çalışan soyadını giriniz." >
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Görevi</label>
                <div class="col-sm-4">
                    <select v-model="gorevi" class="form-control">
                        <option disabled value="" selected="selected">Müşteri Seciniz</option>
                        <option value="Teknik Servis" selected="selected">Teknik Servis</option>
                        <option value="Teknik Servis Uzmanı" selected="selected">Teknik Servis Uzmanı</option>
                        <option value="Müdür" selected="selected">Müdür</option>
                        <option value="Sekreter" selected="selected">Sekreter</option>
                    </select>
                </div>
            </div>
        </form>
        <div class="form-group row">
            <div class="col-sm-2">
                <button class="btn btn-primary" v-on:click="calisankayit">Calişan Kayit</button>
            </div>
            <div class="col-sm-2">
                <button class="btn btn-success" v-on:click="guncelle">Güncelle</button>
            </div>
        </div>


        <datagrid   :urlListe="urlListe" :urlSil="urlSil"  :fields="fields"  :deleteId="deleteId"  @data="data = $event" @bul="bul"></datagrid>

    </div>
</template>

<script>
    export default {
        name: 'calisan',
        components: {},
        data() {
            return {
                adi: '',
                soyadi: '',
                gorevi: '',
                data: [],
                deleteId : "calisanId",
                urlListe:'/rest/calisan',
                urlSil:'/rest/calisan',
                fields: [
                    { name: "calisanId", title: "Calisan Id"},
                    { name: "adi", title: "Çalişan Adi"},
                    { name: "soyadi", title: "Çalişan Soyadi"},
                    { name: "gorevi", title: "Çalişan Görevi" },
                    {name: 'actions',title: 'İşlemler'},
                ],
                selectdata: [
                ],
            }
        },
        created() {

        },
        methods: {
            bul(){
                this.calisanId = this.data.calisanId
                this.adi = this.data.adi
                this.soyadi = this.data.soyadi
                this.gorevi = this.data.gorevi
            },
            guncelle(){
                if(this.data.calisanId!=null){
                    this.$http
                        .post(
                            '/rest/calisan/'+this.data.calisanId, (
                                {
                                    adi: this.adi,
                                    soyadi: this.soyadi,
                                    gorevi: this.gorevi,
                                }
                            ))
                        .then(request => {
                            this.$message.success("Güncelleme yapıldı.");
                            setTimeout(function(){ window.location.reload(); }, 2000);
                        })
                        .catch(err => {
                            this.$message.success("Güncelleme yapılırken hata oluştu.");
                        });
                }else{
                    this.$message.warning("Kayit çağırınız");
                }
            },
            calisankayit() {
                this.$http
                    .post(
                        '/rest/calisan', (
                            {
                                adi: this.adi,
                                soyadi: this.soyadi,
                                gorevi: this.gorevi,
                            }
                        ))
                    .then(request => this.kayitBasarili(request))
                    .catch(err => this.kayitBasarisiz(err));
            },
            kayitBasarili(req) {
                if (!req.data) {
                    this.kayitBasarisiz();
                    return;
                }
                if (req.data) {
                    this.$message.success("Kayit Başarılı");
                    setTimeout(function(){ window.location.reload(); }, 2000);
                }
            },
            kayitBasarisiz(err) {
                if(err){
                    this.$message.warning("Kayit gerçekleştirilemedi.");
                }
            }
        }
    }
</script>