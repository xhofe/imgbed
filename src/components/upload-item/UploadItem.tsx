import * as React from "react";
import "./UploadItem.css";
import { FILE_STATUS, IFile } from "../../reducer/files";

interface IUploadItemProps {
  ifile: IFile;
  del: () => void;
  focus: (focus: boolean) => void;
}

const UploadItem: React.FunctionComponent<IUploadItemProps> = ({
  ifile,
  del,
  focus,
}) => {
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  React.useEffect(() => {
    imgRef.current!.src = window.URL.createObjectURL(ifile.file);
    return () => {
      window.URL.revokeObjectURL(imgRef.current!.src);
    };
    // const reader = new FileReader();
    // reader.onload = () => {
    //   imgRef.current!.src = reader.result as string;
    // }
    // reader.readAsDataURL(ifile.file);
  }, []);
  return (
    <div
      onMouseOver={() => {
        focus(true);
      }}
      onMouseOut={() => {
        focus(false);
      }}
      className={`upload-item ${ifile.focus ? "upload-item-focus" : null}`}
    >
      <div className="upload-item-img">
        <img ref={imgRef} src="" alt="" />
      </div>
      <div className="upload-item-info">
        <span>{ifile.file.name}</span>
      </div>
      <div className="upload-item-progress">
        <div style={{ width: `${ifile.progress}%` }}></div>
      </div>
      <div className="upload-item-status">
        <i className={`iconfont ${
          ifile.status === FILE_STATUS.PREPARE ? "icon-tianjia" :
          ifile.status ===FILE_STATUS.UPLOADING? "icon-uploading":
          ifile.status === FILE_STATUS.UPLOADED ? "icon-Success" :"icon-error1"
        }`}></i>
      </div>
      <div className="upload-item-action">
        <span className="del" onClick={del}>
          <i className="iconfont icon-shanchu1"></i>
        </span>
      </div>
    </div>
  );
};

export default UploadItem;
