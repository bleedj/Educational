(()=> {
  const articleId = window.location.href.split('=').pop();
  async function catchPage() {
    const response = await fetch(`https://gorest.co.in/public-api/posts/${articleId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data
    });
    window.article = response;
    const comments_response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${articleId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data
    });
    window.comm = comments_response;
    function createArticle() {
      const divArticle = document.createElement('div')
      divArticle.classList.add('article')
      const titleArticle = document.createElement('h1')
      titleArticle.textContent = `${window.article.data.title}`
      titleArticle.classList.add('article__title')
      const bodyArticle = document.createElement('p')
      bodyArticle.textContent = `${window.article.data.body}`
      bodyArticle.classList.add('article__body')
      const divComment = document.createElement('div')
      divComment.classList.add('comment')
      const titleComment = document.createElement('h3')
      titleComment.textContent = 'Сomments: '
      titleComment.classList.add('comment__title')
      divComment.append(titleComment)
      const oops = document.createElement('p')
      oops.classList.add('comment__title_oops')
      oops.textContent ='It seems that no one has left comments yet.. You can be the first, but, not now ;) '
      if (window.comm.data.length) {
        for (comment of window.comm.data) {

          const nameComment = document.createElement('p')
          nameComment.textContent = comment.name + ':'
          nameComment.classList.add('comment__name')
          const descrComment = document.createElement('p')
          descrComment.textContent = comment.body
          descrComment.classList.add('comment__descr')
          divComment.append(nameComment, descrComment)
        };
      } else {divComment.append(oops)};

      divArticle.append(titleArticle, bodyArticle, divComment)
      document.body.append(divArticle)
    };
    createArticle()
  };
  catchPage()



})()
