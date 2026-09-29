export function formatMessage(message: string) {
  const codeBlockRegex = /```([^`]+)```/g;
  const inlineCodeRegex = /`([^`]+)`/g;

  const formattedMessage = message
    .replace(
      codeBlockRegex,
      (_, code) =>
        `<pre class="bg-mid w-screen max-w-xl py-2"><code>${code.trim()}</code></pre>`
    )
    .replace(inlineCodeRegex, (_, code) => `<code>${code.trim()}</code>`);

  return <span dangerouslySetInnerHTML={{ __html: formattedMessage }} />;
}
