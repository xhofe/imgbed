import * as React from 'react';
import './UploadItem.css';
import { IFile } from '../../reducer/files'

interface IUploadItemProps {
  ifile: IFile;
  del: ()=>void;
}

const UploadItem: React.FunctionComponent<IUploadItemProps> = ({ifile,del}) => {
  const imgRef = React.useRef<HTMLImageElement|null>(null);
  React.useEffect(() => {
    imgRef.current!.src = window.URL.createObjectURL(ifile.file);
  }, []);
  return (
    <div className="upload-item">
      <div className="upload-item-img">
        <img ref={imgRef} src="" alt="" />
      </div>
      <div className="upload-item-info">
        {ifile.file.name}
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
