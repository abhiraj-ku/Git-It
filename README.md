# Simple Git Implementation in JavaScript

This project is a simple implementation of Git in JavaScript, providing basic Git functionality for managing version control in a local environment.

## Usage

To use this Git implementation, follow the steps below:

1. Clone or download the repository to your local machine.

2. Open a terminal window and navigate to the project directory.

3. Run the Node.js script with one of the following commands:

   ```bash
   # Initialize an empty Git repository in the current directory
   node your_script.js init

   # Display the contents of a Git object
   node your_script.js cat-file -p <object-hash>
   ```

   Replace `<object-hash>` with the hash of the Git object you want to inspect.

## Available Commands

- `init`: Initializes an empty Git repository in the current directory.

- `cat-file -p <object-hash>`: Displays the contents of a Git object identified by its hash.

## Requirements

- Node.js (version >= 10.0.0)

## Contributions

Contributions to this project are welcome! If you have any ideas for improvements or new features, feel free to open an issue or submit a pull request.
