import ImgApi from "../img_api";
import { transit_api, Resp, generateFormData, handleRes } from './upload_util'

const upload = async (api: ImgApi, file: File, progress:(text: number) => void): Promise<Resp> => {
  const data = generateFormData(api, file)
  let url = api.url
  if (api.transit) {
    url = `${transit_api}${url}`
  }
  try {
    return new Promise<Resp>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.upload.addEventListener('progress', evt => {
        const complete = evt.loaded / evt.total * 100
        console.log(complete)
        if (complete == 100) {
          console.log('upload complete')
        } else {
          progress(complete)
        }
      })
      xhr.addEventListener('load', () => {
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
        progress(100)
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
  } catch (e) {
    console.log('err', e)
    return { img_url: "", err_msg: e.message || '上传失败' }
  }
}

export default upload