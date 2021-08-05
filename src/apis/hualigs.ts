import ImgApi from "../img_api";

// 建议注册 https://www.hualigs.cn/ 获取自己的token
const token = '8ff730a4dc52360c26854111c794742b'

const kieng = [
  ["嘀哩", "bilibili"],
  // ["头条", "toutiao"],
  ["搜狗", "sougou"],
  ["葫芦", "huluxia"],
  // ["新浪", "sina"],
  ["猫盒", "catbox"],
  ["奇虎", "qihoo"],
  // ["苏柠", "suning"],
  // ["往亿", "netease"],
  ["牛图", "niupic"],
  ["百度", "baidu"],
  ["贴图", "postimages"],
  // ["超星", "chaoxing"],
  ["五八", "ai58"],
  ["图盒", "imgbox"],
  ["图绘", "imgur"],
  ["极图", "gtimg"],
  // ["微聊", "vxichina"],
  ["佰书", "bkimg"],
  ["慕课", "muke"],
  // ["微梦", "vimcn"],
  // ["艾力", "ali"],
  ["末世", "smms"],
];

const apis: Array<ImgApi> = kieng.map((item) => {
  return {
    name: `h-${item[0]}`,
    transit: false,
    url: `https://www.hualigs.cn/api/upload?token=${token}&apiType=${item[1]}`,
    field_name: "image",
    resp_type: "json",
    url_field: ["data", "url", item[1]],
    code_field: ["code"],
    success_code: 200,
    max_size: 0,
    extensions: [],
  };
});

export default apis;
