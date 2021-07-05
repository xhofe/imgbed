import ImgApi from "../img_api";

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
    try{
        const resp = await fetch(api.url, {
            method: 'POST',
            body: data
        })
        switch (api.resp_type) {
            case 'json': {
                const res = resp.json()
                if (api.code_field.length !== 0) {
                    if (getField(res, api.code_field) != api.success_code) {
                        return { img_url: '', err_msg: '上传失败' }
                    }
                    return { img_url: getField(res, api.url_field), err_msg: '' }
                }
            }
            case 'text': {
                const res = await resp.text()
                return { img_url: res, err_msg: '' }
            }
        }
    }catch(e) {
        return {img_url: "", err_msg: e.message}
    }
}

export default upload