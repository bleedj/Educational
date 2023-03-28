(() => {

  window.thispage = []

  let pagecounter = 0
  const url = `${window.location.href}`
  function createInterface() {
    const container = document.createElement('div');
    container.classList.add('container');
    container.id = '1'
    function createPaginationBar() {
      let pagination_counter = 1;
      const divPagination = document.createElement('div');
      divPagination.classList.add('pag');

      const ulPagination = document.createElement('ul');
      ulPagination.classList.add('pag__ul');
      divPagination.append(ulPagination);

      function createStartButton() {
        const buttonStartPagination = document.createElement('button');
        buttonStartPagination.classList.add('pag__button');
        buttonStartPagination.textContent = '<<'
        buttonStartPagination.addEventListener('click', () => createPaginationLi(pagination_counter - 10))
        ulPagination.append(buttonStartPagination)
        return buttonStartPagination;
      }


      function createPaginationLi(counter){
        if (counter === pagination_counter - 10) {pagination_counter -= 10} else if (counter === pagination_counter + 10) {pagination_counter += 10}
        if (counter <1 ) {
           counter = 1;
           pagination_counter = 1;
        };
        ulPagination.innerHTML = '';

        createStartButton();


        for (let index = 0; index < 10; index++) {
          const buttonPagination = document.createElement('button');
          if (index%2===0) {buttonPagination.classList.add('pag__button_num_2')} else {buttonPagination.classList.add('pag__button_num')};
          buttonPagination.textContent = counter + index;
          buttonPagination.addEventListener('click', function(){ window.history.pushState(null, null, `?page=${index+counter}`)});
          buttonPagination.addEventListener('click', () => getArticles(counter + index));
          buttonPagination.addEventListener('click', function(){ for (elem of document.getElementsByClassName('bc')){elem.remove()}})
          ulPagination.append(buttonPagination);
        };

        createEndButton();
      };


      createPaginationLi(pagination_counter)

      function createEndButton() {
        const buttonEndPagination = document.createElement('button');
        buttonEndPagination.classList.add('pag__button');
        buttonEndPagination.textContent = '>>'
        buttonEndPagination.addEventListener('click', () => createPaginationLi(pagination_counter + 10))
        ulPagination.append(buttonEndPagination)
        return buttonEndPagination;
      }


      return divPagination;
    };
    createPaginationBar();
    container.append(createPaginationBar())





    document.body.append(container)
  };
  createInterface()
  async function getArticles(textContent = 1) {

    if (window.location.href.slice(-3).indexOf('=') == -1) { url_page = window.location.href.slice(-3)} else if (window.location.href.slice(-2).indexOf('=') == -1) { url_page = window.location.href.slice(-2)} else if (window.location.href.slice(-1).indexOf('=') == -1) { url_page = window.location.href.slice(-1)}
    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${url_page}`)
    .then((response) => {
      thispage = response.json
      return response.json();
    })
    .then((data) => {
      thispage=data
      return data
    });
    createBlog()
    async function createBlog() {
      const blogContainer = document.createElement('div')
      blogContainer.classList.add('bc')
      pagecounter = 0

      for (article of thispage.data) {
        const state = document.createElement('div')
        const title = document.createElement('a')
        title.textContent = article.title
        title.href= `\post.html?id=${thispage.data[pagecounter].id}`
        state.append(title)
        blogContainer.append(state)
        pagecounter +=1
      }
      pagecounter = 0
      document.body.append(blogContainer)
    }
  };
  getArticles()
})();
