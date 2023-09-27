'use client';

import React, { useEffect, useRef } from 'react';
import { Form, TextArea, Button } from './components';
import { SendIcon } from './SendIcon';

type Props = {
  input: string;
  handleInputChange: (
    e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const ChatInput: React.FC<Props> = ({ input, handleInputChange, handleSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      formRef.current?.dispatchEvent(new Event('submit', { bubbles: true }));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pasteText = e.clipboardData.getData('text/plain');
    const textArea = textAreaRef.current;
    const start = textArea?.selectionStart;
    const end = textArea?.selectionEnd;

    if (
      textArea &&
      start !== undefined &&
      end !== undefined &&
      input !== undefined &&
      !!pasteText
    ) {
      const before = input.substring(0, start);
      const after = input.substring(end, input.length);
      const newText = before + '\n```\n' + pasteText + '\n```\n' + after;
      textArea.value = newText;
      textArea.selectionStart = start + 4;
      textArea.selectionEnd = start + 4;
      textArea.focus();
      handleTextAreaHeight();
      handleInputChange({
        target: { value: textArea.value },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  };

  const handleTextAreaHeight = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    const textArea = textAreaRef.current;
    textArea?.addEventListener('input', () => {
      handleTextAreaHeight();
    });
    if (input === '') {
      textArea?.removeAttribute('style');
    }
    return () => {
      textArea?.removeEventListener('input', () => {});
    };
  }, [input]);

  return (
    <Form ref={formRef} onSubmit={handleSubmit} suppressHydrationWarning>
      <TextArea
        ref={textAreaRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={onEnterPress}
        onPaste={handlePaste}
        borderRadius="20px"
        px="16px"
        py="8px"
        width="min(755px, calc(100vw * 0.8))"
        placeholder="Écrivez un message"
        rows={1}
        autoFocus
        overflow="hidden"
        resize="none"
        suppressHydrationWarning
      />
      <Button
        type="submit"
        position="relative"
        right="40px"
        bottom="calc((40px - 30px) / 2)"
        cursor={'pointer'}
        suppressHydrationWarning
      >
        <SendIcon
          fill={input === '' ? '#FFFFFF' : '#CC5AB9'}
          width={30}
          height={30}
          shapeRendering={'geometricPrecision'}
        />
      </Button>
    </Form>
  );
};
