'use client';

import React, { useEffect, useRef } from 'react';
import { Form, TextArea, Button } from './styledHtml';
import { SendIcon } from './SendIcon';
import { css } from '@/styled-system/css';

type Props = {
  input: string;
  isDisabled: boolean;
  handleInputChange: (
    e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const ChatInput: React.FC<Props> = ({
  input,
  isDisabled,
  handleInputChange,
  handleSubmit,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputMaxHeight = 300;

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
      textArea.style.height =
        textArea.scrollHeight < inputMaxHeight
          ? textArea.scrollHeight + 'px'
          : inputMaxHeight + 'px';
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
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
      suppressHydrationWarning
      width="100%"
      position="relative"
    >
      <TextArea
        ref={textAreaRef}
        value={input}
        disabled={isDisabled}
        onChange={handleInputChange}
        onKeyDown={onEnterPress}
        onPaste={handlePaste}
        borderRadius={
          (textAreaRef?.current?.scrollHeight ?? 0) > inputMaxHeight ? '20px 8px 8px 20px' : '20px'
        }
        px="16px"
        py="8px"
        width="100%"
        maxHeight={inputMaxHeight + 'px'}
        backgroundColor={'#FFFFFF'}
        placeholder="Écrivez un message"
        rows={1}
        autoFocus
        overflowY="auto"
        resize="none"
        suppressHydrationWarning
        className={css({
          '&::-webkit-scrollbar': {
            width: '16px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'red.400',
            borderRadius: '8px',
            borderWidth: '1px',
            overflow: 'hidden',
            paddingX: '20px',
          },
        })}
      />
      <Button
        disabled={isDisabled}
        type="submit"
        position="absolute"
        right="20px"
        bottom="calc((50px - 30px)  / 2)"
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
