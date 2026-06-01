document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('image-gallery');
    const images = [
      { category: 'nature', title: 'Лес', img: 'https://picsum.photos/id/104/300/200', desc: 'Красивый лес' },
      { category: 'nature', title: 'Горы', img: 'https://picsum.photos/id/29/300/200', desc: 'Вершины' },
      { category: 'city', title: 'Ночной город', img: 'https://picsum.photos/id/20/300/200', desc: 'Огни мегаполиса' },
      { category: 'city', title: 'Улица', img: 'https://picsum.photos/id/91/300/200', desc: 'Архитектура' },
      { category: 'people', title: 'Человек', img: 'https://picsum.photos/id/26/300/200', desc: 'Портрет' },
      { category: 'people', title: 'Дружба', img: 'https://picsum.photos/id/155/300/200', desc: 'Люди' }
    ];
  
    let likes = new Array(images.length).fill(0);
    let totalLikes = 0;
  
    function renderGallery(filter = 'all') {
      gallery.innerHTML = '';
      const filtered = filter === 'all' ? images : images.filter(img => img.category === filter);
      filtered.forEach((img, idx) => {
        const card = document.createElement('div');
        card.className = 'image-card';
        card.innerHTML = `
          <div class="card-image">
            <img src="${img.img}" alt="${img.title}">
            <button class="like-btn" data-idx="${idx}">
              ❤️ <span class="like-count">${likes[idx]}</span>
            </button>
          </div>
          <h3>${img.title}</h3>
          <p>${img.desc}</p>
        `;
        gallery.appendChild(card);
      });
      document.getElementById('image-counter').innerText = filtered.length;
      document.getElementById('total-likes').innerText = totalLikes;
      attachLikeEvents();
    }
  
    function attachLikeEvents() {
      document.querySelectorAll('.like-btn').forEach(btn => {
        btn.removeEventListener('click', handleLike);
        btn.addEventListener('click', handleLike);
      });
    }
  
    function handleLike(e) {
      const btn = e.currentTarget;
      const idx = parseInt(btn.dataset.idx);
      if (btn.classList.contains('liked')) {
        likes[idx]--;
        totalLikes--;
        btn.classList.remove('liked');
      } else {
        likes[idx]++;
        totalLikes++;
        btn.classList.add('liked');
      }
      btn.querySelector('.like-count').innerText = likes[idx];
      document.getElementById('total-likes').innerText = totalLikes;
    }
  
    renderGallery();
  
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGallery(btn.dataset.filter);
      });
    });
  });