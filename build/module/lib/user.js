import { UserApi, } from '../internal/api';
export class UserAPI {
    internalApi;
    constructor(baseURL) {
        this.internalApi = new UserApi(baseURL);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsT0FBTyxHQUtSLE1BQU0saUJBQWlCLENBQUM7QUFFekIsTUFBTSxPQUFPLE9BQU87SUFDVixXQUFXLENBQVU7SUFDN0IsWUFBWSxPQUFnQjtRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRCxLQUFLLENBQUMsVUFBVSxDQUFDLE9BTWhCO1FBQ0MsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDbkUsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDL0M7UUFDRCxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztTQUMzRDtRQUNELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFM0IsSUFBSTtZQUNGLE1BQU0sZUFBZSxHQUFvQixFQUFFLEtB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