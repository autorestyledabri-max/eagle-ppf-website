@echo off
setlocal
cd /d "%~dp0"
set PORT=5173
echo.
echo   EAGLE PPF - local server
echo   -------------------------
echo   Browser khul jayega. Band karne ke liye is window me Ctrl+C dabao.
echo.
where py >nul 2>nul
if %errorlevel%==0 goto usepy
where python >nul 2>nul
if %errorlevel%==0 goto usepython
where node >nul 2>nul
if %errorlevel%==0 goto usenode
echo   Python aur Node dono nahi mile.
echo   Koi baat nahi - index.html par double click karo, site chal jayegi.
pause
goto end
:usepy
start "" http://localhost:%PORT%/
py -m http.server %PORT%
goto end
:usepython
start "" http://localhost:%PORT%/
python -m http.server %PORT%
goto end
:usenode
start "" http://localhost:%PORT%/
npx --yes serve -l %PORT% .
:end
