document.addEventListener('DOMContentLoaded', () => {
    const shortenButton = document.getElementById('shortenButton');
    const copyButton = document.getElementById('copyButton');
    const originalUrlInput = document.getElementById('originalUrl');
    const shortenedUrlDiv = document.getElementById('shortenedUrlDiv');
    const shortenedUrl = document.getElementById('shortenedUrl');

    shortenButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const originalUrl = originalUrlInput.value;

        // Call the TinyURL API to shorten the URL
        shortenURL(originalUrl)
            .then((shortened) => {
                shortenedUrl.href = shortened;
                shortenedUrl.textContent = shortened;
                shortenedUrlDiv.style.display = 'block';
                copyButton.innerHTML="Copy"
            })
            .catch((error) => {
                console.error('Error shortening URL:', error);
            });
    });

    copyButton.addEventListener('click', () => {
        // Copy shortened URL to clipboard
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = shortenedUrl.textContent;
        tempInput.select();
        document.execCommand('copy');
        copyButton.innerHTML="Copied"
        document.body.removeChild(tempInput);

        // Display a notification or alert that the URL has been copied
        alert('Shortened URL copied to clipboard!');
    });

    async function shortenURL(originalUrl) {
        // Replace 'YOUR_TINYURL_API_ENDPOINT' with the actual TinyURL API endpoint.
        const apiEndpoint = 'https://tinyurl.com/api-create.php?url=' + encodeURIComponent(originalUrl);

        try {
            const response = await fetch(apiEndpoint);
            if (response.ok) {
                const shortened = await response.text();
                return shortened;
            } else {
                throw new Error('Failed to shorten URL');
            }
        } catch (error) {
            throw error;
        }
    }
});
