import { CanActivate, ExecutionContext, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

export class AuthGuard implements CanActivate{
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
    ) {}    
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token){
            throw new HttpException('Invalid token', 401);
        }

        try{
            const payLoad = this.jwtService.verify(token);
            const user = await this.userService.findOneByEmail(payLoad.email);
            request.currentUserId = user.id;
        } catch(err){
            throw new HttpException('Invalid token', 401);
        };
        return true;
    };
}