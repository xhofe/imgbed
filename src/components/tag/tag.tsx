import * as React from "react";
import "./tag.css";

interface ITagProps {
  type: string;
  onClick: (e: React.MouseEvent<any>) => void;
  del?:()=>void;
}

const Tag: React.FunctionComponent<ITagProps> = (props) => {
  return (
    <span onClick={props.onClick} className={`tag tag-${props.type}`}>
      {props.children}
      {props.del? <i className="iconfont icon-shanchu1" onClick={props.del}/> : null}
    </span>
  );
};

export default Tag;
