import {
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  MDXEditor,
  SandpackConfig,
  ShowSandpackInfo,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  toolbarPlugin
} from '@mdxeditor/editor'

import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'

export const MarkdownEditor = () => {
  const { editorRef, selectedNote, handleAutoSaving, handleBlur } = useMarkdownEditor()

  const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: 'react',
    presets: [
      {
        label: 'React',
        name: 'react',
        meta: 'live react',
        sandpackTemplate: 'react',
        sandpackTheme: 'light',
        snippetFileName: '/App.js',
        snippetLanguage: 'jsx',
        initialSnippetContent: '// Your React code here'
      },
      {
        label: 'C++',
        name: 'cpp',
        meta: 'live cpp',
        sandpackTemplate: 'vanilla',
        sandpackTheme: 'light',
        snippetFileName: '/main.cpp',
        snippetLanguage: 'cpp',
        initialSnippetContent: '// Your C++ code here'
      },
      {
        label: 'Java',
        name: 'java',
        meta: 'live java',
        sandpackTemplate: 'vanilla',
        sandpackTheme: 'light',
        snippetFileName: '/Main.java',
        snippetLanguage: 'java',
        initialSnippetContent: '// Your Java code here'
      },
      {
        label: 'Go',
        name: 'go',
        meta: 'live go',
        sandpackTemplate: 'vanilla',
        sandpackTheme: 'light',
        snippetFileName: '/main.go',
        snippetLanguage: 'go',
        initialSnippetContent: '// Your Go code here'
      },
      {
        label: 'Python',
        name: 'python',
        meta: 'live python',
        sandpackTemplate: 'vanilla',
        sandpackTheme: 'light',
        snippetFileName: '/main.py',
        snippetLanguage: 'python',
        initialSnippetContent: '# Your Python code here'
      }
      // {
      //   label: 'Rust',
      //   name: 'rust',
      //   meta: 'live rust',
      //   sandpackTemplate: 'rust',
      //   sandpackTheme: 'light',
      //   snippetFileName: '/main.rs',
      //   snippetLanguage: 'rust',
      //   initialSnippetContent: '// Your Rust code here'
      // }
    ]
  }

  if (!selectedNote) return null

  return (
    <MDXEditor
      ref={editorRef}
      key={selectedNote.title}
      markdown={selectedNote.content}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: 'JavaScript',
            cpp: 'C++',
            java: 'Java',
            go: 'Go',
            python: 'Python',
            rust: 'Rust'
          }
        }),

        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === 'codeblock',
                  contents: () => <ChangeCodeMirrorLanguage />
                },
                {
                  when: (editor) => editor?.editorType === 'sandpack',
                  contents: () => <ShowSandpackInfo />
                },
                {
                  fallback: () => (
                    <>
                      <InsertCodeBlock />
                      <InsertSandpack />
                    </>
                  )
                }
              ]}
            />
          )
        })
      ]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}
