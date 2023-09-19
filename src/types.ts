interface Data {
  [key: string]: any
}

export interface Api {
  name: string
  transit?: boolean
  url: string
  field_name: string
  headers?: Data
  additional_data?: Data | ((f: File) => Data)
  resp_type: 'text' | 'json'
  url_field: (string | number)[]
  code_field: string[]
  success_code: string | number | boolean
  max_size: number
  extensions: string[]
  final_handler?: (text: string) => string
  local?: boolean
  transit_api?: string
  disabled?: boolean
}
