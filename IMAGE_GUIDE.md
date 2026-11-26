# TRASHFORMERS image guide

The six Marketplace listings use locally stored, product-specific SVG illustrations in `public/images/`. They are original illustrations (not photographs of real creator submissions), so they load without an external image service and visually match each sample listing.

The homepage workshop and festival highlight photos continue to use Unsplash CDN images and require an internet connection. Replace those URLs with approved local event photographs before publishing.

To replace a Marketplace illustration, add an image to `public/images/` and update the matching `img` value in `src/App.jsx` (for example, `img: '/images/my-product-photo.jpg'`). Keep the image aligned with the product title, description, and materials.
