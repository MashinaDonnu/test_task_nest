import { SetMetadata } from '@nestjs/common';
import { ERoles } from '@app/common/enums/roles.enum';

export const ROLES_KEY = 'roles';

export const Permissions = (roles: ERoles[]) => SetMetadata(ROLES_KEY, roles);
