const root = document.getElementById('root');

// Get ID of the post from url

const pathname = window.location.pathname;
const pathnameParts = pathname.split('/');
const postId = pathnameParts[pathnameParts.length - 2];

// Grab values from the form

const title = document.getElementById('title');
const content = document.getElementById('content');
const author = document.getElementById('author');


document.getElementById('postForm').addEventListener('submit', e => {
    e.preventDefault();

    updatePost(title.value, content.value, author.value);

    title.value = '';
    content.value = '';
    author.value = '';

})

// Get author of the post

function getAuthor(authorId) {
    fetch(`/api/posts/author/${authorId}/`)
        .then(res => res.json())
        .then(data => {
            appendAuthor(data);
        })
        .catch(err => {
            console.error(err);
        })
}

// Render a single post on the main page

function getPost(postId) {
    fetch(`/api/posts/${postId}/`)
        .then(res => res.json())
        .then(data => {
            prepopulateForm(data);
            clearChildren(root);
            renderPost(data);
            getAuthor(data.author);
        })
        .catch(err => {
            console.error(err);
        })
}

function updatePost(title, content, author) {
    const data = {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            title, content, author
        })
    }
    fetch(`/api/posts/${postId}/update/`, data)
        .then(() => {
            getPost(postId);
        })
        .catch(err => {
            console.error(err);
        })
}

function prepopulateForm(data) {
    title.value = data.title;
    content.value = data.content;
    author.value = data.author;
}


function createNode(element) {
    return document.createElement(element)
}


function append(parent, elem) {
    return parent.appendChild(elem)
}

function appendAuthor(data) {
    const title = document.querySelector('.post-title');
    const author = createNode('small');
    author.innerText = ` written by ${data.username}`;
    append(title, author);
}

function renderPost(post) {
    const div = createNode('div');
    div.className = 'post-item';
    const title = createNode('h2');
    title.className = 'post-title';
    const content = createNode('p');
    const publishedDate = createNode('span');
    const lastUpdated = createNode('span');


    title.innerText = post.title;
    content.innerText = post.content;
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

getPost(postId);