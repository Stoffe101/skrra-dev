type Token = { t: string; c?: string };
type Line = { no: string; tokens: Token[] };

const PROMPT = "text-violet-400";
const CMD = "text-cyan-300";
const KEY = "text-sky-300";
const STR = "text-violet-300";
const PUNCT = "text-zinc-500";
const PLAIN = "text-snow";
const MISSION = "text-emerald-300";

const lines: Line[] = [
  { no: "01", tokens: [{ t: "> ", c: PROMPT }, { t: "whoami", c: CMD }] },
  {
    no: "02",
    tokens: [
      { t: "developer ", c: PLAIN },
      { t: "{", c: PUNCT },
    ],
  },
  {
    no: "03",
    tokens: [
      { t: "  name: ", c: KEY },
      { t: '"Christoffer Lööf"', c: STR },
      { t: ",", c: PUNCT },
    ],
  },
  {
    no: "04",
    tokens: [
      { t: "  role: ", c: KEY },
      { t: '"Systemutvecklare (inr. Testing)"', c: STR },
      { t: ",", c: PUNCT },
    ],
  },
  {
    no: "05",
    tokens: [
      { t: "  location: ", c: KEY },
      { t: '"Malmö, Sweden"', c: STR },
      { t: ",", c: PUNCT },
    ],
  },
  {
    no: "06",
    tokens: [
      { t: "  focus: ", c: KEY },
      { t: "[", c: PUNCT },
      { t: '"Java"', c: STR },
      { t: ", ", c: PUNCT },
      { t: '"QA"', c: STR },
      { t: ", ", c: PUNCT },
      { t: '"Automation"', c: STR },
      { t: "],", c: PUNCT },
    ],
  },
  {
    no: "07",
    tokens: [
      { t: "  learning: ", c: KEY },
      { t: "[", c: PUNCT },
      { t: '"AI"', c: STR },
      { t: ", ", c: PUNCT },
      { t: '"Cybersäkerhet"', c: STR },
      { t: "],", c: PUNCT },
    ],
  },
  {
    no: "08",
    tokens: [
      { t: "  hobbies: ", c: KEY },
      { t: "[", c: PUNCT },
      { t: '"Minecraft Modding"', c: STR },
      { t: ", ", c: PUNCT },
      { t: '"Web Dev"', c: STR },
      { t: "]", c: PUNCT },
    ],
  },
  { no: "09", tokens: [{ t: "}", c: PUNCT }] },
  { no: "10", tokens: [] },
  { no: "11", tokens: [{ t: "> ", c: PROMPT }, { t: "mission", c: CMD }] },
  {
    no: "12",
    tokens: [
      { t: '"Bygga, testa och förbättra – varje dag."', c: MISSION },
    ],
  },
];

export default function TerminalCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-panel shadow-[0_0_70px_-18px_rgb(139_92_246/0.45)]">
      <div
        aria-hidden
        className="flex items-center gap-2 border-b border-line px-4 py-3"
      >
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-faint">
          christoffer@skrra.dev
        </span>
      </div>
      <pre className="overflow-x-auto px-4 py-5 font-mono text-[13px] leading-7 sm:px-5">
        <code>
          {lines.map((line) => (
            <span key={line.no} className="flex">
              <span
                aria-hidden
                className="w-8 shrink-0 select-none pr-4 text-right text-zinc-600"
              >
                {line.no}
              </span>
              <span className="whitespace-pre">
                {line.tokens.map((token, index) => (
                  <span key={index} className={token.c}>
                    {token.t}
                  </span>
                ))}
                {line.tokens.length === 0 && " "}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
