//response interface
export interface TranslatedResponse {
  status: number;
  text: string;
}

//request data interface
export interface IPostRequestData {
  text: string;
  from: string;
  to: string;
}
