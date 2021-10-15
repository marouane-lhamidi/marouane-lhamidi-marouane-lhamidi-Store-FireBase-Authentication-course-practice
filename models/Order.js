import moment from "moment";

export default class Order {
    constructor(id, totalCart, totalAmount, date) {
        this.id = id;
        this.date = date;
        this.totalCart = totalCart;
        this.totalAmount = totalAmount;
    }

    get readDate () {
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }
}