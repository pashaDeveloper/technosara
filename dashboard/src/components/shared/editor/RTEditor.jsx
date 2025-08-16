import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '../../../ckeditor/ckeditor';
import "./Style.css"
const MyEditor = ({ value, onChange }) => {
  const [data, setData] = React.useState(() => value);

  React.useEffect(() => {
    setData(value);
  }, [value]);

  return (
    <div>
      <CKEditor
        editor={Editor}
        data={data}
        config={{
          simpleUpload: {
            uploadUrl: import.meta.env.VITE_BASE_URL + '/upload/add-upload',
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
            }
          }
        }}
        onChange={(event, editor) => {
          const value = editor.getData();
          setData(value);  
          onChange(value);  
        }}
      />
    </div>
  );
};

export default MyEditor;
