const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC36xmz34q02JYaZYKrMwXng&part=snippet%2Cid&order=date&maxResults=12';

const content = null || document.getElementById('content');
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '741b15c2a6msh51c506c1dab62b5p195ae4jsn191b59da9bb4',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

async function fetchData(url) {
    const response = await fetch(url, options); // devuelve todo en texto plano
    const data = await response.json(); // lo pasamos a objeto
    return data; // retornamos el objeto
}

// funcion que se autoejecuta
(async () => {
    try {
        const videos = await fetchData(API);
         let view = `
    ${videos.items.map(vid => `
    <a href="https://youtube.com/watch?v=${vid.id.videoId}"target="_blank">
      <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${vid.snippet.thumbnails.high.url}" alt="${vid.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${vid.snippet.title}
          </h3>
        </div>
      </div>
    `).slice(0, 4).join('')}
    `;
    content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();