interface Data {
  [key: string]: any
}

interface ImgApi {
  name: string;
  transit: boolean;
  url: string;
  field_name: string;
  headers?: Data;
  additional_data?: Data;
  resp_type: 'text' | 'json';
  url_field: (string | number)[];
  code_field: string[];
  success_code: string | number;
  max_size: number;
  extensions: string[];
  final_handler?: (text: string) => string;
}

export default ImgApi