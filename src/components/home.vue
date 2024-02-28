<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <NavBar/>
        <div class="container">
            <router-view></router-view>
        </div>

    </div>
    
</template>

<script>
import NavBar from './NavBar.vue'
import { useLoginStore } from '@/stores/loginStore'

export default {
    components:{
        NavBar
    },
    beforeRouteEnter(to, from, next) {
        const authUser = useLoginStore()
        if (!authUser.isLogin) {
            next('/'); 
        } else {
            next();
        }
    }
};
</script>
