export default function Dashboard() {
  return (
    <div className="ml-96 my-10">
      <h2 className="text-4xl text-blue-500 font-medium">Dashboard</h2>

      <div className="grid grid-cols-4 mt-8">
        <div>Total Voter</div>

        <div>Male Voter</div>

        <div>Female Voter</div>

        <div>Number of Candidate</div>
      </div>
    </div>
  );
}
