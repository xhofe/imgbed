import * as React from "react";
import sha1 from "sha1-file-web";
import { FilesContext } from "../../App";
import { ACTION_TYPE } from "../../reducer/files";
import UploadItem from "../upload-item/UploadItem";
import "./Upload.css";

interface IUploadProps {}

const Upload: React.FunctionComponent<IUploadProps> = (props) => {
  const { state, dispatch } = React.useContext(FilesContext);
  const clickUpload = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileInput = document.querySelector(
      "#upload-input-file"
    ) as HTMLInputElement;
    fileInput.click();
  };

  const hanldAddFiles = (files: FileList | File[]) => {
    for (const file of files) {
      if (file.type.indexOf("image") !== -1) {
        // const hash = await sha1(file);
        sha1(file).then((hash: string) => {
          dispatch({
            type: ACTION_TYPE.ADD,
            payload: { file, hash },
          });
        });
        console.log(file);
      }
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
  }, []);

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
        <i className="iconfont icon-shanchu1" onClick={()=>dispatch({type: ACTION_TYPE.CLEAR, payload: null})}></i>
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
            <UploadItem del={del(ifile.hash)} ifile={ifile}></UploadItem>
          </div>
        ))}
        <div className="upload-btn" onClick={clickUpload}>
          <i className="iconfont icon-tianjia"></i>
          <span>粘贴/拖拽或点击上传</span>
        </div>
      </div>
    </div>
  );
};

export default Upload;
