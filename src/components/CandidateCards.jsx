export default function CandidateCards({ children: candidatecards }) {
  return (
    <div className="border border-t-0 p-2 flex flex-row items-center justify-center flex-wrap">
      {candidatecards}
    </div>
  );
}
