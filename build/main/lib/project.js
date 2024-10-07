"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectAPI = void 0;
const api_1 = require("../internal/api");
class ProjectAPI {
    constructor(baseURL) {
        this.internalApi = new api_1.ProjectApi(baseURL);
    }
    async createProject(options) {
        const { projectName, superadminEmail, superadminPassword } = options;
        if (!projectName || projectName.trim().length === 0) {
            throw new Error('The project name must be provided as an input and has to be nonempty!');
        }
        try {
            const createProjectModel = new api_1.CreateProjectModel();
            createProjectModel.name = projectName;
            const res = await this.internalApi.projectControllerCreateProject(superadminPassword, superadminEmail, createProjectModel);
            return res.body;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    // Should be by ID or Name
    async getProject(input) {
        checkInput(input);
        try {
            const res = input.id
                ? await this.internalApi.projectControllerGetProjectById(`${input.id}`)
                : await this.internalApi.projectControllerGetProjectByName(input.name);
            return res.body;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    // Should be by ID or Name
    async linkProjectToUser(options) {
        const { input, email, id } = options;
        checkInput(input);
        if (!email ||
            email.trim().length === 0 ||
            !id ||
            id.toString().length === 0) {
            throw new Error('Please verify the email is non empty and the id is non empty!');
        }
        try {
            const linkUserModel = new api_1.LinkUserModel();
            linkUserModel.email = email;
            linkUserModel.id = id;
            const res = input.id
                ? await this.internalApi.projectControllerLinkUserWithProjectId(input.id, linkUserModel)
                : await this.internalApi.projectControllerLinkUserWithProjectName(input.name, linkUserModel);
            return res.body;
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
exports.ProjectAPI = ProjectAPI;
const checkInput = (input) => {
    if (!input) {
        throw new Error('The project input provided must include either the id or name and cannot be null!');
    }
    if (!input.id && input.name.trim().length === 0) {
        throw new Error('The project input name cannot be empty!');
    }
    else if (!input.name && !input.id) {
        throw new Error('The project input id cannot be empty!');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcHJvamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FLeUI7QUFhekIsTUFBYSxVQUFVO0lBRXJCLFlBQVksT0FBZ0I7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGdCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNELEtBQUssQ0FBQyxhQUFhLENBQUMsT0FJbkI7UUFDQyxNQUFNLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNyRSxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ25ELE1BQU0sSUFBSSxLQUFLLENBQ2IsdUVBQXVFLENBQ3hFLENBQUM7U0FDSDtRQUVELElBQUk7WUFDRixNQUFNLGtCQUFrQixHQUFHLElBQUksd0JBQWtCLEVBQUUsQ0FBQztZQUNwRCxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1lBRXRDLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FDL0Qsa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixrQkFBa0IsQ0FDbkIsQ0FBQztZQUNGLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztTQUNqQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFDRCwwQkFBMEI7SUFDMUIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUF1QjtRQUN0QyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEIsSUFBSTtZQUNGLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxFQUFFO2dCQUNsQixDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLCtCQUErQixDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN2RSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLGlDQUFpQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDakI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBQ0QsMEJBQTBCO0lBQzFCLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUl2QjtRQUNDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNyQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEIsSUFDRSxDQUFDLEtBQUs7WUFDTixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUM7WUFDekIsQ0FBQyxFQUFFO1lBQ0gsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQzFCO1lBQ0EsTUFBTSxJQUFJLEtBQUssQ0FDYiwrREFBK0QsQ0FDaEUsQ0FBQztTQUNIO1FBRUQsSUFBSTtZQUNGLE1BQU0sYUFBYSxHQUFHLElBQUksbUJBQWEsRUFBRSxDQUFDO1lBQzFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQzVCLGFBQWEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBRXRCLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxFQUFFO2dCQUNsQixDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLHNDQUFzQyxDQUMzRCxLQUFLLENBQUMsRUFBRSxFQUNSLGFBQWEsQ0FDZDtnQkFDSCxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLHdDQUF3QyxDQUM3RCxLQUFLLENBQUMsSUFBSSxFQUNWLGFBQWEsQ0FDZCxDQUFDO1lBQ04sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ2pCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztDQUNGO0FBbEZELGdDQWtGQztBQUVELE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBdUIsRUFBRSxFQUFFO0lBQzdDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixNQUFNLElBQUksS0FBSyxDQUNiLG1GQUFtRixDQUNwRixDQUFDO0tBQ0g7SUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDL0MsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0tBQzVEO1NBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztLQUMxRDtBQUNILENBQUMsQ0FBQyJ9