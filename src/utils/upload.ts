import { Api } from '@/types'

export const transit_api = 'https://img.xcool.workers.dev/'

export interface Resp {
  url: string
  err: string
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

export const generateFormData = (api: Api, file: File): FormData => {
  let data = new FormData()
  data.append(api.field_name, file)
  if (api.additional_data) {
    let additional_data = api.additional_data
    if (typeof additional_data === 'function') {
      additional_data = additional_data(file)
    }
    for (const key in additional_data) {
      data.append(key, (additional_data as any)[key])
    }
  }
  return data
}

export const handleRes = (api: Api, res: any): Resp => {
  if (!res) {
    return { url: '', err: '上传失败' }
  }
  let res_text = ''
  switch (api.resp_type) {
    case 'json': {
      if (api.code_field.length !== 0) {
        const code = getField(res, api.code_field)
        if (code != api.success_code) {
          return { url: '', err: '上传失败' }
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
    return { url: '', err: '上传失败' }
  }
  console.log(api.final_handler)
  if (api.final_handler) {
    res_text = api.final_handler(res_text)
  }
  res_text = http2https(res_text)
  return { url: res_text, err: res_text ? '' : '上传失败' }
}

export const upload = async (
  api: Api,
  file: File,
  progress: (text: number) => void,
): Promise<Resp> => {
  const data = generateFormData(api, file)
  let url = api.url
  if (api.transit) {
    if (api.transit_api) {
      url = `${api.transit_api}${url}`
    } else {
      url = `${transit_api}${url}`
    }
  }
  try {
    return new Promise<Resp>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.upload.addEventListener('progress', (evt) => {
        const complete = (evt.loaded / evt.total) * 100
        console.log(complete)
        if (complete == 100) {
          console.log('upload complete')
        } else {
          progress(complete)
        }
      })
      xhr.addEventListener('load', () => {
        progress(100)
        let res = ''
        switch (api.resp_type) {
          case 'json': {
            res = JSON.parse(xhr.responseText)
            break
          }
          case 'text': {
            res = xhr.responseText
          }
        }
        resolve(handleRes(api, res))
      })
      xhr.addEventListener('loadend', (evt) => {
        // progress(100)
        resolve(handleRes(api, ''))
      })
      xhr.open('POST', url)
      if (api.headers) {
        for (const h in api.headers) {
          xhr.setRequestHeader(h, api.headers[h])
        }
      }
      xhr.send(data)
    })
  } catch (e: any) {
    console.log('err', e)
    return { url: '', err: e.message || '上传失败' }
  }
}
