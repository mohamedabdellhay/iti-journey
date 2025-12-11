function Log<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      console.log(`Instance created of ${constructor.name}`);
    }
    abdellhay() {
      console.log("abdellhay from class decorator");
    }
  };
}

function Get(target: any, methodName: string, meta: PropertyDescriptor) {
  console.log("target: ", target);
  console.log("methodName: ", methodName);
  console.log("meta: ", meta);

  meta.value = function () {
    console.log("i change function behavior");
  };
}

function Prop(target: any, propertyKey: string) {
  console.log("prop ", propertyKey);
}

// @Log
class User {
  @Prop
  private age = 25;
  constructor() {
    console.log("class User");
  }

  @Get
  hi() {
    console.log("hi");
  }
}

// @Log
class Student {
  @Prop
  public email = "abdellhay@mail.com";
  [x: string]: any;
  constructor() {
    console.log("student class");
  }
}

const user = new User();
const student = new Student();

// student.abdellhay();

user.hi();
