import ImgApi from '../img_api'

export const transit_api = 'https://api-img.xhofe.workers.dev/'

export interface Resp {
  img_url: string;
  err_msg: string;
}

export const http2https = (text: string): string => {
  return text.replace('http://', 'https://')
}

export const getField = (obj: any, field: (string | number)[]) => {
  let res = obj
  for (const key of field) {
    res = res[key]
  }
  return res
}

export const generateFormData = (api: ImgApi, file: File): FormData => {
  let data = new FormData()
  data.append(api.field_name, file)
  if (api.additional_data) {
    for (const key in api.additional_data) {
      data.append(key, api.additional_data[key])
    }
  }
  return data
}

export const handleRes = (api: ImgApi, res: any): Resp => {
  if (!res) {
    return { img_url: '', err_msg: '上传失败' }
  }
  let res_text = ''
  switch (api.resp_type) {
    case 'json': {
      if (api.code_field.length !== 0) {
        const code = getField(res, api.code_field)
        if (code != api.success_code) {
          return { img_url: '', err_msg: '上传失败' }
        }
      }
      res_text = getField(res, api.url_field)
      break
    }
    case 'text': {
      res_text = res
    }
  }
  if (!res_text) {
    return { img_url: '', err_msg: '上传失败' }
  }
  if (api.final_handler) {
    res_text = api.final_handler(res_text)
  }
  res_text = http2https(res_text)
  return { img_url: res_text, err_msg: res_text ? '' : '上传失败' }
}