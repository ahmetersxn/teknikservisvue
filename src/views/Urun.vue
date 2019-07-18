<template>
    <div class="container">
        <div class="form-group row">
            <div class="col-sm-5"></div>
            <div class="col-sm-7">
                <h3><span class="badge badge-primary">Ürün Girişi</span></h3>
            </div>
        </div>
        <hr>
        <form>
            <div class="form-group row">
                <label  class="col-sm-2 col-form-label">Müşteri Seçiniz</label>
                <div class="col-sm-10">

                    <select v-model="musteriDatasiId" class="form-control">
                        <option disabled value="" selected="selected">Müşteri Seciniz</option>
                        <option v-for="data in musteriDatasi" :key="data.musteriId" v-bind:value="data.musteriId">
                            T.C. ({{data.tc}}) {{data.adi}} {{ data.soyadi }}
                        </option>
                    </select>

                </div>
            </div>
            <hr>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Ürün Modeli</label>
                <div class="col-sm-4">
                    <input type="text"  v-model="model" name="model"   class="form-control" placeholder="Ürün modeli giriniz." >
                </div>
                <label class="col-sm-2 col-form-label">Ürün Markasi</label>
                <div class="col-sm-4">
                    <input type="text"   v-model="marka" name="marka"   class="form-control" placeholder="Ürün markasi giriniz." >
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Geliş Tarihi</label>
                <div class="col-sm-4">
                    <input type="date"   v-model="gelisTarihi" name="gelisTarihi"  class="form-control" >
                </div>
                <label class="col-sm-2 col-form-label">Bitiş Tarihi</label>
                <div class="col-sm-4">
                    <input type="date"  v-model="bitisTarihi" name="bitisTarihi"   class="form-control" >
                </div>
            </div>
            <div class="form-group row" >
                <label class="col-sm-2 col-form-label">Bakim Fiytati</label>
                <div class="col-sm-4">
                    <input type="number"   v-model="bakimFiyati"  min = "0" max ="15" name="bakimFiyati"  class="form-control" placeholder="Bakim fiytati giriniz." >
                </div>
            </div>
        </form>
        <div class="form-group row">
            <div class="col-sm-2">
                <button class="btn btn-primary" v-on:click="urunkayit">Ürün Kayit</button>
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
        name: 'urun',
        components: {},
        data() {
            return {
                musteriId: '',
                model: '',
                marka: '',
                gelisTarihi: '',
                bitisTarihi: '',
                bakimFiyati: '',
                data: [],
                deleteId : "urunId",
                urlListe:'/rest/urun',
                urlSil:'/rest/urun',
                fields: [
                    { name: "urunId", title: "Ürün Id"},
                    { name: "model", title: "Model"},
                    { name: "marka", title: "Marka"},
                    { name: "gelisTarihi", title: "Geliş Tarihi" },
                    { name: "bitisTarihi", title: "Bitiş Tarihi" },
                    { name: "bakimFiyati", title: "Bakim Fiyati"},
                    {name: 'actions',title: 'İşlemler'},
                ],
                musteriDatasiId :'' ,
                musteriDatasi: [
                ],
            }
        },
        created() {
            this.$http
                .get('/rest/musteri')
                .then((response) => {
                        let data  = response.data;
                        for(let key in data){
                            this.musteriDatasi.push({ ...data[key],id : key})
                        }
                    })
        },
        methods: {
            bul(){
                this.urunId = this.data.urunId
                this.model = this.data.model
                this.marka = this.data.marka
                this.gelisTarihi = this.data.gelisTarihi
                this.bitisTarihi = this.data.bitisTarihi
                this.bakimFiyati = this.data.bakimFiyati
            },
            guncelle(){
                if(this.data.urunId!=null){
                    this.$http
                        .put(
                            '/rest/urun/'+this.data.urunId, (
                                {
                                    model: this.model,
                                    marka: this.marka,
                                    gelisTarihi: this.gelisTarihi,
                                    bitisTarihi: this.bitisTarihi,
                                    bakimFiyati: this.bakimFiyati,
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
            urunkayit() {
                this.$http
                    .post(
                        '/rest/urun/'+this.musteriDatasiId, (
                            {
                                model: this.model,
                                marka: this.marka,
                                gelisTarihi: this.gelisTarihi,
                                bitisTarihi: this.bitisTarihi,
                                bakimFiyati: this.bakimFiyati,
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