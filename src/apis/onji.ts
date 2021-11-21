import ImgApi from "../img_api";

const kieng = [
  ["腾讯", "tencent"],
  ["京东", "jd"],
  ["QQ", "qq"],
  ["阿里", "ali"],
  ["网易", "wangyi"],
  ["头条", "toutiao"],
  ["抖音", "douyin"],
  ["兔巢", "txc"],
  ["美团", "meituan"],
  ["百度", "baidu"],
  ["携程","xc"],
  ["搜狐","souhu"],
  ["快手","ks"],
  ["360","360"],
  ["联想","lenovo"],
  ["微店","weidian"],
  ["苏宁","suning"],
  ["易车","yiche"],
];

const apis: Array<ImgApi> = kieng.map((item) => {
  return {
    name: `${item[0]}(O)`,
    transit: true,
    url: `https://pic.ihcloud.net/api11/${item[1]}.php`,
    field_name: "image",
    resp_type: "json",
    url_field: ["data", "url"],
    code_field: ["code"],
    success_code: 200,
    max_size: 0,
    extensions: [],
    transit_api: "https://proxy.nn.ci:15237/",
  };
});

export default apis;
