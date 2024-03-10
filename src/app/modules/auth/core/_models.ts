export interface AuthModel {
  data: {
    token: string;
    user: UserModel;
  }
  message: string | null;
  status: string;
}

export interface UserModel {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  public_key: string;
  public_key_path: string | null;
  private_key: string;
  private_key_path: string | null;
  key_name: string;
  key_fingerprint: string | null;
  is_admin: 0 | 1
}
