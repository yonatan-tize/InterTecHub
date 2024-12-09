import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "src/enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<UserRole[]>('role', context.getHandler());
        // if no role is set that is public route
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const currentUserRole = request.currentUserRole;
        // Check if the user's roles is any of the required roles
        return roles.some(role => currentUserRole?.includes(role));
    }
}