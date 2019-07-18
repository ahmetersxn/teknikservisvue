<template>
    <div class="container">
        <div class="form-group row">
            <div class="col-sm-5"></div>
            <div class="col-sm-7">
                <h3><span class="badge badge-primary">Bakim Girişi</span></h3>
            </div>
        </div>
        <hr>
        <form>
            <div class="form-group row">
                <label  class="col-sm-2 col-form-label">Ürün</label>
                <div class="col-sm-10">

                    <select v-model="urunDatasiId" class="form-control">
                        <option disabled value="" selected="selected">Ürün Seçiniz</option>
                        <option v-for="data in urunDatasi" :key="data.urunId" v-bind:value="data.urunId">
                            Model:{{data.model}} / Marka:{{data.marka}}
                        </option>
                    </select>

                </div>
            </div>
            <hr>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Bakim Aciklama</label>
                <div class="col-sm-4">
                    <input type="text"  v-model="bakimAciklama" name="bakimAciklama"   class="form-control" placeholder="Bakim açiklamasını giriniz." >
                </div>
                <label class="col-sm-2 col-form-label">Bakim Tarihi</label>
                <div class="col-sm-4">
                    <input type="date"  v-model="bakimTarihi" name="bakimTarihi"   class="form-control" >
                </div>
            </div>
            <div class="form-group row">
                <label  class="col-sm-2 col-form-label">Çalişan</label>
                <div class="col-sm-10">

                    <select v-model="calisanDatasiId" class="form-control">
                        <option disabled value="" selected="selected">İşlemi yapan çalişan seçiniz</option>
                        <option v-for="data in calisanDatasi" :key="data.calisanId" v-bind:value="data.calisanId">
                            {{data.adi}} {{data.soyadi}} - ( {{data.gorevi}})
                        </option>
                    </select>

                </div>
            </div>
        </form>
        <div class="form-group row">
            <div class="col-sm-2">
                <button class="btn btn-primary" v-on:click="bakimkayit">Bakım Kayit</button>
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
        name: 'bakim',
        components: {},
        data() {
            return {
                urunId: '',
                bakimId:'',
                bakimAciklama: '',
                bakimTarihi: '',
                calisan : {},
                data: [],
                deleteId : "bakimId",
                urlListe:'/rest/bakim',
                urlSil:'/rest/bakim',
                fields: [
                    { name: "bakimId", title: "Bakim Id"},
                    { name: "bakimAciklama", title: "Bakim Açıklama"},
                    { name: "bakimTarihi", title: "Bakim Tarihi" },
                    { name: "calisan.adi", title: "Calişan Adi" },
                    { name: "calisan.soyadi", title: "Calişan Soyadi" },
                    { name: "calisan.gorevi", title: "Calişan Görevi" },
                    {name: 'actions',title: 'İşlemler'},
                ],
                urunDatasiId :'' ,
                calisanDatasiId :'' ,
                urunDatasi: [
                ],
                calisanDatasi: [
                ],
            }
        },
        created() {
            this.$http
                .get('/rest/urun')
                .then((response) => {
                    let data  = response.data;

                    for(let key in data){
                        this.urunDatasi.push({ ...data[key],id : key})
                    }
                })
            this.$http
                .get('/rest/calisan')
                .then((response) => {
                    let dataCalisan  = response.data;

                    for(let key in dataCalisan){
                        this.calisanDatasi.push({ ...dataCalisan[key],id : key})
                    }
                })
        },
        methods: {
            bul(){
                this.bakimId = this.data.bakimId
                this.bakimAciklama = this.data.bakimAciklama
                this.bakimTarihi = this.data.bakimTarihi
                this.calisanDatasiId = this.data.calisan.calisanId

            },
            guncelle(){
                if(this.data.bakimId!=null){
                    this.$http
                        .put(
                            '/rest/bakim/'+this.data.bakimId, (
                                {
                                    bakimAciklama: this.bakimAciklama,
                                    bakimTarihi: this.bakimTarihi,
                                    calisan: {
                                        calisanId: this.calisanDatasiId
                                    }
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
            bakimkayit() {
                this.$http
                    .post(
                        '/rest/bakim/'+this.urunDatasiId, (
                            {
                                bakimAciklama: this.bakimAciklama,
                                bakimTarihi: this.bakimTarihi,
                                calisan: {
                                    calisanId: this.calisanDatasiId
                                }

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