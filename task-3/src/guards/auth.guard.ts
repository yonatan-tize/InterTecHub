import { CanActivate, ExecutionContext, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate{
    constructor(
        private readonly jwtService: JwtService,
    ) {}    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token){
            throw new HttpException('Invalid token', 401);
        }

        try{
            const payLoad = this.jwtService.verify(token)
            request.userId = payLoad.email
        }catch(err){
            
        }

        return true
    }
}