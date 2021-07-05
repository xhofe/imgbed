import ImgApi from "../img_api";

const transit_api = 'https://api-img.xhofe.workers.dev/'

interface Resp {
    img_url: string;
    err_msg: string;
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
    for (const key in api.additional_data) {
        data.append(key, api.additional_data[key])
    }
    let url = api.url
    if(api.transit){
        url = `${transit_api}${url}`
    }
    try{
        const resp = await fetch(url, {
            method: 'POST',
            body: data
        })
        switch (api.resp_type) {
            case 'json': {
                const res = await resp.json()
                if (api.code_field.length !== 0) {
                    const code = getField(res, api.code_field)
                    if (code != api.success_code) {
                        return { img_url: '', err_msg: '上传失败' }
                    }
                    return { img_url: getField(res, api.url_field), err_msg: '' }
                }
            }
            case 'text': {
                const res = await resp.text()
                return { img_url: res, err_msg: res?'':'上传失败' }
            }
        }
    }catch(e) {
        console.log('err',e)
        return {img_url: "", err_msg: e.message || '上传失败'}
    }
}

export default upload