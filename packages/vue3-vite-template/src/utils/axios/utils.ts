import { h } from "vue";
import { notification } from "ant-design-vue";

const showErrorInfo = (errInfo: any): void => {
  const {
    errMsg,
    config: { url, method },
  } = errInfo;

  notification.error({
    message: h(
      "div",
      {
        style: {
          "max-width": "320px",
          "font-size": "18px",
          "font-weight": 450,
        },
      },
      errMsg
    ),
    description: h(
      "div",
      {
        style: {
          "max-width": "320px",
          "word-break": "break-all",
          cursor: "copy",
        },
      },
      [
        h("div", {}, `method: ${method}`),
        h("div", {}, url ? `url: ${url}` : ""),
      ]
    ),
    style: { width: "410px" },
  });
};

export { showErrorInfo };
