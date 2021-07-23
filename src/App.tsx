import React, { createContext } from "react";
import "./App.css";
import Aside from "./components/aside/Aside";
import Upload from "./components/upload/Upload";
import UrlShow from "./components/url-show/UrlShow";
import apiReducer, { APIAction, apiInit, APIState } from "./reducer/apis";
import fileReducer, { IAction, IState } from "./reducer/files";

export interface IFilesContext {
  state: IState;
  dispatch: React.Dispatch<IAction>;
  apiState: APIState;
  apiDispatch: React.Dispatch<APIAction>;
}

export const AppContext = createContext<IFilesContext>({} as any);

function App() {
  const [state, dispatch] = React.useReducer(fileReducer, []);
  const [apiState, apiDispatch] = React.useReducer(apiReducer, null,apiInit);

  const [folder, setFolder] = React.useState(false);

  return (
    <div className="App">
      <AppContext.Provider value={{ state, dispatch, apiState, apiDispatch }}>
        <div className="App-header">
          <div className="header-icons header-left-icons">
            <i
              onClick={() => {
                setFolder(!folder);
              }}
              className={`header-icon iconfont ${
                folder ? "icon-daohangshouqi-" : "icon-daohangzhankai-"
              }`}
            ></i>
          </div>
          <h2>图片上传</h2>
          <div className="header-icons header-right-icons">
            <a
              href="https://github.com/Xhofe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="header-icon iconfont icon-GitHub1"></i>
            </a>
          </div>
        </div>
        <div className={`App-aside ${folder ? "aside-folder" : null}`}>
          <Aside></Aside>
        </div>
        <div className={`Main-container ${folder ? "container-folder" : null}`}>
          <div className="Main">
            <div className="App-uploader">
              <Upload />
            </div>
            <div className="App-url-show">
              <UrlShow />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
