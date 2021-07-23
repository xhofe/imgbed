import React, { createContext } from "react";
import "./App.css";
import Upload from "./components/upload/Upload";
import UrlShow from "./components/url-show/UrlShow";
import fileReducer, { IAction, IState } from "./reducer/files";

export interface IFilesContext {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}

export const FilesContext = createContext<IFilesContext>({} as any);

function App() {
  const [state, dispatch] = React.useReducer(fileReducer, []);

  const [folder, setFolder] = React.useState(false);

  return (
    <div className="App">
      <div className="App-header">
        <div className="header-icons header-left-icons">
          <i
            onClick={()=>{setFolder(!folder);}}
            className={`header-icon iconfont ${
              folder ? "icon-daohangshouqi-" : "icon-daohangzhankai-"
            }`}
          ></i>
        </div>
        <h2>图片上传</h2>
        <div className="header-icons header-right-icons">
          <a href="https://github.com/Xhofe" target="_blank" rel="noopener noreferrer">
            <i className="header-icon iconfont icon-GitHub1"></i>
          </a>
        </div>
      </div>
      <div className={`App-aside ${folder?'aside-folder':null}`}></div>
      <div className={`Main-container ${folder?'container-folder':null}`}>
        <div className="Main">
          <FilesContext.Provider value={{ state, dispatch }}>
            <div className="App-uploader">
              <Upload />
            </div>
            <div className="App-url-show">
              <UrlShow />
            </div>
          </FilesContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
