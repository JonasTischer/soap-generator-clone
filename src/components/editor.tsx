'use client';

import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import {
  BlockNoteEditor,
  filterSuggestionItems,
  PartialBlock,
} from '@blocknote/core';
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from '@blocknote/react';
import { MdAutoFixHigh } from 'react-icons/md'; // Import magic wand icon
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
} from '@blocknote/react';
import { Button } from './ui/button';
interface EditorProps {
  value: Array<PartialBlock>;
}

// Custom Magic Edit slash menu item
const magicEditItem = (editor: BlockNoteEditor) => ({
  title: 'Magic Edit',
  onItemClick: () => {
    const textCursorPosition = editor.getTextCursorPosition();
    editor.updateBlock(textCursorPosition.block.id, {
      content: `✨ This was magically enhanced ✨`,
    });
  },
  aliases: ['magic', 'edit'],
  group: 'Other',
  icon: <MdAutoFixHigh size={18} />,
  subtext: 'Magically enhance document',
});

// Combine default items with our custom magic edit
const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  magicEditItem(editor),
  ...getDefaultReactSlashMenuItems(editor),
];

export default function Editor({
  value = [
    {
      type: 'paragraph',
      content: 'asd',
    },
  ],
}: EditorProps) {
  const editor = useCreateBlockNote({
    initialContent: value,
  });

  const handleMagicEdit = () => {
    const selection = editor.getSelection();
    if (selection) {
      const selectedText = editor.getSelectedText();
      if (selectedText) {
        // Replace the selected text with "magic" text
        // You can replace this with your actual magic edit logic
        editor.replaceBlocks(selection.blocks, [
          {
            type: 'paragraph',
            content: `✨ This was magic edited ✨`,
          },
        ]);
      }
    }
  };

  return (
    <BlockNoteView
      editor={editor}
      className="w-full h-[400px] resize-none"
      slashMenu={false}
      formattingToolbar={false}
    >
      <SuggestionMenuController
        triggerCharacter="/"
        getItems={async (query) =>
          filterSuggestionItems(
            getCustomSlashMenuItems(editor),
            query
          )
        }
      />
      <FormattingToolbarController
        formattingToolbar={() => (
          <FormattingToolbar>
            <Button key={'magicEdit'} onClick={handleMagicEdit}>
              <MdAutoFixHigh size={16} /> Magic Edit
            </Button>
            <BlockTypeSelect key={'blockTypeSelect'} />

            <FileCaptionButton key={'fileCaptionButton'} />
            <FileReplaceButton key={'replaceFileButton'} />

            <BasicTextStyleButton
              basicTextStyle={'bold'}
              key={'boldStyleButton'}
            />
            <BasicTextStyleButton
              basicTextStyle={'italic'}
              key={'italicStyleButton'}
            />
            <BasicTextStyleButton
              basicTextStyle={'underline'}
              key={'underlineStyleButton'}
            />
            <BasicTextStyleButton
              basicTextStyle={'strike'}
              key={'strikeStyleButton'}
            />
            {/* Extra button to toggle code styles */}
            <BasicTextStyleButton
              key={'codeStyleButton'}
              basicTextStyle={'code'}
            />

            <TextAlignButton
              textAlignment={'left'}
              key={'textAlignLeftButton'}
            />
            <TextAlignButton
              textAlignment={'center'}
              key={'textAlignCenterButton'}
            />
            <TextAlignButton
              textAlignment={'right'}
              key={'textAlignRightButton'}
            />

            <ColorStyleButton key={'colorStyleButton'} />

            <NestBlockButton key={'nestBlockButton'} />
            <UnnestBlockButton key={'unnestBlockButton'} />

            <CreateLinkButton key={'createLinkButton'} />
          </FormattingToolbar>
        )}
      />
    </BlockNoteView>
  );
}
