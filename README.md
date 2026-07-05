# BlueMoon - He thong quan ly cu dan va thu phi

BlueMoon la he thong web ho tro ban quan ly chung cu/khu dan cu trong viec quan ly ho dan, cu dan, tai khoan nguoi dung, cac loai phi, hoa don, thong bao va nhat ky thao tac. He thong co hai nhom nguoi dung chinh:

- `ADMIN`: quan ly ho dan, cu dan, nguoi dung, loai phi, hoa don, thong bao va xem thong ke.
- `RESIDENT`: dang nhap de xem thong tin ho gia dinh, nhan khau, thong bao va cac hoa don lien quan.

## Cong nghe su dung

- Frontend: React, TypeScript, Vite, Tailwind CSS, Radix UI, Zustand, Axios.
- Backend: Node.js, Express, Sequelize, MySQL, JWT, cookie-parser.
- Database: MySQL, co script tao bang va du lieu mau trong thu muc `database/scripts`.

## Cau truc thu muc

```text
NMCNPM/
|-- backend/              # API Express, model Sequelize, route, controller
|-- frontend/             # Ung dung React/Vite
|-- database/scripts/     # Script SQL tao bang va du lieu mau
|-- DATABASE_ORDERING.md  # Ghi chu ve thu tu/chuan database
`-- USER_LOG_FEATURES.md  # Ghi chu tinh nang nhat ky nguoi dung
```

## Yeu cau cai dat

- Node.js va npm.
- MySQL dang chay tren may local hoac server rieng.
- Git neu can clone source code.

## Cai dat backend

1. Di chuyen vao thu muc backend:

```bash
cd backend
```

2. Cai dependencies:

```bash
npm install
```

3. Tao file `.env` tu file mau:

```bash
cp src/.env.example src/.env
```

Neu dung PowerShell tren Windows:

```powershell
Copy-Item src\.env.example src\.env
```

4. Cap nhat bien moi truong trong `backend/src/.env`:

```env
PORT=5001
DB_CONNECTION_STRING=mysql://root:password@localhost:3306/bluemoon
ACCESS_TOKEN_SECRET=your_access_token_secret_key
FRONTEND_ORIGIN=http://localhost:5173
```

Luu y: frontend hien dang goi API tai `http://localhost:5001/api`, vi vay nen de backend chay o cong `5001` hoac cap nhat lai `frontend/src/lib/axios.ts` neu doi cong.

5. Chay backend:

```bash
npm run dev
```

Khi backend khoi dong, Sequelize se ket noi MySQL, tao database neu chua ton tai va dong bo cac bang theo model.

## Khoi tao du lieu

Neu can nap cau truc bang va du lieu mau bang SQL, chay cac file trong thu muc `database/scripts` theo thu tu:

1. `create_table.sql`
2. `data_dumb.sql`

Co the import bang MySQL Workbench, phpMyAdmin hoac command line tuy moi truong cua ban.

De tao tai khoan admin mac dinh bang script backend:

```bash
cd backend
node create-admin.js
```

Tai khoan duoc tao:

- Username: `admin`
- Password: `admin123`

## Cai dat frontend

1. Mo terminal khac va di chuyen vao thu muc frontend:

```bash
cd frontend
```

2. Cai dependencies:

```bash
npm install
```

3. Chay ung dung:

```bash
npm run dev
```

Mac dinh Vite se mo tai:

```text
http://localhost:5173
```

## Build va kiem tra

Frontend:

```bash
cd frontend
npm run build
npm run lint
```

Backend:

```bash
cd backend
npm start
```

## Ghi chu phat trien

- Backend su dung JWT va cookie de xac thuc, mot so API yeu cau dang nhap.
- Cac API chinh nam trong `backend/src/routes`.
- Cac man hinh frontend nam trong `frontend/src/pages`.
- Neu doi domain frontend, cap nhat `FRONTEND_ORIGIN` trong backend de CORS cho phep request kem cookie.
