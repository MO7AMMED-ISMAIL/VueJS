<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav m-auto mb-2 mb-lg-0">
                            <li class="nav-item mx-4">
                                <router-link to="/home/product" class="nav-link active">
                                    Dasbord
                                    
                                </router-link>
                            </li>
                            <li class="nav-item mx-4">
                                <router-link to="/home/show" class="nav-link">
                                    Product
                                </router-link>
                            </li>
                            <li class="nav-item mx-4">
                                <router-link to="/home/cart" class="nav-link">
                                    myCart
                                </router-link>
                            </li>
                        </ul>
                        <button class="btn btn-outline-success mx-2">
                            <router-link to="/">logout</router-link>
                        </button>
                        
                </div>
            </div>
        </nav>
    </div>
</template>


<script>

    export default{
        
    }
</script>

