import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private readonly jwtService: JwtService,
    ) {}    
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token){
            throw new HttpException('Invalid token', 401);
        }

        try{
            const payLoad = this.jwtService.verify(token);
            request.currentUserId = payLoad.sub;
            request.currentUserRole = payLoad.role
        } catch(err){
            throw new HttpException('Invalid token', 401);
        };
        return true;
    };
}