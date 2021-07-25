import { useReducer } from "react";
import { createMessage, MessageType } from "../components/message/message";
import ImgApi from "../img_api";

export enum API_ACTION_TYPE {
  INIT = "init",
  ADD = "add",
  DEL = "del",
  CHOOSE = "choose",
}

export interface APIState {
  apis: Array<ImgApi>;
  cur?: ImgApi;
}

export interface APIAction {
  type: API_ACTION_TYPE;
  payload?: any;
}

// export const EmptyApi: ImgApi = {
//   name: "",
//   url: "",
//   transit: false,
//   field_name: "",
//   resp_type: "text",
//   url_field: [],
//   code_field: [],
//   success_code: 0,
//   max_size: 0,
//   extensions: [],
// };

export default function reducer(state: APIState, action: APIAction): APIState {
  const { type, payload } = action;
  switch (type) {
    case API_ACTION_TYPE.INIT:
      return {
        ...state,
        apis: payload,
      };
    case API_ACTION_TYPE.ADD:
      const { api, apiContent } = payload;
      if (state.apis.find((item) => item.name === api.name)) {
        createMessage()("API name 已存在", MessageType.Error);
        return state;
      }
      createMessage()("API添加成功", MessageType.Success);
      localStorage.setItem(`--${api.name}`, apiContent);
      return {
        ...state,
        apis: [...state.apis, { ...api, local: true }],
      };
    case API_ACTION_TYPE.DEL:
      localStorage.removeItem(`--${payload.name}`);
      if (state.cur && state.cur.name === payload.name) {
        localStorage.removeItem('cur');
      }
      return {
        ...state,
        cur:
          state.cur && state.cur.name === payload.name ? undefined : state.cur,
        apis: state.apis.filter((api) => api !== payload),
      };
    case API_ACTION_TYPE.CHOOSE:
      localStorage.setItem("cur", payload.name);
      return {
        ...state,
        cur: payload,
      };
    default:
      return state;
  }
}

export function apiInit(): APIState {
  const apis: Array<ImgApi> = [];
  const apiModules = import.meta.globEager("../apis/*.ts");
  const curName = localStorage.getItem("cur");
  let cur = undefined;
  for (const path in apiModules) {
    const api = apiModules[path].default as ImgApi;
    if (api.name) {
      apis.push(api);
      if (curName && curName === api.name) {
        cur = api;
      }
    } else {
      const spai = apiModules[path].default as Array<ImgApi>;
      for (const item of spai) {
        apis.push(item);
        if (curName && curName === item.name) {
          cur = item;
        }
      }
    }
  }
  var api: any;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key!.startsWith("--")) {
      try {
        eval(`api = ${localStorage.getItem(key!)}`);
        // if (api && api.name) {
          api.local = true;
          if (curName && curName === api.name) {
            cur = api;
          }
          apis.push(api);
        // }
      } catch (e) {
        console.log(e);
      }
    }
  }
  return {
    apis,
    cur,
  };
}
