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

export default function reducer(state: APIState, action: APIAction): APIState {
  const { type, payload } = action;
  switch (type) {
    case API_ACTION_TYPE.INIT:
      return {
        ...state,
        apis: payload,
      };
    case API_ACTION_TYPE.ADD:
      const {api,apiContent} = payload;
      if (state.apis.find((item) => item.name === api.name)) {
        createMessage()("API name already exists", MessageType.Error);
        return state;
      }
      createMessage()("API添加成功", MessageType.Success);
      localStorage.setItem(api.name, apiContent);
      return {
        ...state,
        apis: [...state.apis, { ...api, local: true }],
      };
    case API_ACTION_TYPE.DEL:
      localStorage.removeItem(payload.name);
      return {
        ...state,
        cur: state.cur === payload ? undefined : state.cur,
        apis: state.apis.filter((api) => api !== payload),
      };
    case API_ACTION_TYPE.CHOOSE:
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
  for (const path in apiModules) {
    const api = apiModules[path].default as ImgApi;
    if (api.name) {
      apis.push(api);
    } else {
      apis.push.apply(apis, apiModules[path].default as Array<ImgApi>);
    }
  }
  var api: any;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    try {
      eval(`api = ${localStorage.getItem(key!)}`);
      if (api && api.name) {
        api.local = true;
        apis.push(api);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return {
    apis,
  };
}
