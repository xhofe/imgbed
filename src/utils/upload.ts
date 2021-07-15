import ImgApi from "../img_api";
import NProgress from 'nprogress'

const transit_api = 'https://api-img.xhofe.workers.dev/'

interface Resp {
    img_url: string;
    err_msg: string;
}

const http2https = (text:string):string=>{
    return text.replace('http://','https://')
}

const getField = (obj: any, field: string[]) => {
    let res = obj;
    for (const key of field) {
        res = res[key]
    }
    return res
}

const upload = async (api: ImgApi, file: File): Promise<Resp> => {
    let data = new FormData()
    data.append(api.field_name, file)
    if(api.additional_data){
        for (const key in api.additional_data) {
            data.append(key, api.additional_data[key])
        }
    }
    let url = api.url
    if(api.transit){
        url = `${transit_api}${url}`
    }
    try{
        NProgress.start()
        const resp = await fetch(url, {
            method: 'POST',
            body: data,
            headers: api.headers?api.headers:{}
        })
        NProgress.done()
        let res_text = ''
        switch (api.resp_type) {
            case 'json': {
                const res = await resp.json()
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
                res_text = await resp.text()
            }
        }
        if(!res_text){
            return { img_url: '', err_msg: '上传失败' }
        }
        if(api.final_handler){
            res_text = api.final_handler(res_text)
        }
        res_text = http2https(res_text)
        return { img_url: res_text, err_msg: res_text?'':'上传失败' }
    }catch(e) {
        NProgress.done()
        console.log('err',e)
        return {img_url: "", err_msg: e.message || '上传失败'}
    }
}

export default upload