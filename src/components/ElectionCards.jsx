export default function ElectionCards({ children: electioncards = [] }) {
  return (
    <div className="border border-b-0 p-2 flex flex-row items-center justify-center flex-wrap">
      {electioncards}
    </div>
  );
}
