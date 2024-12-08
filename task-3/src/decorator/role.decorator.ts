import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/enums/role.enum";

export const AllowedRoles = (...role: UserRole[]) => SetMetadata('role', role);
