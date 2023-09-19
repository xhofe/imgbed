import { Api } from '@/types'

const api: Api = {
  name: 'FreeBuf',
  transit: true,
  url: 'https://www.freebuf.com/fapi/frontend/upload/image',
  field_name: 'file',
  resp_type: 'json',
  url_field: ['data', 'url'],
  code_field: ['code'],
  success_code: 200,
  max_size: 0,
  extensions: [],
  final_handler: (text: string): string => {
    let i = text.lastIndexOf('!')
    return text.substring(0, i)
  },
}

export default api
