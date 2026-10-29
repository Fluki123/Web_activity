
import axios from 'axios';

const button = document.querySelector('#loadCats');
const status = document.querySelector('#status');
const gallery = document.querySelector('#catGallery');

async function loadCats() {
  button.disabled = true;
  status.textContent = 'Loading cat pictures...';
  gallery.replaceChildren();

  try {
    const response = await axios.get(
      'https://api.thecatapi.com/v1/images/search?limit=10'
    );

    const cats = response.data;

    if (!Array.isArray(cats) || cats.length === 0) {
      status.textContent = 'No cat pictures were returned. Try again.';
      return;
    }

    cats.forEach((cat) => {
      if (!cat.url) return;

      const card = document.createElement('article');
      card.className = 'cat-card';

      const image = document.createElement('img');
      image.src = cat.url;
      image.alt = 'Cat picture';
      image.loading = 'lazy';

      const details = document.createElement('p');
      details.textContent =
        `Image ID: ${cat.id} · Dimensions: ${cat.width} × ${cat.height}`;

      card.append(image, details);
      gallery.appendChild(card);
    });

    status.textContent = `Loaded ${gallery.children.length} cat pictures!`;
  } catch (error) {
    console.error('Failed to load cats:', error);
    status.textContent =
      'Unable to load cats. Check your internet connection and try again.';
  } finally {
    button.disabled = false;
  }
}

button.addEventListener('click', loadCats);
