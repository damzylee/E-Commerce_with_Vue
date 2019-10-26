new Vue({
    el: '#app',
    data: {
      

        cart: {
            items: []
        },

        products: [
            {
                id: 1,
                name: 'MacBook Pro (15 inch)',
                description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
                price: 2999,
                inStock: 50,
                src: 'image/MacBookPro15.jpg'
            },
            {
                id: 2,
                name: 'Samsung Galaxy Note 7',
                description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
                price: 299,
                inStock: 755,
                src: 'image/SamsungGalaxyNote7.jpg'
            },
            {
                id: 3,
                name: 'HP Officejet 5740 e-All-in-One-printer',
                description: 'This one might not last for so long, but hey, printers never work anyways, right?',
                price: 149,
                inStock: 5,
                src: 'image/HPOfficeJet.jpg'
            },
            {
                id: 4,
                name: 'iPhone 7 cover',
                description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                price: 49,
                inStock: 42,
                src: 'image/iPhone7Cover.jpg'
            },
            {
                id: 5,
                name: 'iPad Pro (9.7 inch)',
                description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
                price: 599,
                inStock: 0,
                src: 'image/iPad.jpg'
            },
            {
                id: 6,
                name: 'OnePlus 3 cover',
                description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                price: 19,
                inStock: 81,
                src: 'image/oneplus3.jpg'
            }
        ],

        isShowingCart: false,
    },

    methods: {
        addProductToCart: function(product){
            let checkItem = this.cartCheck(product);

            if(checkItem != null){
                checkItem.quantity++;
            }
            else{
                this.cart.items.push({
                    product: product,
                    quantity: 1
                });
            }

            product.inStock--;
        },

        cartCheck: function(product){
            for(i=0; i < this.cart.items.length; i++){
                if(this.cart.items[i].product.id === product.id){
                    return this.cart.items[i];
                }
            }

            return null;
        },

        addToQuantity: function(item){
            if(item.product.inStock != 0){
                item.product.inStock--;
                item.quantity++;
            }else{
                return;
            }
        },

        subtractFromQuantity: function(item){
            item.product.inStock++;
            item.quantity--;
            if(item.quantity < 1){
                this.removeCartItem(item);
            }
        },

        removeCartItem: function(item){
            var remove = this.cart.items.indexOf(item);

            if(remove != -1){
                this.cart.items.splice(remove, 1);
            }
        },

        checkOut: function(){
            if(confirm("Are you sure you want to checkout?")){
                this.cart.items.forEach(function(item){
                    item.product.inStock += item.quantity;
                });

                this.cart.items = [];
            }
        }
    },

    computed: {
        cartTotal: function(){
            let total = 0;
            this.cart.items.forEach(function(item){
                total += item.quantity * item.product.price;
            });

            return total;
        },

        taxTotal: function(){
            return ((this.cartTotal * 10) / 100);
        },

        discount: function(){
            let discount = 0;
            if(this.cartTotal > 20000){
                discount = ((this.cartTotal * 10) / 100);
                return discount;
            }

            return discount;
        }
    },

    filters: {
        currency: function(money){
            var formatter = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });

            return formatter.format(money);
        },

    }
});