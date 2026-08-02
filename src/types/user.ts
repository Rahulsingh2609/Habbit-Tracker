export interface UserProfile {
  name: string;
  phone: string;
  age: string;
  college: string;
  isProfileComplete: boolean;
}

export const emptyUserProfile: UserProfile = {
  name: '',
  phone: '',
  age: '',
  college: '',
  isProfileComplete: false,
};