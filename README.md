# Express MongoDB API

This is a simple Express.js API with MongoDB for managing Mahasiswa data and their academic records.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/developerlight/siakad.git
    ```

2. Navigate to the project directory:

    ```bash
    cd express-mongodb-api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add the following:

    ```env
    DATABASE_URL=your_mongodb_connection_string
    ```

5. Start the server:

    ```bash
    npm start
    ```

The server will run on [http://localhost:5000](http://localhost:5000).

## API Endpoints

### Mahasiswa Routes

- **GET /mahasiswa**
  - Retrieves a list of all Mahasiswa.
  
- **POST /mahasiswa**
  - Inserts a new Mahasiswa.

- **GET /mahasiswa/:nim**
  - Retrieves a Mahasiswa by their NIM.

- **PUT /mahasiswa/:nim**
  - Updates a Mahasiswa's information.

- **DELETE /mahasiswa/:nim**
  - Deletes a Mahasiswa.

### Nilai Routes

- **GET /nilai/:nim**
  - Retrieves academic records (nilai) for a Mahasiswa by their NIM.

- **PUT /nilai/:nim**
  - Inserts academic records (nilai) for a Mahasiswa.

- **GET /nilai/:nim/:smt**
  - Retrieves academic records (nilai) for a Mahasiswa by their NIM and semester.

- **GET /nilai/:nim/program/:program**
  - Retrieves academic records (nilai) for a Mahasiswa by their NIM and program.

- **PUT /nilai/:nim/program/:program**
  - Updates academic records (nilai) for a Mahasiswa by their NIM and program.

- **PUT /nilai/:nim/:id**
  - Updates academic records (nilai) for a Mahasiswa by their NIM and nilai ID.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
