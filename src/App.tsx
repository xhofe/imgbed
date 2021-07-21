import React, { createContext } from 'react'
import './App.css'
import Upload from './components/upload/Upload'
import fileReducer, { IAction, IState } from './reducer/files'

export interface IFilesContext{
  state:IState,
  dispatch:React.Dispatch<IAction>,
}

export const FilesContext = createContext<IFilesContext>({} as any)

function App() {
  
  const [state, dispatch] = React.useReducer(fileReducer, [] as never)

  return (
    <div className="App">
      <div className="Main">
        <FilesContext.Provider value={{state, dispatch}}>
          <div className="App-header">
            <h2>图片上传</h2>
          </div>
          <div className="App-uploader">
            <Upload/>
          </div>
        </FilesContext.Provider>
      </div>
    </div>
  )
}

export default App
