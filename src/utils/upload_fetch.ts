import ImgApi from "../img_api";
import NProgress from 'nprogress'
import { transit_api, Resp, handleRes, generateFormData } from './upload_util'

const upload = async (api: ImgApi, file: File): Promise<Resp> => {
  const data = generateFormData(api, file)
  let url = api.url
  if (api.transit) {
    url = `${transit_api}${url}`
  }
  try {
    NProgress.start()
    const resp = await fetch(url, {
      method: 'POST',
      body: data,
      headers: api.headers ? api.headers : {}
    })
    let res
    switch (api.resp_type) {
      case 'json': {
        res = await resp.json()
        break
      }
      case 'text': {
        res = await resp.text()
        break
      }
    }
    return handleRes(api, res)
  } catch (e) {
    console.log('err', e)
    return { img_url: "", err_msg: e.message || '上传失败' }
  } finally {
    NProgress.done()
  }
}

export default upload