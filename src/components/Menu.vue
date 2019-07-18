<template>
    <div class="Menu">
        <div class="container">
            <nav class="navbar navbar-dark" style="background-color: #e3f2fd;">
                <a class="navbar-brand"><router-link to="/" class="btn btn-link">Müsteri Kayit</router-link></a>
                <a class="navbar-brand"><router-link to="/urun" class="btn btn-link">Ürün Kayit</router-link></a>
                <a class="navbar-brand"><router-link to="/bakim" class="btn btn-link">Bakım Kayit</router-link></a>
                <a class="navbar-brand"><router-link to="/calisan" class="btn btn-link">Calisan Kayit</router-link></a>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Menu'
    }
</script>
