document.addEventListener('DOMContentLoaded', function () {
    const terminal = document.getElementById('terminal');
    const inputField = document.getElementById('commandInput');
    const answerInput = document.getElementById('answerInput'); // New line to get answer input field
    let currentDirectory = '';

    // Initialize terminal with initial prompt
    terminal.innerHTML += `<div>User@admin:~$</div>`;

    inputField.focus(); // Focus on input field when page loads

    inputField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const command = inputField.value.trim();
            inputField.value = ''; // Clear input field
            executeCommand(command);
        }
    });

    function executeCommand(command) {
        // Display user command in terminal
        terminal.innerHTML += `<div>User@admin:~$ ${command}</div>`;

        // Execute command logic
        const commandParts = command.split(' ');
        const mainCommand = commandParts[0];

        switch (mainCommand) {
            case 'ls':
                if (currentDirectory === '') {
                    displayOutput('folder1\tfolder2'); // Tab-separated list of files and folders
                } else if (currentDirectory === '/folder1') {
                    displayOutput('file1.txt');
                } else if (currentDirectory === '/folder2') {
                    displayOutput('file2.txt');
                }
                break;
            case 'cd':
                const targetDirectory = commandParts[1];
                if (targetDirectory === '..') {
                    currentDirectory = ''; // Move to parent directory
                    displayOutput('');
                } else if (targetDirectory === 'folder1') {
                    currentDirectory = '/folder1'; // Change current directory
                    displayOutput('');
                } else if (targetDirectory === 'folder2') {
                    currentDirectory = '/folder2'; // Change current directory
                    displayOutput('');
                } else {
                    displayOutput(`cd: no such directory: ${targetDirectory}`);
                }
                break;
            case 'cat':
                const filename = commandParts[1];
                if (currentDirectory === '/folder1' && filename === 'file1.txt') {
                    displayOutput('hello'); // Contents of file1.txt
                } else if (currentDirectory === '/folder2' && filename === 'file2.txt') {
                    displayOutput('hii there'); // Contents of file2.txt
                } else {
                    displayOutput(`cat: ${filename}: No such file or directory`);
                }
                break;
            case 'dt':
                if (commandParts[1] === '-h') {
                    displayOutput(`Filesystem\tSize\tUsed\tAvail\tUse%\tMounted on\n/dev/sda1\t20G\t10G\t10G\t50%\t/\n/dev/sda2\t100G\t20G\t80G\t20%\t/home`);
                } else {
                    displayOutput(`dt: invalid option: ${commandParts[1]}`);
                }
                break;
            default:
                displayOutput(`Command not found: ${command}`);
                break;
        }

        // Display prompt for next command
        terminal.innerHTML += `<div>User@admin:${currentDirectory} $</div>`;
    }

    function displayOutput(output) {
        terminal.innerHTML += `<div>${output}</div>`;
    }
    
    // Function to check the answer when submit button is clicked
    function checkAnswer() {
        const userAnswer = answerInput.value.trim(); // Get user's answer from the input field
        if (userAnswer.toLowerCase() === 'hii there') { // Check if the answer is correct
            displayOutput('Correct!'); // Display message indicating correct answer
        } else {
            displayOutput('Wrong answer. Try again.'); // Display message indicating wrong answer
        }
        answerInput.value = ''; // Clear the answer input field
    }

    // Attach the checkAnswer function to the submit button click event
    document.querySelector('.submit-button').addEventListener('click', checkAnswer);
});
