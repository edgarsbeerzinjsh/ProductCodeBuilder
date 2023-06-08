REM Check if node_modules directory exists in the folder
if not exist "node_modules" (
    echo npm dependencies not found. Installing dependencies...
    call npm install
) else (
    echo npm dependencies are already installed
)

start npm start