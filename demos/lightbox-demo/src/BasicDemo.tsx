import { useState } from 'react';
import { Box, Button, VStack, Text, Card, CardBody, Heading } from '@chakra-ui/react';
import { Lightbox, IImage } from 'react-images-extended-2';
import 'react-images-extended-2/dist/styles.css';

// Demo images from public APIs
const demoImages: IImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1609560140261-4efaa689b6c8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    caption: 'Beautiful Landscape 1',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1661962993826-4aef39f4efcb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    caption: 'Beautiful Landscape 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1609560140261-4efaa689b6c8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    caption: 'Beautiful Landscape 1',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1661962993826-4aef39f4efcb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    caption: 'Beautiful Landscape 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1609560140261-4efaa689b6c8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    caption: 'Beautiful Landscape 1',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1661962993826-4aef39f4efcb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    caption: 'Beautiful Landscape 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1609560140261-4efaa689b6c8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    caption: 'Beautiful Landscape 1',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1661962993826-4aef39f4efcb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    caption: 'Beautiful Landscape 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1609560140261-4efaa689b6c8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    caption: 'Beautiful Landscape 1',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1661962993826-4aef39f4efcb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    caption: 'Beautiful Landscape 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1609560140261-4efaa689b6c8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    caption: 'Beautiful Landscape 1',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1661962993826-4aef39f4efcb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    caption: 'Beautiful Landscape 2',
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
                  Landscape Gallery (15 images)
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
        </VStack>
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
