import { Api } from '@/types'

const api: Api = {
  name: 'MJJ.today',
  transit: true,
  url: 'https://mjj.today/json',
  field_name: 'source',
  additional_data: () => ({
    type: 'file',
    action: 'upload',
    timestamp: Date.now(),
    auth_token: 'fa9da83004160633e9e98d6714e5be8581894b31',
    expiration: '',
    nsfw: 0,
  }),
  resp_type: 'json',
  url_field: ['Hash'],
  code_field: [],
  success_code: 0,
  max_size: 0,
  extensions: [],
  final_handler: (text: string): string => {
    return `https://cf-ipfs.com/ipfs/${text}` //ipfs.decoo.io/ipfs
  },
  disabled: true,
}

export default api
