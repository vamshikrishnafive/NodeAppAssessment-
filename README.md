# Ghost Blog Engine

Ghost Blog Engine is a simple blog engine built with Node.js and Express.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js (version 20.9.0)
- npm (version 10.1.0)
- Git

## Installation

   ```bash 
   git clone https://github.com/vamshikrishnafive/NodeAppAssessment-.git
   cd NodeAppAssessment 
   ```
## Configuration

   ```bash
   npm install
   touch data.json or rename the used.data.json to data.json
   ```

example data.json file:
```js
{
    "blogs": [
        {
            "id": 1,
            "title": "test title",
            "content": "test content",
            "publishedAt": "2023-11-12"
        }
    ]
}
```

## Running the Server

```bash
npm run start
```

## Testing

```bash
npm run test
```


## API Endpoints

**Get All Blogs**

Endpoint: GET /blogs
Description: Get all blogs.

**Get Last Week's Blogs**
Endpoint: GET /blogs/lastweek
Description: Get blogs published in the last week.

**Get Single Blog**
Endpoint: GET /blogs/:idOrTitle
Description: Get details of a single blog by id Or Title.

**Create Single Blog**
Endpoint: POST /blogs/create
Description: Create a new blog and save to the disk

## Contributing

**Vamshi krishna**

## License

You can copy and paste this template into a new file named `README.md` in your project's root directory. Feel free to customize it further based on your project's specific details and requirements.
