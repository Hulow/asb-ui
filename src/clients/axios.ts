export interface AxiosConfig {
  url: string;
  authorization?: string;
  auth?: {
    username: string;
    password: string;
  };
  params?: {
    public_ids: string;
  };
}
