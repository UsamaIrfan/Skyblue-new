class Cart {
  constructor(id, prodId, title, imageUrl, price, discountPrice, quanity) {
    (this.id = id),
      (this.prodId = prodId),
      (this.title = title),
      (this.imageUrl = imageUrl),
      (this.price = price),
      (this.discountPrice = discountPrice),
      (this.quanity = quanity);
  }
}

export default Cart;
