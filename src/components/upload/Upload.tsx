import * as React from "react";
import { useState } from "react";
import sha1 from "sha1-file-web";
import { AppContext } from "../../App";
import { ACTION_TYPE, FILE_STATUS } from "../../reducer/files";
import upload from "../../utils/upload_xhr";
import { createMessage, MessageType } from "../message/message";
import UploadItem from "../upload-item/UploadItem";
import "./Upload.css";

interface IUploadProps {}

const Upload: React.FunctionComponent<IUploadProps> = (props) => {
  const { state, dispatch, apiState } = React.useContext(AppContext);
  const clickUpload = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (target.tagName == "SPAN") {
      return;
    }
    if (!apiState.cur) {
      createMessage()("请先选择一个接口", MessageType.Warning);
      return;
    }
    const fileInput = document.querySelector(
      "#upload-input-file"
    ) as HTMLInputElement;
    fileInput.click();
  };

  const hanldAddFiles = (files: FileList | File[]) => {
    if (!apiState.cur) {
      createMessage()("请先选择一个接口", MessageType.Warning);
      return;
    }
    for (const file of files) {
      if (file.type.indexOf("image") !== -1) {
        // const hash = await sha1(file);
        sha1(file).then((hash: string) => {
          dispatch({
            type: ACTION_TYPE.ADD,
            payload: { file, hash },
          });
          addOneFile(file, hash);
        });
        console.log(file);
      }
    }
  };

  const progress = (hash: string) => {
    return (percentage: number) => {
      // dispatch({
      //   type: ACTION_TYPE.PROGRESS,
      //   payload: { hash, progress:percentage },
      // });
      dispatch({
        type: ACTION_TYPE.EDIT,
        payload: { hash, progress: percentage },
      });
    };
  };

  const addOneFile = (file: File, hash: string) => {
    if (apiState.cur) {
      dispatch({
        type: ACTION_TYPE.EDIT,
        payload: { hash, status: FILE_STATUS.UPLOADING },
      });
      upload(apiState.cur, file, progress(hash)).then((res) => {
        if (!res.img_url || res.err_msg) {
          createMessage()(res.err_msg, MessageType.Error);
          dispatch({
            type: ACTION_TYPE.EDIT,
            payload: { hash, status: FILE_STATUS.FAILED },
          });
          return;
        } else {
          dispatch({
            type: ACTION_TYPE.EDIT,
            payload: { hash, url: res.img_url, status: FILE_STATUS.UPLOADED },
          });
        }
      });
    }
  };

  const pasteListener = (event: ClipboardEvent) => {
    const files = event.clipboardData!.files;
    hanldAddFiles(files);
  };

  React.useEffect(() => {
    document.addEventListener("paste", pasteListener);
    return () => {
      document.removeEventListener("paste", pasteListener);
    };
  }, [apiState.cur]);

  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const files = Array.from(fileList);
      hanldAddFiles(files);
      event.target.value = "";
    }
  };

  const [drag, setDrag] = React.useState(false);

  const del = (hash: string) => {
    return () => {
      dispatch({
        type: ACTION_TYPE.DEL,
        payload: hash,
      });
    };
  };

  const focus = (hash: string) => {
    return (focus: boolean) => {
      dispatch({
        type: ACTION_TYPE.FOCUS,
        payload: { hash: hash, focus: focus },
      });
    };
  };

  const [urlInputShow, setUrlInputShow] = useState(false);
  // const [imgUrl, setImgUrl] = useState("");
  const [imgUrls, setImgUrls] = useState("");
  const [fetching,setFetching] = useState(false)

  return (
    <div className="upload">
      <div className="upload-input">
        <input
          type="file"
          multiple
          className="upload-input-file"
          id="upload-input-file"
          onChange={fileChange}
        ></input>
      </div>
      <div className="upload-actions">
        {state.length > 0 && (
          <i
            className="iconfont icon-shanchu1"
            onClick={() => dispatch({ type: ACTION_TYPE.CLEAR, payload: null })}
          ></i>
        )}
      </div>
      <div
        className={["upload-show", drag ? "upload-show-drag" : ""].join(" ")}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => {
          setDrag(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDrag(false);
          const { files } = e.dataTransfer;
          hanldAddFiles(files);
        }}
      >
        {state.map((ifile, index) => (
          <div key={ifile.hash} className="upload-show-item">
            <UploadItem
              focus={focus(ifile.hash)}
              del={del(ifile.hash)}
              ifile={ifile}
            ></UploadItem>
          </div>
        ))}
        <div className="upload-btn" onClick={clickUpload}>
          <i className="iconfont icon-tianjia"></i>
          <span>
            粘贴/拖拽/点击或
            <span
              style={{ color: "#409EFF" }}
              onClick={() => {
                setUrlInputShow(true);
              }}
            >
              通过URL上传
            </span>
          </span>
        </div>
        <div
          className="url-input-container"
          style={{
            visibility: urlInputShow ? "visible" : "hidden",
            opacity: urlInputShow ? 1 : 0,
          }}
        >
          <div className="url-input-box">
            <div className="url-input-box-title">从URL上传(需支持跨域)</div>
            <div className="url-input-box-content">
              <div className="url-input-box-input">
                {/* <input
                  type="text"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  className="url-show-input"
                /> */}
                <textarea
                  value={imgUrls}
                  onChange={(e) => {
                    setImgUrls(e.target.value);
                  }}
                  placeholder="图片URL,每行一个"
                />
              </div>
            </div>
            <div className="url-input-box-footer">
              <button
                className="btn btn-error"
                onClick={() => {
                  setUrlInputShow(false);
                  setFetching(false)
                }}
              >
                关闭
              </button>
              <button 
                className="btn"
                disabled={fetching}
                onClick={async ()=>{
                  if(!imgUrls){
                    createMessage()('输入图片地址',MessageType.Warning)
                    return
                  }
                  setFetching(true)
                  for(const imgUrl of imgUrls.split('\n')){
                    if(!imgUrl)continue
                    fetch(imgUrl).then(resp=>resp.blob().then(res=>{
                      const file = new File([res],'upload.png',{type: res.type})
                      hanldAddFiles([file])
                    })).catch(e=>{
                      createMessage()(`${imgUrl}: ${(e as Error).toString()}`,MessageType.Error)
                    })
                  }
                  // try {
                  //   const resp = await fetch(imgUrl)
                  //   const res = await resp.blob()
                  //   const file = new File([res],'upload.png',{type: res.type})
                  //   hanldAddFiles([file])
                  //   setUrlInputShow(false)
                  //   setImgUrl("")
                  // }catch(e){
                  //   createMessage()((e as Error).toString(),MessageType.Error)
                  // }finally{
                  //   setFetching(false)
                  // }
                }}
              >{fetching?'获取图片中':'确定'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
