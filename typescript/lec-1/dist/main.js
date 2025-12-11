"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
function Log(constructor) {
    return class extends constructor {
        constructor(...args) {
            super(...args);
            console.log(`Instance created of ${constructor.name}`);
        }
        abdellhay() {
            console.log("abdellhay from class decorator");
        }
    };
}
function Get(target, methodName, meta) {
    console.log("target: ", target);
    console.log("methodName: ", methodName);
    console.log("meta: ", meta);
    meta.value = function () {
        console.log("i change function behavior");
    };
}
function Prop(target, propertyKey) {
    console.log("prop ", propertyKey);
}
// @Log
class User {
    constructor() {
        this.age = 25;
        console.log("class User");
    }
    hi() {
        console.log("hi");
    }
}
__decorate([
    Prop,
    __metadata("design:type", Object)
], User.prototype, "age", void 0);
__decorate([
    Get,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "hi", null);
// @Log
class Student {
    constructor() {
        this.email = "abdellhay@mail.com";
        console.log("student class");
    }
}
__decorate([
    Prop,
    __metadata("design:type", Object)
], Student.prototype, "email", void 0);
const user = new User();
const student = new Student();
// student.abdellhay();
user.hi();
//# sourceMappingURL=main.js.map