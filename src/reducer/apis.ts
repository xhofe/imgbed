import ImgApi from "../img_api";

export enum API_ACTION_TYPE {
  INIT = "init",
  ADD = "add",
  DEL = "del",
  CHOOSE = "choose",
}

export interface APIState {
  apis: Array<ImgApi>;
  cur: string;
}

export interface APIAction {
  type: API_ACTION_TYPE;
  payload?: any;
}

export default function reducer(state: APIState, action: APIAction): APIState {
  const {type, payload} = action;
  switch (type) {
    case API_ACTION_TYPE.INIT:
      return {
        ...state,
        apis: payload,
      };
    case API_ACTION_TYPE.ADD:
      return {
        ...state,
        apis: [...state.apis, payload],
      };
    case API_ACTION_TYPE.DEL:
      return {
        ...state,
        apis: state.apis.filter((api) => api.name !== payload),
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
