import { checkbox } from '@keystone-next/fields';

export const permissionFields = {
  canAddItems: checkbox({
    defaultValue: false,
    label: 'User can Add items',
  }),
  canEditItems: checkbox({
    defaultValue: false,
    label: 'User can Edit and Delete items',
  }),
  canSeeUsers: checkbox({
    defaultValue: false,
    label: 'User can see and Follow and Message other Users',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'User can CRUD roles',
  })
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];
