import SunEditor from "suneditor-react";
import plugins from "suneditor/src/plugins";

const Editor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <SunEditor
    setContents={value}
    setOptions={{
      plugins,
      buttonList: [
        ["removeFormat"],
        ["bold", "underline", "italic", "strike", "subscript", "superscript"],
        [
          "fontColor",
          "hiliteColor",
          "blockquote",
          "font",
          "fontSize",
          "formatBlock",
        ],
        [
          "outdent",
          "indent",
          "align",
          "lineHeight",
          "paragraphStyle",
          "horizontalRule",
        ],
        ["table", "link", "image", "video"],
        ["fullScreen", "showBlocks", "preview"],
      ],
      height: "400",
    }}
    onChange={onChange}
  />
);

export default Editor;
