import { ExternalLink, Globe2 } from "lucide-react";
import type { CompanionSource } from "../../../shared/companion";

type SourceChipsProps = {
  sources: CompanionSource[];
};

export default function SourceChips({ sources }: SourceChipsProps) {
  if (!sources.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-1.5" aria-label="网页来源">
      {sources.map((source) => (
        <a
          key={source.url}
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className="source-chip"
          title={source.title}
        >
          <Globe2 size={9} strokeWidth={1.4} aria-hidden="true" />
          <span className="max-w-[150px] truncate">{source.title}</span>
          <ExternalLink size={8} strokeWidth={1.4} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
