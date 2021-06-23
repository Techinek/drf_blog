const root = document.getElementById('root');

// Get ID of the post from url

const pathname = window.location.pathname;
const pathnameParts = pathname.split('/');
const postId = pathnameParts[pathnameParts.length - 2];


// Render a single post on the main page

function getPost(postId) {
    fetch(`/api/posts/${postId}/`)
        .then(res => res.json())
        .then(data => {
            clearChildren(root);
            renderPost(data);
        })
        .catch(err => {
            console.error(err);
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

getPost(postId);