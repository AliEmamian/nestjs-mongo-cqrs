import { UserRolesEnum } from '@shared/models/enums/user.enum';

export type JwtPayload = {
  username: string;
  uid: string;
  upr: UserRolesEnum;
};
