REM Check if node_modules directory exists in the react folder
if not exist "node_modules" (
    echo npm dependencies not found. Installing dependencies...
    call npm install
) else (
    echo npm dependencies are already installed
)

start cmd /k node index.js

start "" "http://localhost:3000"