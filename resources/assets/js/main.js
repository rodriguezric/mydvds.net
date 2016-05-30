var Vue = require('vue');

/**
 * Component for listing all books
 **/

Vue.component('browse-list', {
    props: ['dvds'],
    template: '#browse-list',

    created: function() {
        $.getJSON('/book', function (data) {
            this.dvds = data;
        }.bind(this));

    }
});

/**
 * Component for listing results from a search
 **/
Vue.component('search-list', {
    template: '#search-list',

    data: function() {
        return {
            searchDvd: "",
            dvds: []
        }
    },
    methods: {
        searchDvds: function() {
            $.getJSON('/search/'+this.searchDvd, function(data) {
                this.dvds = data;
            }.bind(this));
        }
    }
});


new Vue({
    el: '#app',

    data: {
        browse_name: "Test",
        browse_pages: []
    },

    methods: {
        modalBook: function(book_id) {
            $.getJSON('book/'+book_id, function(data) {
                this.browse_pages = data.pages;
                this.browse_name  = data.name;
            }.bind(this));
        },

        createBook: function() {
            var book_title = prompt("Please enter the name of the book:", "");
            if (book_title !== null) {
                console.log(book_title);
            }
        },

        editBookName: function(book_id) {
            var book_name = prompt("Please enter a new name for the book:", "");
            if (book_name !== null) {
                $.get("book/"+book_id+"/"+book_name, function(data) {
                    location.reload();
                });
            }
        },
        editBookNameB: function(book_id) {
            var book_name = prompt("Please enter a new name for the book:", "");
            if (book_name !== null) {
                $.post("book/rename", {id: book_id, name: book_name}, function(data) {
                    console.log('data');
                });
            }
        },
        updateDisk: function(page_id, disk) {
            var disk_name = prompt("Please enter a new name for this disk:", "");

            if (disk_name !== null) {
                alert("New Name!");
            }
        }
    }

});
