<template>
    <div class="row m-3">
        <div class="col-lg-3 col-md-6 col-sm-12" v-for="(item, index) in products" :key="index">
            <div class="card p-3 mt-2">
                <img class="card-img-top mx-auto" :src="image(index+1)"/>
                <div class="card-body">
                    <div class="card-title">
                        <h4 class="">{{item.name}}</h4>
                    </div>
                    <div class="card-text">
                        <p>{{item.category}}</p>
                    </div>
                    <div class="card-text">
                        <p>{{item.author}}</p>
                    </div>
                    <div class="card-text">
                        <p >{{item.price}}.EL</p>
                    </div>
                    <button class="btn btn-primary" @click="addCart(index)" :disabled="item.isAdd">ADD to Cart</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    
    export default{
        data() {
            return {
                products:[]
            }
        },
        async created(){
            let fetchData = await fetch(`http://localhost:5000/books`);
            let data = await fetchData.json();
            this.products = data;
        },
        methods: {
            image(index){
                return `http://localhost:8080/images/${index}.png`
            },
            addCart(index){
                this.products[index].isAdd = true;
                let id = this.products[index].id;
                this.update(id,index);
                this.addProduct(index);
            },
            async update(id,index){
                await fetch(`http://localhost:5000/books/${id.toString()}`,{
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.products[index])
                });
            },
            async addProduct(index){
                await fetch(`http://localhost:4000/cartbooks`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "applicatio/json"
                    },
                    body: JSON.stringify(this.products[index])
                });
            }
        },
    }
</script>

<style scope>
    img{
        max-width: 200px;
        min-width: 200px;
        max-height: 150px;
        min-height: 150px;
    }
</style>
