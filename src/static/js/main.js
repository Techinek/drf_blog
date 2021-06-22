const root = document.getElementById('root');

// Process the data from the form on the main page

document.getElementById('postForm').addEventListener('submit', e => {
    e.preventDefault();

    const title = document.querySelector('#title');
    const content = document.querySelector('#content');
    const author = document.querySelector('#author');

    createPOST(title.value, content.value, author.value);

    title.value='';
    content.value='';
    author.value='';

})

function createPOST(title, content, author) {
    const data = {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            title, content, author
        })
    }
    fetch('/api/posts/create/', data)
        .then(() => {
            getPostList();
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
            clearChildren(root);
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

function clearChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}


getPostList()