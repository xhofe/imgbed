import * as React from "react";
import "./UrlShow.css";
import copyToClip from "../../utils/copy_clip";
import { FilesContext } from "../../App";
import { ACTION_TYPE, IFile } from "../../reducer/files";

enum UrlShowType {
  URL = "Url",
  HTML = "Html",
  BBCODE = "BBcode",
  MARKDOWN = "Markdown",
  MARKDOWNWITHLINK = "Markdown with link",
}

const getUrlShow = (ifile: IFile, type: UrlShowType) => {
  switch (type) {
    case UrlShowType.URL:
      return ifile.url;
    case UrlShowType.HTML:
      return `<img src="${ifile.url}" alt="${ifile.file.name}" title="${ifile.file.name}" referrerPolicy="no-referrer" />`;
    case UrlShowType.BBCODE:
      return `[img]${ifile.url}[/img]`;
    case UrlShowType.MARKDOWN:
      return `![${ifile.file.name}](${ifile.url})`;
    case UrlShowType.MARKDOWNWITHLINK:
      return `[![${ifile.file.name}](${ifile.url})](${ifile.url})`;
  }
};

interface IUrlShowProps {}

const UrlShow: React.FunctionComponent<IUrlShowProps> = (props) => {
  const { state, dispatch } = React.useContext(FilesContext);
  const [urlShowType, setUrlShowType] = React.useState(UrlShowType.URL);
  return (
    <div className="url-show">
      <div className="url-show-types">
        {Object.values(UrlShowType).map((type, index) => {
          return (
            <span
              className={`url-show-type ${
                urlShowType === type ? "url-show-type-focus" : null
              }`}
              onClick={() => setUrlShowType(type)}
            >
              {type}
            </span>
          );
        })}
      </div>
      <div className="url-show-content">
        {state.map((ifile, index) => {
          return (
            <div
              className={`url-show-input-container ${
                ifile.focus ? "url-show-input-container-focus" : null
              }`}
            >
              <input
                className="url-show-input"
                value={getUrlShow(ifile, urlShowType)}
                readOnly
                onMouseOver={() => {
                  dispatch({
                    type: ACTION_TYPE.FOCUS,
                    payload: { hash: ifile.hash, focus: true },
                  });
                }}
                onMouseOut={() => {
                  dispatch({
                    type: ACTION_TYPE.FOCUS,
                    payload: { hash: ifile.hash, focus: false },
                  });
                }}
                // style={{display: file.uploaded? "block" : "none"}}
              />
              <i
                onClick={() => {
                  copyToClip(getUrlShow(ifile, urlShowType));
                  const cur = document.getElementById(ifile.hash);
                  if (cur) {
                    cur.className = "url-copy iconfont icon-success1";
                    setTimeout(() => {
                      cur.className = "url-copy iconfont icon-copy";
                    }, 2000);
                  }
                }}
                className="url-copy iconfont icon-copy"
                id={ifile.hash}
              ></i>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UrlShow;
