interface AdditionalData {
    [key: string]: any
}

interface ImgApi {
    name: string;
    transit: boolean;
    url: string;
    field_name: string;
    additional_data: AdditionalData;
    resp_type: 'text' | 'json';
    url_field: string[];
    code_field: string[];
    success_code: string | number;
    max_size: number;
    extensions: string[];
}

export default ImgApi