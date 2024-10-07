export * from './authApi';
import { AuthApi } from './authApi';
export * from './emailApi';
import { EmailApi } from './emailApi';
export * from './projectApi';
import { ProjectApi } from './projectApi';
export * from './userApi';
import { UserApi } from './userApi';
export class HttpError extends Error {
    response;
    body;
    statusCode;
    constructor(response, body, statusCode) {
        super('HTTP request failed');
        this.response = response;
        this.body = body;
        this.statusCode = statusCode;
        this.name = 'HttpError';
    }
}
export const APIS = [AuthApi, EmailApi, ProjectApi, UserApi];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbnRlcm5hbC9hcGkvYXBpcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjLFdBQVcsQ0FBQztBQUMxQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLGNBQWMsWUFBWSxDQUFDO0FBQzNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDdEMsY0FBYyxjQUFjLENBQUM7QUFDN0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxjQUFjLFdBQVcsQ0FBQztBQUMxQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBR3BDLE1BQU0sT0FBTyxTQUFVLFNBQVEsS0FBSztJQUNaO0lBQXVDO0lBQWtCO0lBQTdFLFlBQW9CLFFBQThCLEVBQVMsSUFBUyxFQUFTLFVBQW1CO1FBQzVGLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRGIsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBUztRQUU1RixJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztJQUM1QixDQUFDO0NBQ0o7QUFJRCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyJ9