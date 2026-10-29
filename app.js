import axios from 'axios';

async function loadCats() {
  try {
    const response = await axios.get(
      'https://api.thecatapi.com/v1/images/search?limit=10'
    );

    console.log(response.data);
  } catch (error) {
    console.error('Failed to load cats:', error.message);
  }
}

loadCats();