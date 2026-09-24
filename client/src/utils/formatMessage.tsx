import React from "react";

// http(s) links, without trailing punctuation
const URL_RE = /https?:\/\/[^\s<]+[^\s<.,:;"')\]!?]/g;

function matches(text: string): RegExpExecArray[] {
  const re = new RegExp(URL_RE.source, "g");
  const out: RegExpExecArray[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) out.push(m);
  return out;
}

function linkify(text: string, key: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;

  matches(text).forEach((m) => {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      <a
        key={`${key}-${m.index}`}
        href={m[0]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#00a8fc] hover:underline"
      >
        {m[0]}
      </a>
    );
    last = m.index + m[0].length;
  });

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

// invite codes from links to this app (https://host/invite/code)
export function inviteCodes(text: string): string[] {
  if (typeof window === "undefined") return [];

  const codes: string[] = [];
  matches(text).forEach((m) => {
    try {
      const url = new URL(m[0]);
      const code = url.pathname.match(/^\/invite\/([A-Za-z0-9]+)\/?$/);
      if (
        url.host === window.location.host &&
        code &&
        !codes.includes(code[1])
      ) {
        codes.push(code[1]);
      }
    } catch {
      // not a url
    }
  });
  return codes;
}

// ```code blocks```, `inline code` and links as react nodes - never raw html
export function formatMessage(message: string) {
  const nodes: React.ReactNode[] = [];

  message.split(/```([\s\S]+?)```/g).forEach((part, i) => {
    if (i % 2 === 1) {
      nodes.push(
        <pre
          key={`pre-${i}`}
          className="bg-mid border border-darkish rounded p-2 my-1 max-w-xl overflow-x-auto text-sm"
        >
          <code>{part.replace(/^\n+|\n+$/g, "")}</code>
        </pre>
      );
      return;
    }

    part.split(/`([^`\n]+)`/g).forEach((chunk, j) => {
      if (j % 2 === 1) {
        nodes.push(
          <code
            key={`code-${i}-${j}`}
            className="bg-mid rounded px-1 py-0.5 text-sm"
          >
            {chunk}
          </code>
        );
      } else {
        nodes.push(...linkify(chunk, `text-${i}-${j}`));
      }
    });
  });

  return <span className="whitespace-pre-wrap break-words">{nodes}</span>;
}
