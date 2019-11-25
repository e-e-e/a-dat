# a-dat

**DON'T USE! WORK IN PROGRESS**

A tool to help create, manage and share smaller dat collections derived from a large centralised repository of files.

## Installation

```bash
# WIP // npm install -g something
```

### CLI Usage

Note: This is a WIP.

##### `a-dat init`

Create simple config file.

##### `a-dat create <collections>`

Create a new dat from database information about the collection

##### `a-dat update <collections>`

Update dat to match state of collection within the database

##### `a-dat share <collections>`

Share dat collections

### Configuration

Configure by creating a local `.a-dat.config.json` file:

```json
{
  "database": {
    "url": "mongodb://url-for-db",
    "name": "database"
  },
  // root location of files
  "rootDir": "/var/www/html/assets/",
  // Directory for storing dat collections and related dat.
  "storage": "/user/your-user/home/dats"
}
```

CLI recursively checks parent folders, and lastly the users home directory for config.
