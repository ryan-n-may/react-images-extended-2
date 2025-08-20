import { useState } from 'react';
import { Box, Button, VStack, Text, Card, CardBody, Heading } from '@chakra-ui/react';
import { Lightbox, IImage } from 'react-images-extended-2';
import 'react-images-extended-2/dist/styles.css';

// Demo images from public APIs
const demoImages: IImage[] = [
  {
    src: 'https://i.imgur.com/thRkbyy_d.webp?maxwidth=1520&fidelity=grand',
    caption: 'Beautiful Landscape 1',
  },
  {
    src: 'https://i.imgur.com/5G8m4SS.jpeg',
    caption: 'Beautiful Landscape 2',
  },
  {
    src: 'https://i.imgur.com/hrfmeFw.jpeg',
    caption: 'Beautiful Landscape 3',
  },
  {
    src: 'https://i.imgur.com/thRkbyy_d.webp?maxwidth=1520&fidelity=grand',
    caption: 'Beautiful Landscape 1',
  },
  {
    src: 'https://i.imgur.com/5G8m4SS.jpeg',
    caption: 'Beautiful Landscape 2',
  },
  {
    src: 'https://i.imgur.com/hrfmeFw.jpeg',
    caption: 'Beautiful Landscape 3',
  },
  {
    src: 'https://i.imgur.com/thRkbyy_d.webp?maxwidth=1520&fidelity=grand',
    caption: 'Beautiful Landscape 1',
  },
  {
    src: 'https://i.imgur.com/5G8m4SS.jpeg',
    caption: 'Beautiful Landscape 2',
  },
  {
    src: 'https://i.imgur.com/hrfmeFw.jpeg',
    caption: 'Beautiful Landscape 3',
  },
  {
    src: 'https://i.imgur.com/thRkbyy_d.webp?maxwidth=1520&fidelity=grand',
    caption: 'Beautiful Landscape 1',
  },
  {
    src: 'https://i.imgur.com/5G8m4SS.jpeg',
    caption: 'Beautiful Landscape 2',
  },
  {
    src: 'https://i.imgur.com/hrfmeFw.jpeg',
    caption: 'Beautiful Landscape 3',
  },
  {
    src: 'https://i.imgur.com/thRkbyy_d.webp?maxwidth=1520&fidelity=grand',
    caption: 'Beautiful Landscape 1',
  },
  {
    src: 'https://i.imgur.com/5G8m4SS.jpeg',
    caption: 'Beautiful Landscape 2',
  },
  {
    src: 'https://i.imgur.com/hrfmeFw.jpeg',
    caption: 'Beautiful Landscape 3',
  },
];

const portraitImages: IImage[] = [
  {
    src: 'https://i.imgur.com/thRkbyy_d.webp?maxwidth=1520&fidelity=grand',
    caption: 'Beautiful Landscape 1',
  },
  {
    src: 'https://i.imgur.com/5G8m4SS.jpeg',
    caption: 'Beautiful Landscape 2',
  },
  {
    src: 'https://i.imgur.com/hrfmeFw.jpeg',
    caption: 'Beautiful Landscape 3',
  },
];

const singleImage: IImage[] = [
  {
    src: 'https://i.imgur.com/thRkbyy_d.webp?maxwidth=1520&fidelity=grand',
    caption: 'Single Square Image',
  },
];

export function BasicDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<IImage[]>([]);

  const openLightbox = (images: IImage[]) => {
    setCurrentImages(images);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <Box p={8} maxWidth="1200px" margin="0 auto">
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={4}>
            React Images Extended Demo
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Click the buttons below to open the lightbox with different image sets
          </Text>
        </Box>

        <VStack spacing={6}>
          <Card width="100%">
            <CardBody>
              <VStack spacing={4}>
                <Heading as="h3" size="md">
                  Landscape Gallery (5 images)
                </Heading>
                <Text color="gray.600" textAlign="center">
                  A collection of beautiful landscape images with zoom, rotate, and navigation features
                </Text>
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={() => openLightbox(demoImages)}
                >
                  Open Landscape Gallery
                </Button>
              </VStack>
            </CardBody>
          </Card>

          <Card width="100%">
            <CardBody>
              <VStack spacing={4}>
                <Heading as="h3" size="md">
                  Portrait Gallery (3 images)
                </Heading>
                <Text color="gray.600" textAlign="center">
                  Portrait oriented images to test different aspect ratios
                </Text>
                <Button
                  colorScheme="green"
                  size="lg"
                  onClick={() => openLightbox(portraitImages)}
                >
                  Open Portrait Gallery
                </Button>
              </VStack>
            </CardBody>
          </Card>

          <Card width="100%">
            <CardBody>
              <VStack spacing={4}>
                <Heading as="h3" size="md">
                  Single Image
                </Heading>
                <Text color="gray.600" textAlign="center">
                  Test with just one image (square format)
                </Text>
                <Button
                  colorScheme="purple"
                  size="lg"
                  onClick={() => openLightbox(singleImage)}
                >
                  Open Single Image
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>

        <Box>
          <Heading as="h3" size="md" mb={4}>
            Features to Test:
          </Heading>
          <VStack align="start" spacing={2}>
            <Text>• ⚡ <strong>Zoom in/out</strong> - Use the zoom buttons or mouse wheel</Text>
            <Text>• 🔄 <strong>Rotate</strong> - Rotate images left or right</Text>
            <Text>• ↔️ <strong>Flip</strong> - Flip images horizontally or vertically</Text>
            <Text>• 📱 <strong>Picture-in-Picture</strong> - Open in a resizable floating window</Text>
            <Text>• 🖱️ <strong>Drag to pan</strong> - Drag zoomed images around</Text>
            <Text>• ⌨️ <strong>Keyboard navigation</strong> - Arrow keys to navigate</Text>
            <Text>• 🖼️ <strong>Thumbnails</strong> - Quick navigation between images</Text>
            <Text>• 🎯 <strong>Reset</strong> - Reset image position and zoom</Text>
          </VStack>
        </Box>
      </VStack>

      {/* Lightbox Component */}
      {isOpen && (
        <Lightbox
          images={currentImages}
          onClose={closeLightbox}
          onClickNext={() => console.log('Next clicked')}
          onClickPrev={() => console.log('Previous clicked')}
          onClickImage={() => console.log('Image clicked')}
          showThumbnails={true}
        />
      )}
    </Box>
  );
}

export default BasicDemo;
