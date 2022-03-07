<template>
    <div class="kefu_v">
        <iframe src="https://jingyan.baidu.com/article/4f7d57127447b95a21192774.html"></iframe>
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch'

    export default {
        name: "news",
        components: {},
        data() {
            return {
                data: {}
            };
        },
        created() {
            this.$parent.footer(true, 'news');
        },
        mounted() {
            this.start();
        },
        methods: {
            start() {

                Fetch('/index/webconfig', {type: 'web'}).then(res => {
                    this.data = res.data;
                })
            },
        }
    };
</script>

<style lang="less" scoped>

    .kefu_v {
        position: fixed;
        width: 100%;
        height: 100%;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;

        iframe {
            padding-bottom: 55px;
            width: 100%;
            height: 100%;
        }
    }
</style>


