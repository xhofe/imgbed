import { Api } from '@/types'

const api: Api = {
  name: 'IM.GE',
  transit: true,
  url: 'https://im.ge/json',
  field_name: 'source',
  additional_data: () => ({
    type: 'file',
    action: 'upload',
    timestamp: Date.now(),
    auth_token: '130aefb868ca9be7ebb419d3d359454b09454e9e',
    nsfw: 0,
  }),
  resp_type: 'json',
  url_field: ['image', 'url'],
  code_field: ['success', 'code'],
  success_code: 200,
  max_size: 0,
  extensions: [],
  final_handler: (text: string): string => {
    return `https://cf-ipfs.com/ipfs/${text}` //ipfs.decoo.io/ipfs
  },
  disabled: true,
}

export default api
