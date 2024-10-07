"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAPI = void 0;
const api_1 = require("../internal/api");
class AuthAPI {
    constructor(baseURL, apiKey) {
        this.internalApi = new api_1.AuthApi(baseURL);
        this.apiKey = apiKey;
    }
    get junoApiKey() {
        return this.apiKey;
    }
    async createKey(options) {
        let { email, password, project, environment, description } = options;
        if (!email || email.trim().length === 0) {
            throw new Error('The email must be nonempty');
        }
        if (!password || password.trim().length === 0) {
            throw new Error('The password for the user must be nonempty');
        }
        if (!environment || environment.trim().length === 0) {
            throw new Error('The environment for the user must be nonempty');
        }
        email = email.trim();
        password = password.trim();
        environment = environment.trim();
        description = description.trim();
        try {
            const issueApiKeyRequest = {
                description,
                environment,
                project: {
                    name: project,
                },
            };
            const result = await this.internalApi.authControllerCreateApiKey(email, password, issueApiKeyRequest);
            return result.body;
        }
        catch (e) {
            throw e;
        }
    }
    async revokeKey(options) {
        let { apiKey } = options;
        if (!apiKey || apiKey.trim().length === 0) {
            throw new Error('The authorization token must be nonempty');
        }
        apiKey = apiKey.trim();
        try {
            const result = await this.internalApi.authControllerDeleteApiKey(apiKey);
            return result.body;
        }
        catch (e) {
            throw e;
        }
    }
    async createJWT() {
        try {
            const result = await this.internalApi.authControllerGetJWT('Bearer ' + this.apiKey);
            return result.body;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AuthAPI = AuthAPI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FLeUI7QUFFekIsTUFBYSxPQUFPO0lBR2xCLFlBQVksT0FBZ0IsRUFBRSxNQUFlO1FBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxhQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQU1mO1FBQ0MsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDckUsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDL0M7UUFDRCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztTQUMvRDtRQUNELElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbkQsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLFdBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxJQUFJO1lBQ0YsTUFBTSxrQkFBa0IsR0FBdUI7Z0JBQzdDLFdBQVc7Z0JBQ1gsV0FBVztnQkFDWCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLE9BQU87aUJBQ2Q7YUFDRixDQUFDO1lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLDBCQUEwQixDQUM5RCxLQUFLLEVBQ0wsUUFBUSxFQUNSLGtCQUFrQixDQUNuQixDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ3BCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixNQUFNLENBQUMsQ0FBQztTQUNUO0lBQ0gsQ0FBQztJQUNELEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBMkI7UUFDekMsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUM3RDtRQUNELE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSTtZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6RSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDcEI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE1BQU0sQ0FBQyxDQUFDO1NBQ1Q7SUFDSCxDQUFDO0lBQ0QsS0FBSyxDQUFDLFNBQVM7UUFDYixJQUFJO1lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUN4RCxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FDeEIsQ0FBQztZQUNGLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQztTQUNwQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsTUFBTSxDQUFDLENBQUM7U0FDVDtJQUNILENBQUM7Q0FDRjtBQXhFRCwwQkF3RUMifQ==