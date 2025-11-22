// Solid principles example: Single Responsibility Principle
class UserService {
  register(user) {
    // save user to DB
  }

  sendWelcomeEmail(user) {
    // send email
  }
}

class UserRepository {
  save(user) {
    // save user to DB
  }
}

class EmailService {
  sendWelcomeEmail(user) {
    // send email
  }
}

class UserService {
  constructor(userRepo, emailService) {
    this.userRepo = userRepo;
    this.emailService = emailService;
  }

  register(user) {
    this.userRepo.save(user);
    this.emailService.sendWelcomeEmail(user);
  }
}

// open/closed principle example

// # wrong
function calculateDiscount(type, price) {
  if (type === "regular") return price * 0.9;
  if (type === "gold") return price * 0.8;
  if (type === "vip") return price * 0.7;
}

// # correct
class Discount {
  apply(price) {
    return price;
  }
}

class RegularDiscount extends Discount {
  apply(price) {
    return price * 0.9;
  }
}

class GoldDiscount extends Discount {
  apply(price) {
    return price * 0.8;
  }
}

class PriceCalculator {
  constructor(discount) {
    this.discount = discount;
  }

  calc(price) {
    return this.discount.apply(price);
  }
}

// Interface Segregation Principle example
// # wrong
class Worker {
  work() {}
  eat() {}
}

class Robot extends Worker {
  eat() {
    throw new Error("Robots don't eat!");
  }
}

// # correct
class Workable {
  work() {}
}

class Eatable {
  eat() {}
}

class Human extends Workable {
  eat() {}
}

class Robot extends Workable {}
