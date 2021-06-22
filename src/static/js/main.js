// Process the data from the form on the main page

document.getElementById('postForm').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const author = document.querySelector('#author').value;
    createPOST(title, content, author);
})

function createPOST(title, content, author) {
    const data = {
        method: "POST",
        body: {
        title, content, author
        }
    }
    fetch('/api/posts/create/', data)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        })
}

// Render posts on the main page

function getPostList() {
    fetch('/api/posts/')
        .then(res => res.json())
        .then(data => {
            renderPosts(data);
        })
        .catch(err => {
            console.error(err);
        })
}



function renderPosts(data) {
    return data.map(post => {
        renderPost(post);
    })
}

function createNode(element) {
    return document.createElement(element)

}

function append(parent, elem) {
    return parent.appendChild(elem)
}

function renderPost(post) {
    const root = document.getElementById('root');
    const div = createNode('div');
    div.className = 'post-item';
    const title = createNode('h2');
    const content = createNode('p');
    const publishedDate = createNode('span');
    const lastUpdated = createNode('span');
    const author = createNode('small');

    author.innerText = post.author;
    content.innerText = post.content;
    title.innerText = `${post.title} written by ${post.author}`;
    publishedDate.innerText = `Published: ${new Date(post.published_date).toUTCString()}`;
    lastUpdated.innerText = `Last updated: ${new Date(post.updated).toUTCString()}`;


    append(div, title);
    append(div, content);
    append(div, publishedDate);
    append(div, lastUpdated);
    append(root, div);

}

getPostList()