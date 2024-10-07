"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAPI = void 0;
const api_1 = require("../internal/api");
class UserAPI {
    constructor(baseURL) {
        this.internalApi = new api_1.UserApi(baseURL);
    }
    async createUser(options) {
        let { email, name, password, adminEmail, adminPassword } = options;
        if (!email || email.trim().length === 0) {
            throw new Error('The email must be nonempty');
        }
        if (!name || name.trim().length === 0) {
            throw new Error('The name for the user must be nonempty');
        }
        if (!password || password.trim().length === 0) {
            throw new Error('The password for the user must be nonempty');
        }
        email = email.trim();
        name = name.trim();
        password = password.trim();
        try {
            const createUserModel = { email, name, password };
            const res = await this.internalApi.userControllerCreateUser(adminPassword, adminEmail, createUserModel);
            return res.body;
        }
        catch (e) {
            throw e;
        }
    }
    async linkToProject(options) {
        let { userId, projectId, projectName, email, password } = options;
        if (!userId || userId.trim().length === 0) {
            throw new Error('The user ID must be a non-empty string.');
        }
        if (!projectId) {
            throw new Error('The project ID information must be valid.');
        }
        if (!projectName || projectName.trim().length === 0) {
            throw new Error('The project name must be a non-empty string.');
        }
        const linkProjectModel = {
            id: projectId,
            name: projectName.trim(),
        };
        try {
            const response = await this.internalApi.userControllerLinkUserWithProjectId(userId, password, email, linkProjectModel);
            return response.body;
        }
        catch (e) {
            throw e;
        }
    }
    async setUserType(options) {
        const { email, type, adminEmail, adminPassword } = options;
        if (!email || email.trim().length === 0) {
            throw new Error('The email must be a non-empty string.');
        }
        const setUserTypeModel = {
            email: email.trim(),
            type,
        };
        try {
            const response = await this.internalApi.userControllerSetUserType(adminPassword, adminEmail, setUserTypeModel);
            return response.body;
        }
        catch (e) {
            throw e;
        }
    }
    async getUser(id) {
        if (!id || id.trim()) {
            throw new Error('The id must be nonempty');
        }
        try {
            const res = await this.internalApi.userControllerGetUserById(id);
            return res.body;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.UserAPI = UserAPI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FNeUI7QUFFekIsTUFBYSxPQUFPO0lBRWxCLFlBQVksT0FBZ0I7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGFBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQU1oQjtRQUNDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ25FLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztTQUMvRDtRQUNELEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTNCLElBQUk7WUFDRixNQUFNLGVBQWUsR0FBb0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO1lBQ25FLE1BQU0sR0FB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