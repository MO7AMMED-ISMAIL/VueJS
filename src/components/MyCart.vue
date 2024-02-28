<template>
    <div>
        <div class="table-responsive">
            <table class="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">ISBN</th>
                        <th scope="col">Name</th>
                        <th scope="col">Author</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in product" :key="index">
                        <td>{{item.isbn}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.author}}</td>
                        <td>{{item.category}}</td>
                        <td>{{item.price}}</td>
                        <td>
                            <button class="btn btn-danger" @click="Remove(index)">Remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
</template>

<script>
    export default{
        data() {
            return {
                product:[]
            }
        },
        methods:{
            async Remove(index){
                this.Update(index);
                let id = this.product[index].id.toString();
                await fetch(`http://localhost:4000/cartbooks/${id}`,{
                    method: "DELETE",
                    headers:{
                        "Content-Type": "application/json"
                    }
                })
                this.product.splice(index,1);
            },
            async Update(index){
                let id = this.product[index].id;
                this.product[index].isAdd= false;
                await fetch(`http://localhost:5000/books/${id.toString()}`,{
                    method: "PUT",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.product[index])
                });
            }
        },
        async created(){
            let cart = await fetch(`http://localhost:4000/cartbooks`);
            let myPro = await cart.json();
            this.product = myPro;
        }
    }
</script>