export default class CartItem {
    constructor(Qty, title, price, sum) {
        this.Qty = Qty;
        this.sum = sum;
        this.title = title;
        this.price = price;
    }
}