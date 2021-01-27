window.addEventListener('load', () => {

  const api = 'https://www.googleapis.com/books/v1/volumes?q=';
  const btn = document.querySelector('.input-wrapper button');
  const btnImg = btn.children[0];
  const input = document.querySelector('.input-wrapper input');
  const output = document.querySelector('.output')

  const findBooks = e => {
    e.preventDefault();
    if(input.value){
      btnImg.src = './img/loader.gif';
      btnImg.classList.add('gif');

      let request = [];
      for(let key of input.value.trim()){
        if(key === ' '){
          key = '+'
        }
        request.push(key);
      }
      request = request.join('');
      let url = api + request;
      output.children[1].innerHTML = `
        <img src="./img/loader.gif"/>
      `;

      fetch(url)
        .then(res => res.json())
          .then(data => {
            btnImg.src = './img/search.png';
            btnImg.classList.remove('gif');
            const { items } = data;
            if(!items){
              output.children[0].innerText = ` К сожалению такой книги не найдено `
            } else{
              output.children[0].innerText = ` Результаты поиска: `;
              output.children[1].innerHTML = '';
              console.log(items)
              items.map(item => {
                const {volumeInfo} = item;
                output.children[1].innerHTML += `
                  <a href="${volumeInfo.canonicalVolumeLink}" target="_blank" class="output__item">
                    <img src="${volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : './img/bg.jpg'}" alt="poster"/>
                    <h2>${(volumeInfo.title.length > 60) ? volumeInfo.title.slice(0, 60 - 1) + '…' : volumeInfo.title}</h2>
                  </a>
                `;
              })
            }
          })

    }
  }
  btn.addEventListener('click', findBooks);
})