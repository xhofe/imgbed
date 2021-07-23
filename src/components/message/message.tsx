import React from "react";
import { ReactNode, useEffect, useMemo } from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import "./message.css";

export enum MessageType {
  Info = "info",
  Warning = "warning",
  Error = "error",
  Success = "success",
}

let wrap: HTMLElement;
export const createMessage = () => {
  return (content: ReactNode, type: MessageType, duration: number = 2000) => {
    if (typeof document === "undefined") {
      return;
    }
    if (!wrap) {
      //如果有的话，说明已经调用过这个函数了，这个空div就可以一直复用
      wrap = document.createElement("div");
      wrap.style.cssText = `line-height:
		1.5;text-align:
		center;color: #333;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		list-style: none;
		position: fixed;
		z-index: 100000;
		width: 100%;
		top: 16px;
		left: 0;
		pointer-events: none;`;
      if (wrap) {
        document.body && document.body.appendChild(wrap); //挂body上
      }
    }
    const divs = document.createElement("div");
    wrap.appendChild(divs);
    ReactDOM.render(
      <Message
        rootDom={wrap}
        parentDom={divs}
        content={content}
        type={type}
        duration={duration}
      />,
      divs
    );
  };
};

export type MessageProps = {
  rootDom: HTMLElement; //这个用来干掉parentDom 这个可以常驻
  parentDom: Element | DocumentFragment; //这个是挂载点 要unmount卸载 完毕后卸载挂载点 注意！一共2步卸载，别漏了
  content: ReactNode;
  type: MessageType;
  duration: number;
};

export function Message(props: MessageProps) {
  const { rootDom, parentDom, content } = props;

  const unmount = useMemo(() => {
    return () => {
      if (parentDom && rootDom) {
        unmountComponentAtNode(parentDom);
        rootDom.removeChild(parentDom);
      }
    };
  }, [parentDom, rootDom]);

  useEffect(() => {
    setTimeout(() => {
      unmount();
    }, props.duration);
  }, [unmount]);
  return (
    <div className="message-box">
      <div className={`message message-${props.type}`}>
        <span className="message-content">{content}</span>
      </div>
    </div>
  );
}
