import ImgApi from "../img_api";

const kieng = [
  ["头条", "tt"],
  ["QQ", "qq"],
  ["京东", "jd"],
  ["搜狗", "sg"],
  ["58", "c58"],
  ["网易", "wy"],
  ["搜狐", "sh"],
  ["KF", "kefu"],
  ["葫芦侠", "hl"],
];

const apis: Array<ImgApi> = kieng.map((item) => {
  return {
    name: `${item[0]}(K)`,
    transit: false,
    url: `https://image.kieng.cn/upload.html?type=${item[1]}`,
    field_name: "image",
    resp_type: "json",
    url_field: ["data", "url"],
    code_field: ["code"],
    success_code: 200,
    max_size: 0,
    extensions: [],
  };
});

export default apis;
