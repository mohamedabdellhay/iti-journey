const User = require("../lab2");

describe("User", () => {
  it("addToCart pushes product into cart", () => {
    const user = new User("name", "pass");
    const product = { name: "apple", price: 10 };
    user.addToCart(product);
    user.addToCart({ name: "banana", price: 5 });
    // console.log(user.cart);
    expect(user.cart).toContain(product);
  });

  it("calculateTotalCartPrice returns sum of prices", () => {
    const user = new User("name", "pass");
    user.addToCart({ name: "a", price: 5 });
    user.addToCart({ name: "b", price: 5 });
    // console.log(user.calculateTotalCartPrice());
    expect(user.calculateTotalCartPrice()).toBe(10);
  });

  it("checkout calls paymentModel methods and returns true when verified", () => {
    const user = new User("n", "p");
    const paymentModel = {
      goToVerifyPage: jasmine.createSpy("goToVerifyPage"),
      returnBack: jasmine.createSpy("returnBack"),
      isVerify: jasmine.createSpy("isVerify").and.returnValue(true),
    };

    expect(user.checkout(paymentModel)).toBe(true);
    expect(paymentModel.goToVerifyPage).toHaveBeenCalled();
    expect(paymentModel.returnBack).toHaveBeenCalled();
    expect(paymentModel.isVerify).toHaveBeenCalled();
  });

  it("checkout returns false when not verified", () => {
    const user = new User("n", "p");
    const paymentModel = {
      goToVerifyPage: jasmine.createSpy("goToVerifyPage"),
      returnBack: jasmine.createSpy("returnBack"),
      isVerify: jasmine.createSpy("isVerify").and.returnValue(false),
    };

    expect(user.checkout(paymentModel)).toBe(false);
  });
});
