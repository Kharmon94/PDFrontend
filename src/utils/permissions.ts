// Permission utilities matching backend CanCanCan abilities

export type UserType = 'user' | 'partner' | 'distribution' | 'admin';

/**
 * Check if user can view admin dashboard
 */
export function canViewAdmin(userType: UserType | undefined | null): boolean {
  return userType === 'admin';
}

/**
 * Check if user can manage businesses (partners can manage their own)
 */
export function canManageBusiness(userType: UserType | undefined | null): boolean {
  return userType === 'partner' || userType === 'admin';
}

/**
 * Check if user can access distribution partner dashboard
 */
export function canAccessDistribution(userType: UserType | undefined | null): boolean {
  return userType === 'distribution' || userType === 'admin';
}

/**
 * Check if user can access partner dashboard
 */
export function canAccessPartner(userType: UserType | undefined | null): boolean {
  return userType === 'partner' || userType === 'admin';
}

/**
 * Check if user can access user dashboard
 */
export function canAccessUserDashboard(userType: UserType | undefined | null): boolean {
  return userType === 'user' || userType === 'partner' || userType === 'distribution' || userType === 'admin';
}

/**
 * Check if user can view and manage all businesses (admin only)
 */
export function canManageAllBusinesses(userType: UserType | undefined | null): boolean {
  return userType === 'admin';
}

/**
 * Check if user can manage white label settings (distribution partners and admins)
 */
export function canManageWhiteLabel(userType: UserType | undefined | null): boolean {
  return userType === 'distribution' || userType === 'admin';
}

/**
 * Check if user can view statistics (distribution partners and admins)
 */
export function canViewStatistics(userType: UserType | undefined | null): boolean {
  return userType === 'distribution' || userType === 'admin';
}

/**
 * Check if user can suspend other users (admin only)
 */
export function canSuspendUsers(userType: UserType | undefined | null): boolean {
  return userType === 'admin';
}

/**
 * Check if user can approve businesses (admin only)
 */
export function canApproveBusinesses(userType: UserType | undefined | null): boolean {
  return userType === 'admin';
}

