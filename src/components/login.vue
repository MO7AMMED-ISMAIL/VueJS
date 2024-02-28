<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="pt-5 m-5">
        <div class="row pt-5">
            <div class="col-lg-6 m-auto text-center">
                <div class="card mb-3 p-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="1.png" class="img-fluid rounded-start">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Login</h5>
                                <form action="">
                                    <div class="mb-3 row">
                                        <label for="staticEmail" class="col-sm-2 col-form-label">name</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="staticEmail" v-model="name"/>
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="inputPassword" class="col-sm-2 col-form-label">Pass</label>
                                        <div class="col-sm-10">
                                            <input type="password" class="form-control" id="inputPassword" v-model="pass"/>
                                        </div>
                                    </div>
                                    <div class="row w-50 mx-auto">
                                        <button class="btn btn-primary mx-5" type="submit" @click.prevent="login">
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
    import {useLoginStore} from '@/stores/loginStore';

    export default {
        data() {
            return {
                name: "",
                pass:""
            }
        },
        methods: {
            login(){
                if(this.name === "mohamed" && this.pass === '123'){
                    const authUser = useLoginStore();
                    authUser.userLogin();
                    this.$router.push('/home');
                }
            }
        },
    }
</script>