export interface UserResponse {
  readonly id: string;
  readonly isCompleted: boolean;
  readonly isVerified: boolean;
  readonly phone: string;
  readonly role: string;
}
