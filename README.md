# React Images Extended

<div align="center">

![NPM Package](https://img.shields.io/npm/v/react-images-extended-2?style=for-the-badge&logo=npm&color=cb3837)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

</div>

Compared to the legacy package, this fork is powered by:

- ✨ The latest version of React
- 📝 No JavaScript, all TypeScript  
- 🎨 Easy styling with Tailwind CSS
- 📦 Better package management with PNPM
- 🖼️ Modern Display-PiP compatibility

## 📸 Demo

<div align="center">

### Core Functionality
<img width="500" alt="Demonstration of core functionality" src="https://github.com/user-attachments/assets/3f34fcee-5fb3-4a72-bfb7-97d7abcf463f" />

### Picture-in-Picture Behavior  
<img width="1000" alt="Demonstration of PiP behaviour" src="https://github.com/user-attachments/assets/e5ce5b06-7418-4a50-80e9-8e2aae227721" />

</div>

## 🔗 Useful Links (Work in progress)

| Resource | Description |
|----------|-------------|
| 📦 [NPM Package](https://www.npmjs.com/package/react-images-extended-2) | Install and view package details |
| 🧪 [Test Locally](#) | How to test and run locally |
| 🤝 [Contributing](#) | How to contribute |
| 📚 [Basic Usage](#) | Understanding the demo and basic usage |

## 🚀 Quick Start

```bash
npm install react-images-extended-2
```

```tsx
import { Lightbox, IImage } from 'react-images-extended-2';
import 'react-images-extended-2/dist/styles.css';

const images: IImage[] = [
  { src: 'image1.jpg', caption: 'Image 1' },
  { src: 'image2.jpg', caption: 'Image 2' },
];

function App() {
  return (
    <Lightbox
      images={images}
      onClose={() => setIsOpen(false)}
      showThumbnails={true}
    />
  );
}
```

## ✨ Features

<details>
<summary><b>🖼️ Image Management</b></summary>

- Zoom, rotate, and drag functionality
- Thumbnail navigation
- Keyboard shortcuts
- Touch/gesture support

</details>

<details>
<summary><b>🎯 Modern Features</b></summary>

- Picture-in-Picture mode
- Full TypeScript support
- Tailwind CSS styling
- Responsive design

</details>

---

<div align="center">

**Made with ❤️ by [Isla](https://github.com/ryan-n-may)**

</div>
