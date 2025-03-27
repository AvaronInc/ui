
import React from 'react';
import Editor from '@monaco-editor/react';

interface ConfigurationEditorProps {
  editorContent: string;
  setEditorContent: (value: string) => void;
}

const ConfigurationEditor: React.FC<ConfigurationEditorProps> = ({ 
  editorContent, 
  setEditorContent 
}) => {
  return (
    <div className="border rounded-md h-[350px] overflow-hidden">
      <Editor
        height="350px"
        defaultLanguage="json"
        value={editorContent}
        onChange={(value) => setEditorContent(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          folding: true,
          lineNumbers: 'on',
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default ConfigurationEditor;
