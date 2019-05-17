const placeholder = (size, color) =>
  `https://via.placeholder.com/${size}/${color}`;

const unsplashPlaceholder = (size = '1024x300', type) =>
  `https://source.unsplash.com/random/${size}?${type}`;

export { placeholder, unsplashPlaceholder };
