
export enum ACTION_TYPE {
  INIT = "init",
  ADD = "add",
  DEL = "delete",
  EDIT = "edit",
  FOCUS = "focus",
  // URL = "url",
  // PROGRESS = "progress",
  CLEAR = "clear",
}

export enum FILE_STATUS {
  PREPARE = "prepare",
  UPLOADING = "uploading",
  UPLOADED = "uploaded",
  FAILED = "failed",
}

export interface IFile {
  file: File;
  focus: boolean;
  url: string;
  status: FILE_STATUS;
  progress: number;
  hash: string;
}

export interface IAction {
  type: ACTION_TYPE;
  payload?: any;
}

export type IState = IFile[];

export default function reducer(
  state: IState,
  action: IAction
): IState {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPE.INIT:
      return payload;
    case ACTION_TYPE.ADD: {
      const { file,hash } = payload;
      if (state.find(f => f.hash === hash)) {
        return state;
      }
      const ifile: IFile = {
        file,
        focus: false,
        url: "",
        status: FILE_STATUS.PREPARE,
        progress: 0,
        hash,
      };
      return [...state, ifile];
    }
    case ACTION_TYPE.DEL:
      return state.filter((file) => file.hash !== payload);
    case ACTION_TYPE.CLEAR:
      return [];
    case ACTION_TYPE.EDIT:{
      const file = payload as any;
      return state.map((f) => {
        if (f.hash === file.hash) {
          return {...f, ...file};
        }
        return f;
      });
    }
    case ACTION_TYPE.FOCUS: {
      const { hash, focus } = payload;
      return state.map((file) => {
        if (file.hash === hash) {
          return {
            ...file,
            focus,
          };
        }
        return file;
      });
    }
    // case ACTION_TYPE.URL: {
    //   const { hash, url } = payload;
    //   return state.map((file) => {
    //     if (file.hash === hash) {
    //       return {
    //         ...file,
    //         url,
    //       };
    //     }
    //     return file;
    //   });
    // }
    // case ACTION_TYPE.PROGRESS: {
    //   const { hash, progress } = payload;
    //   return state.map((file) => {
    //     if (file.hash === hash) {
    //       return {
    //         ...file,
    //         progress,
    //       };
    //     }
    //     return file;
    //   });
    // }
    default:
      return state;
  }
}
