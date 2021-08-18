import ImgApi from "../img_api";

const api: ImgApi = {
  name: 'IPFS',
  transit: false,
  url: 'https://ipfs.infura.io:5001/api/v0/add',
  field_name: 'file',
  resp_type: 'json',
  url_field: ['Hash'],
  code_field: [],
  success_code: 0,
  max_size: 0,
  extensions: [],
  final_handler: (text: string): string => {
    return `https://cf-ipfs.com/ipfs/${text}` //ipfs.decoo.io/ipfs
  }
}

export default api