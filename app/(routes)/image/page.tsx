/* eslint-disable @next/next/no-img-element */
'use client';

import { Box } from '../../_components/styledHtml';
import { css } from '@/styled-system/css';
import { ChatInput } from '../../_components/ChatInput';
import { Header } from '../../_components/Header';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import OpenAI from 'openai';
import { getImages, saveImage, deleteImage } from '../../_utils/idbHelper';
import { Navigation } from '../../_components/Navigation';
import { Footer } from '../../_components/Footer';
import { DeleteButton } from '@/app/_components/DeleteButton';
import DownloadButton from '@/app/_components/DownloadButton';

export type Image = {
  id: number;
  b64_json: string;
  prompt: string;
  created_at: Date;
};

export default function ImagePage() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  async function loadImages() {
    const savedImages = await getImages();
    setImages(savedImages);
  }

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });
      const data = (await response.json()) as OpenAI.Images.ImagesResponse;
      console.log(data);
      const newImage = {
        id: data.created,
        b64_json: data.data[0].b64_json ?? '',
        prompt: input,
        created_at: new Date(data.created * 1000),
      };

      setImages((imgs) => [...imgs, newImage]);
      await saveImage(newImage);
    } catch (error) {
      console.error(error);
    } finally {
      setInput('');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load images from IndexedDB when the component mounts
    loadImages();
  }, []);

  return (
    <main>
      <Box maxWidth="breakpoint-xl" mx="auto">
        <Header>
          <Navigation />
        </Header>
        <div
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '16px',
          })}
        >
          <dialog
            ref={dialog}
            className={css({
              display: 'block',
              position: 'fixed',
              top: '0px',
              left: '0px',
              right: '0px',
              bottom: '0px',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
              '&::backdrop': {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
              '&[open]': {
                opacity: 1,
              },
            })}
          >
            {selectedImage && (
              <Box
                cursor="zoom-out"
                width="100vmin"
                height="100vmin"
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                onClick={() => {
                  dialog.current?.close();
                  setSelectedImage(null);
                }}
              >
                <img
                  src={`data:image/png;base64, ${selectedImage.b64_json}`}
                  alt={selectedImage.prompt}
                  title={selectedImage.prompt}
                />
              </Box>
            )}
          </dialog>
          <Box
            sm={{ paddingX: '16px' }}
            height={'auto'}
            overflowY={'scroll'}
            _scrollbar={{ display: 'none' }}
            pb="footer"
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="baseline"
            gap={8}
          >
            {images.map((image) => (
              <div key={image.id} className={css({ position: 'relative', sm: { width: '300px' } })}>
                <Box
                  width="100%"
                  height="100%"
                  position="absolute"
                  display="flex"
                  justifyContent="end"
                  gap="8px"
                  padding="8px"
                  opacity="0%"
                  transition="opacity 0.2s ease-in-out"
                  _hover={{ opacity: '100%', cursor: 'zoom-in' }}
                  onClick={() => {
                    dialog.current?.showModal();
                    setSelectedImage(image);
                  }}
                >
                  <DownloadButton
                    filename={`benzou-ai-${image.id}.png`}
                    base64Image={`data:image/png;base64, ${image.b64_json}`}
                  />
                  <DeleteButton
                    onDelete={async () => {
                      deleteImage(image.id);
                      setImages((imgs) => imgs.filter((img) => img.id !== image.id));
                    }}
                  />
                </Box>
                <img
                  src={`data:image/png;base64, ${image.b64_json}`}
                  alt={image.prompt}
                  title={image.prompt}
                />

                <p className={css({ textAlign: 'center', color: 'white' })}>{image.prompt}</p>
              </div>
            ))}
            {isLoading && (
              <div
                className={css({
                  width: 300,
                  height: 300,
                  backgroundColor: 'rgb(80, 80, 80)',
                })}
              >
                <img src="/loading-placeholder.jpg" alt="" />
                <p className={css({ textAlign: 'center', color: 'white' })}>Loading...</p>
              </div>
            )}
          </Box>
        </div>

        <Footer>
          <ChatInput
            isDisabled={isLoading}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </Footer>
      </Box>
    </main>
  );
}
