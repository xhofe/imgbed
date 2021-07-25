import * as React from "react";
import "./Aside.css";
import { AppContext } from "../../App";
import Tag from "../tag/tag";
import { API_ACTION_TYPE } from "../../reducer/apis";
import { createMessage, MessageType } from "../message/message";
import ImgApi from "../../img_api";

interface IAsideProps {}

const Aside: React.FunctionComponent<IAsideProps> = (props) => {
  const { apiState, apiDispatch } = React.useContext(AppContext);
  const [showAdd, setShowAdd] = React.useState(false);
  const [apiContent, setApiContent] = React.useState("");
  const addApi = () => {
    try {
      var api: any;
      eval(`api = ${apiContent}`);
      if (api && api.name) {
        apiDispatch({
          type: API_ACTION_TYPE.ADD,
          payload: { api, apiContent },
        });
        // setApiContent("");
        // setShowAdd(false);
      } else {
        createMessage()("请检查格式", MessageType.Error);
      }
    } catch (e) {
      console.log("error", e);
      createMessage()(e.toString(), MessageType.Error);
    }
  };
  const delApi = (api: ImgApi) => {
    return () => {
      apiDispatch({ type: API_ACTION_TYPE.DEL, payload: api });
    };
  };
  return (
    <div className="aside">
      <div className="apis">
        {apiState.apis.map((api, index) => {
          return (
            // <div className="api">
            <Tag
              key={api.name}
              type={
                api == apiState.cur
                  ? "focus"
                  : api.transit
                  ? "danger"
                  : "success"
              }
              onClick={(e) => {
                if ((e.target as Element).tagName === "SPAN") {
                  apiDispatch({
                    type: API_ACTION_TYPE.CHOOSE,
                    payload: api,
                  });
                }
              }}
              del={api.local ? delApi(api) : undefined}
            >
              {api.name}
            </Tag>
            // </div>
          );
        })}
      </div>
      <div
        onClick={() => {
          setShowAdd(true);
        }}
        className="add"
      >
        <i className="iconfont icon-tianjia"></i>
      </div>
      <div
        className="add-api-box-container"
        style={{
          visibility: showAdd ? "visible" : "hidden",
          opacity: showAdd ? 1 : 0,
        }}
      >
        <div className="add-api-box">
          <div className="add-api-box-title">添加API</div>
          <div className="add-api-box-content">
            <div className="add-api-box-input">
              <textarea
                value={apiContent}
                onChange={(e) => {
                  setApiContent(e.target.value);
                }}
                placeholder="实现该接口:
interface ImgApi {
  name: string; //接口名称需要唯一
  transit: boolean; //是否需要中转(更改referrer,跨域)
  url: string; //接口地址
  field_name: string; //文件字段名称
  headers?: Data; // 请求头
  additional_data?: Data; //附加数据
  resp_type: 'text' | 'json'; //响应类型
  url_field: (string | number)[]; //url字段
  code_field: string[]; //状态码字段
  success_code: string | number; //成功状态码
  max_size: number; //最大文件大小
  extensions: string[]; //文件后缀
  final_handler?: (text: string) => string; //最终处理函数
}"
              ></textarea>
            </div>
          </div>
          <div className="add-api-box-footer">
            <button
              className="btn btn-error"
              onClick={() => {
                setShowAdd(false);
              }}
            >
              关闭
            </button>
            <button className="btn" onClick={addApi}>
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
