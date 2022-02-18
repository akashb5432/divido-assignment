export interface LenderGetResponse {
  name: string;
  fields: Array<LenderFields>;
}

export interface LenderGetResponseExtended {
  name: string;
  fields: Array<LenderFields>;
}

export interface LenderFields {
  name: string;
  type: string;
  required: boolean;
  options?: Array<string>;
}

export interface LenderPostResponse {
  decision: 'accepted' | 'declined';
}

export interface FormInputStateInterface {
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth?: string
  monthly_income?: string;
  gender?: string;
  address?: string;
}

export interface FormInputInterface {
  name: string;
  fields: LenderFields;
}
