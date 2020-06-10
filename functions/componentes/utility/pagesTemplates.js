exports.postTemplate = (data) => {

  return `<!doctype html>
        <head>
          <title>Post</title>
        </head>
        <body>
            <article>
              <div>
                  <h2>${data.title}</h2>
              </div>
              <div>
                  <iframe type="text/html" width="500" height="385" src='${
                      data.videoLink}'
                      frameborder="0"></iframe>
              </div>
              <div>
                  Video
              </div>
              <div>
                  <p>${data.description}</p>
              </div>
            </article>
        </body>
      </html>`
}