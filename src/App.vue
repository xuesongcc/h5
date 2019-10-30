<template>
    <div id="app">
      <router-view v-if="isRouterAlive"></router-view>
      <commmask v-if="$store.state.user.mask!==0&&$store.state.user.mask!==undefined"/>
    </div>
</template>

<script>
  import commmask from '@c/Mask/Mask';
    export default {
        name: 'App',
      components: {commmask},
        provide() {
            return {
                reload: this.reload,
            };
        },
        data() {
            return {
                isRouterAlive: true,
                message: '渲染',
            };
        },
        methods: {
            /**
             * 刷新页面
             */
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(() => {
                    this.isRouterAlive = true;
                });
            },
        },
        mounted() {
        }
    };
</script>

<style lang="scss" type="text/scss">
</style>
