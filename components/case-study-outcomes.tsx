interface CaseStudyOutcomesProps {
  outcomes: string[]
  contrast?: boolean
}

const dataPattern =
  /(\$[\d,.]+\s*(?:million|billion)?|\d[\d,.]*-(?:year|room|unit)|\d[\d,.]*\s+permanent jobs|five-year)/gi
const dataOnlyPattern =
  /^(?:\$[\d,.]+\s*(?:million|billion)?|\d[\d,.]*-(?:year|room|unit)|\d[\d,.]*\s+permanent jobs|five-year)$/i

function OutcomeText({ text }: { text: string }) {
  return text.split(dataPattern).map((part, index) =>
    dataOnlyPattern.test(part) ? (
      <strong key={`${part}-${index}`} className="font-extrabold">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}

export function CaseStudyOutcomes({
  outcomes,
  contrast = false,
}: CaseStudyOutcomesProps) {
  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {outcomes.map((outcome) => (
        <li
          key={outcome}
          className={`flex min-h-28 items-center border-l-[3px] border-primary px-5 py-5 text-base font-semibold leading-relaxed text-[#123f6b] sm:px-6 ${
            contrast
              ? 'border-y border-r border-y-[#d8e3ed] border-r-[#d8e3ed] bg-white shadow-[0_14px_32px_-24px_rgba(15,58,99,0.7)]'
              : 'bg-[#f1f5f9]'
          }`}
        >
          <OutcomeText text={outcome} />
        </li>
      ))}
    </ul>
  )
}
