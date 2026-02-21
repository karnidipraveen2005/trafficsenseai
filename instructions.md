# TrafficSenseAI Run Instructions (Beginner Friendly)

## 1) Open project folder
```powershell
cd c:\Users\KarnidiVeera\Desktop\trafficsenseai
```

## 2) Start backend (Django + MongoDB)

### First-time setup
```powershell
python -m venv backend\.venv
backend\.venv\Scripts\python -m pip install --upgrade pip
backend\.venv\Scripts\python -m pip install -r backend\requirements.txt
Copy-Item backend\.env.example backend\.env -ErrorAction SilentlyContinue
```

### Edit backend environment file
Open `backend/.env` and set your real MongoDB connection string and secret key.

### Run backend server
```powershell
backend\.venv\Scripts\python backend\manage.py migrate
backend\.venv\Scripts\python backend\manage.py runserver
```
Backend will run at: `http://127.0.0.1:8000`

## 3) Start frontend (React + Vite)
Open a second terminal:
```powershell
cd c:\Users\KarnidiVeera\Desktop\trafficsenseai
npm install
npm run dev
```
Frontend will run at: `http://localhost:5176`

## 4) Quick API health checks
```powershell
curl http://127.0.0.1:8000/api/auth/health/
curl http://127.0.0.1:8000/api/chat/health/
```

## 4.1) If backend is not working
Run these checks:
```powershell
Test-Path backend\.env
backend\.venv\Scripts\python backend\manage.py check
backend\.venv\Scripts\python backend\manage.py runserver
```
- If `backend/.env` is missing, create it from `backend/.env.example`.
- If MongoDB URL has `@` in password, use `%40` in the URL.
- Ensure MongoDB Atlas Network Access has your IP (or `0.0.0.0/0` for testing).
- If port 8000 is occupied by old server instances:
```powershell
Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'python.exe' -and $_.CommandLine -like '*manage.py runserver*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
```

## 5) Backend API endpoints
- `POST /api/auth/signup/`
- `POST /api/auth/login/`
- `GET /api/auth/profile/`
- `PUT /api/auth/profile/`
- `POST /api/auth/logout/`
- `POST /api/chat/message/`
- `GET /api/chat/history/`

Compatibility aliases (already enabled for current frontend):
- `POST /api/accounts/signup/`
- `POST /api/accounts/login/`
- `GET /api/accounts/profile/`
- `PUT /api/accounts/profile/`
- `POST /api/accounts/logout/`

## 6) Export requirements (when dependencies change)
```powershell
backend\.venv\Scripts\python -m pip freeze > backend\requirements.txt
```
