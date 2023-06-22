cd ../backend
start python app.py
%SendKeys% {Enter}
cd ../scheduler
timeout /t 10 /nobreak
start python main.py