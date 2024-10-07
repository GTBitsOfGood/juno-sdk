"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIS = exports.HttpError = void 0;
__exportStar(require("./authApi"), exports);
const authApi_1 = require("./authApi");
__exportStar(require("./emailApi"), exports);
const emailApi_1 = require("./emailApi");
__exportStar(require("./projectApi"), exports);
const projectApi_1 = require("./projectApi");
__exportStar(require("./userApi"), exports);
const userApi_1 = require("./userApi");
class HttpError extends Error {
    constructor(response, body, statusCode) {
        super('HTTP request failed');
        this.response = response;
        this.body = body;
        this.statusCode = statusCode;
        this.name = 'HttpError';
    }
}
exports.HttpError = HttpError;
exports.APIS = [authApi_1.AuthApi, emailApi_1.EmailApi, projectApi_1.ProjectApi, userApi_1.UserApi];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbnRlcm5hbC9hcGkvYXBpcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUEwQjtBQUMxQix1Q0FBb0M7QUFDcEMsNkNBQTJCO0FBQzNCLHlDQUFzQztBQUN0QywrQ0FBNkI7QUFDN0IsNkNBQTBDO0FBQzFDLDRDQUEwQjtBQUMxQix1Q0FBb0M7QUFHcEMsTUFBYSxTQUFVLFNBQVEsS0FBSztJQUNoQyxZQUFvQixRQUE4QixFQUFTLElBQVMsRUFBUyxVQUFtQjtRQUM1RixLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQURiLGFBQVEsR0FBUixRQUFRLENBQXNCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFTLGVBQVUsR0FBVixVQUFVLENBQVM7UUFFNUYsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7SUFDNUIsQ0FBQztDQUNKO0FBTEQsOEJBS0M7QUFJWSxRQUFBLElBQUksR0FBRyxDQUFDLGlCQUFPLEVBQUUsbUJBQVEsRUFBRSx1QkFBVSxFQUFFLGlCQUFPLENBQUMsQ0FBQyJ9