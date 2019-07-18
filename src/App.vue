<template>
    <div id="app">
        <link href="//netdna.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet"/>
        <link href="../node_modules/toastr/build/toastr.css" rel="stylesheet"/>
        <div class="container">
            <div id="wrapper" v-show="true">
                <hr>
                <Menu/>
                <hr>
            </div>
            <router-view/>
            <div class="wrapper wrapper-content">
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
    import Menu from "@/components/Menu.vue";

    export default {
        name: "App",
        components: {
            Menu
        }
    }
</script>

