import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { BASE_URL } from '../../lib/api';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editor = useRef<any | null>(null);

  const config = useMemo(() => {
    return {
      readonly: false,
      placeholder: 'Start typing...',
      height: 500,

      buttons: [
        'bold',
        'italic',
        'underline',
        '|',
        'ul',
        'ol',
        '|',
        'font',
        'fontsize',
        '|',
        'outdent',
        'indent',
        'align',
        '|',
        'hr',
        'link',
        'image',
        '|',
        'undo',
        'redo',
      ],

      uploader: {
        insertImageAsBase64URI: false,
        url: `${BASE_URL}/api/blogs/upload/image`,
        format: 'json',
        method: 'POST',

        filesVariableName: () => 'image',

        isSuccess: (resp: any): boolean => resp.success,

        getMessage: (resp: any): string => resp.error,

        process: (resp: any) => ({
          files: [resp.url],
          path: '',
          baseurl: '',
          error: resp.error ? 1 : 0,
          message: resp.error || '',
        }),

        defaultHandlerSuccess: function (this: any, data: any) {
          const files = data.files || [];
          console.log("file", files)
          if (files.length) {
            this.selection.insertImage(files[0]);
          }
        },

        error: function (this: any, e: Error) {
          this.events.fire('errorMessage', e.message, 'error', 4000);
          console.log("error", e.message);
        },
      },

      events: {
        beforeUpload: function (this: any) {
          this.events.fire('errorMessage', 'Uploading image...', 'info', 0);
          return true;
        },

        afterUpload: function (this: any) {
          this.events.fire('errorMessage', '', 'info', 0);
        },
      },

      image: {
        openOnDblClick: true,
        editSrc: true,
        useImageEditor: true,
        editTitle: true,
        editAlt: true,
        editLink: true,
        editSize: true,
        editMargins: true,
        editClass: true,
        editStyle: true,
        editId: true,
        editAlign: true,
        showPreview: true,
        selectImageAfterClose: true,
      },

      filebrowser: {
        ajax: {
          url: '/api/upload/image',
        },
      },
    };
  }, []);

  return (
    <div className="rich-text-editor">
      <label className="block font-semibold mb-2 hidden">Content</label>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1}
        onBlur={(newContent: string) => onChange(newContent)}
        onChange={() => {}}
      />
    </div>
  );
};

export default RichTextEditor;