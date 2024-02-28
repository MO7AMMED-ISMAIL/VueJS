<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div class="row">
            <div class="col-lg-12 col-md-12 m-3 d-flex">
                <button class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#modalId">ADD</button>
                <input class="form-control w-50 mx-auto" type="text" placeholder="Enter the Name to search...." v-model="searchName"  @input="searchByName"/>
            </div>
            <div class="col-lg-12 col-md-12">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th v-for="(column, index) in columns" :key="index">{{ column }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex">
                            <td>{{row.id}}</td>
                            <td>{{row.name}}</td>
                            <td>{{row.category}}</td>
                            <td>{{row.author}}</td>
                            <td>{{row.price}}</td>
                            <td>
                                <button class="btn btn-primary mx-2" @click="editBook(row)" data-bs-toggle="modal" data-bs-target="#modaledit">Edit</button>
                                <button @click="deleteBook(row.id)" class="btn btn-danger mx-2">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12">
                <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                            <button class="page-link" @click="previousPage" :disabled="currentPage === 1">Previous</button>
                        </li>
                        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                            <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <!-- Modal Add -->
        <div class="modal fade" id="modalId" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTitleId">
                            Add Book
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <input type="text" class="form-control mb-2" placeholder="Enter the name" v-model="newBook.name">
                            <input type="text" class="form-control mb-2" placeholder="Enter the Category" v-model="newBook.category">
                            <input type="text" class="form-control mb-2" placeholder="Enter the Author" v-model="newBook.author">
                            <input type="text" class="form-control mb-2" placeholder="Enter the Price" v-model="newBook.price">
                            <input type="text" class="form-control mb-2" placeholder="Enter the Number of page" v-model="newBook.noPage">
                            <button @click="AddBook" class="btn btn-primary w-50" data-bs-dismiss="modal">Add</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        
        <!-- Modal edit-->
        <div
            class="modal fade"
            id="modaledit"
            tabindex="-1"
            role="dialog"
            aria-labelledby="modalTitleId"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTitleId">
                            Edit Modal
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <input type="text" class="form-control mt-2"  v-model="newBook.name">

                            <input type="text" class="form-control mt-2" v-model="newBook.category">

                            <input type="text" class="form-control mt-2" v-model="newBook.author">

                            <input type="text" class="form-control mt-2" v-model="newBook.price">

                            <input type="text" class="form-control mt-2" v-model="newBook.noPage">

                            <button class="btn btn-primary w-50 mt-2" @click="update" data-bs-dismiss="modal">Update</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                staticData: [],
                columns: ['isbn', 'Name', 'category','author','price','action'],
                pageSize: 3,
                currentPage: 1,
                searchName:'',
                filteredData: [],
                newBook: {
                    id: '',
                    isbn: '',
                    name: "",
                    category: "",
                    image: "",
                    noPage: "",
                    author: "",
                    price: "",
                    isAdd: false
                }
            };
        },
        computed: {
            totalPages() {
                return Math.ceil(this.filteredData.length / this.pageSize);
            },
            paginatedData() {
                const start = (this.currentPage - 1) * this.pageSize;
                const end = start + this.pageSize;
                return this.filteredData.slice(start, end);
            },
        },
        methods: {
            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                }
            },
            previousPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
            },
            searchByName(){
                if (!this.searchName.trim()) {
                    this.filteredData = this.staticData;
                }
                this.filteredData = this.staticData.filter(row => {
                    return row.name.toLowerCase().includes(this.searchName.toLowerCase());
                });
            },
            async AddBook(){
                this.newBook.id = this.staticData.length > 0 ? parseInt(this.staticData[this.staticData.length - 1].id) + 1 : 1;

                this.newBook.isbn = this.staticData.length > 0 ? parseInt(this.staticData[this.staticData.length - 1].isbn) + 1 : 1;

                await fetch(`http://localhost:5000/books`,{
                    method: "POST",
                    headers:{
                        "content-type":"aplication/json"
                    },
                    body:JSON.stringify(this.newBook)
                });
                this.staticData.push({...this.newBook});
                this.newBook={
                    id: '',
                    isbn: '',
                    name: "",
                    category: "",
                    image: "",
                    noPage: "",
                    author: "",
                    price: "",
                    isAdd: false
                };
            },
            async deleteBook(id){
                console.log(`http://localhost:5000/books/${id.toString()}`);
                await fetch(`http://localhost:5000/books/${id.toString()}`,{
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json"
                    }
                });
                this.filteredData= this.staticData.filter(book=>book.id != id);
            },

            async update(){
                // console.log(this.newBook);
                await fetch(`http://localhost:5000/books/${this.newBook.id}`,{
                    method: "PUT",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(this.newBook)
                });
                this.staticData.find(book=>book.id == this.newBook.id).name = this.newBook.name;
                this.staticData.find(book=>book.id == this.newBook.id).category = this.newBook.category;
                this.staticData.find(book=>book.id == this.newBook.id).author = this.newBook.author;
                this.staticData.find(book=>book.id == this.newBook.id).noPage = this.newBook.noPage;
                this.staticData.find(book=>book.id == this.newBook.id).price = this.newBook.price;
            },
            editBook(data){
                this.newBook.id = data.id;
                this.newBook.isbn = data.isbn
                this.newBook.name = data.name;
                this.newBook.category = data.category;
                this.newBook.author = data.author;
                this.newBook.price = data.price;
                this.newBook.noPage = data.noPage;
            }
        },
        async created() {
            let fetchData = await fetch(`http://localhost:5000/books`);
            let data = await fetchData.json();
            this.staticData = data;
            this.filteredData = data;
        },
    };
</script>
