"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.juno = void 0;
const auth_1 = require("./auth");
const email_1 = require("./email");
const project_1 = require("./project");
const user_1 = require("./user");
class JunoAPI {
    get user() {
        if (!this.userAPI) {
            throw new Error('juno.init() must be called before using the Juno SDK');
        }
        return this.userAPI;
    }
    get email() {
        if (!this.emailAPI) {
            throw new Error('juno.init() must be called before using the Juno SDK');
        }
        return this.emailAPI;
    }
    get project() {
        if (!this.projectAPI) {
            throw new Error('juno.init() must be called before using the Juno SDK');
        }
        return this.projectAPI;
    }
    init(options) {
        this.apiKey = options.apiKey;
        this.authAPI = new auth_1.AuthAPI(options.baseURL, this.apiKey);
        this.userAPI = new user_1.UserAPI(options.baseURL);
        this.emailAPI = new email_1.EmailAPI(options.baseURL, this.authAPI);
        this.projectAPI = new project_1.ProjectAPI(options.baseURL);
    }
}
exports.juno = new JunoAPI();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVuby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvanVuby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBaUM7QUFDakMsbUNBQW1DO0FBQ25DLHVDQUF1QztBQUN2QyxpQ0FBaUM7QUFFakMsTUFBTSxPQUFPO0lBT1gsSUFBSSxJQUFJO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1NBQ3pFO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7U0FDekU7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksT0FBTztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztTQUN6RTtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQTZDO1FBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxvQkFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0Y7QUFFWSxRQUFBLElBQUksR0FBWSxJQUFJLE9BQU8sRUFBRSxDQUFDIn0=