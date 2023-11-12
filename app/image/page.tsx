/* eslint-disable @next/next/no-img-element */
'use client';

import { Box } from '../components/components';
import { css } from '@/styled-system/css';
import { ChatInput } from '../components/ChatInput';
import { Header } from '../components/Header';
import { SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import OpenAI from 'openai';
import { getImages, saveImage } from '../database/idbHelper';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

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

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/image/api', {
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
    async function loadImages() {
      const savedImages = await getImages();
      setImages(savedImages);
    }
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
              <div key={image.id} className={css({ sm: { width: '300px' } })}>
                <img
                  src={`data:image/png;base64, ${image.b64_json}`}
                  alt={image.prompt}
                  title={image.prompt}
                />
                <p className={css({ textAlign: 'center', color: 'white' })}>{image.prompt}</p>
              </div>
            ))}
          </Box>
          {isLoading && (
            <div
              className={css({
                width: 300,
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgb(80, 80, 80)',
                color: 'white',
                fontSize: '24px',
              })}
            >
              <p>Loading...</p>
            </div>
          )}
        </div>

        <Footer>
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </Footer>
      </Box>
    </main>
  );
}
