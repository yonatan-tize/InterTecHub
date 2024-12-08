import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/enums/role.enum";

export const Role = (...role: UserRole[]) => SetMetadata('role', role);
