<template>
    <div class="container">
        <div class="form-group row">
            <div class="col-sm-5"></div>
            <div class="col-sm-7">
                <h3><span class="badge badge-primary">Müşteri Girişi</span></h3>
            </div>
        </div>
        <hr>
        <form>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Müşteri Adi</label>
                <div class="col-sm-4">
                    <input type="text" v-model="adi" name="adi" class="form-control"
                           placeholder="Müşteri adını giriniz.">
                </div>
                <label class="col-sm-2 col-form-label">Müşteri Soyadi</label>
                <div class="col-sm-4">
                    <input type="text" v-model="soyadi" name="soyadi" class="form-control"
                           placeholder="Müşteri soyadını giriniz.">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">T.C.</label>
                <div class="col-sm-4">
                    <input type="number" min="0" max="500" v-model="tc" name="tc" class="form-control"
                           placeholder="T.C giriniz.">
                </div>
                <label class="col-sm-2 col-form-label">Telefon Numarasi</label>
                <div class="col-sm-4">
                    <input type="number" min="0" max="500" v-model="telefon" name="telefon" class="form-control"
                           placeholder="Telefon nuamrası giriniz.">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Mail</label>
                <div class="col-sm-4">
                    <input type="text" v-model="mail" name="mail" class="form-control"
                           placeholder="Mail adresi giriniz.">
                </div>
                <label class="col-sm-2 col-form-label">Adres</label>
                <div class="col-sm-4">
                    <input type="text" v-model="adres" name="adres" class="form-control"
                           placeholder="Adres giriniz.">
                </div>
            </div>
        </form>
        <div class="form-group row">
            <div class="col-sm-2">
                <button class="btn btn-primary" v-on:click="musterikayit">Musteri Kayit</button>
            </div>
            <div class="col-sm-2">
                <button class="btn btn-success" v-on:click="guncelle">Güncelle</button>
            </div>
        </div>


        <datagrid :urlListe="urlListe" :urlSil="urlSil" :fields="fields" :deleteId="deleteId" @data="data = $event"
                  @bul="bul"></datagrid>

    </div>

</template>

<script>
    export default {
        name: 'musteri',
        components: {},
        data() {
            return {
                tc: '',
                adi: '',
                soyadi: '',
                mail: '',
                telefon: '',
                adres: '',
                data: [],
                deleteId: "musteriId",
                urlListe: '/rest/musteri',
                urlSil: '/rest/musteri',
                fields: [
                    {name: 'musteriId', title: 'Müsteri Id'},
                    {name: 'tc', title: 'T.C.'},
                    {name: 'adi', title: 'Müşteri Adi'},
                    {name: 'soyadi', title: 'Müşteri Soyadi'},
                    {name: 'mail', title: 'Müşteri Mail'},
                    {name: 'telefon', title: 'Müşteri Telefon'},
                    {name: 'adres', title: 'Müşteri Adres'},
                    {name: 'actions', title: 'İşlemler'},
                ],
            }
        },
        created() {

        },
        methods: {
            bul() {
                this.musteriId = this.data.musteriId
                this.tc = this.data.tc
                this.adi = this.data.adi
                this.soyadi = this.data.soyadi
                this.mail = this.data.mail
                this.telefon = this.data.telefon
                this.adres = this.data.adres
            },
            guncelle() {
                if (this.data.musteriId != null) {
                    this.$http
                        .post(
                            '/rest/musteri/' + this.data.musteriId, (
                                {
                                    tc: this.tc,
                                    adi: this.adi,
                                    soyadi: this.soyadi,
                                    mail: this.mail,
                                    telefon: this.telefon,
                                    adres: this.adres,
                                }
                            ))
                        .then(request => {
                            this.$message.success("Güncelleme yapıldı.");
                            setTimeout(function () {
                                window.location.reload();
                            }, 2000);
                        })
                        .catch(err => {
                            this.$message.success("Güncelleme yapılırken hata oluştu.");
                        });
                } else {
                    this.$message.warning("Kayit çağırınız");
                }
            },
            musterikayit() {
                this.$http
                    .post(
                        '/rest/musteri', (
                            {
                                tc: this.tc,
                                adi: this.adi,
                                soyadi: this.soyadi,
                                mail: this.mail,
                                telefon: this.telefon,
                                adres: this.adres,
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
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                }
            },
            kayitBasarisiz(err) {
                if (err) {
                    this.$message.warning("Kayit gerçekleştirilemedi.");
                }
            }
        }
    }
</script>

