import { Api } from '@/types'

const api: Api = {
  name: '简约图床',
  transit: true,
  url: 'https://pic.sl.al/upload',
  field_name: 'file',
  additional_data: {
    strategy_id: 1,
  },
  resp_type: 'json',
  url_field: ['data', 'links', 'url'],
  code_field: ['status'],
  success_code: true,
  max_size: 0,
  extensions: [],
  disabled: true,
}

export default api
