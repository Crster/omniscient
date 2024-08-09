import Image from "next/image";
import {
  MdOutlineFemale,
  MdOutlineGroup,
  MdOutlineHowToVote,
  MdOutlineMale,
} from "react-icons/md";

export default function DashboardPage() {
  return (
    <>
      <h2 className="text-4xl text-blue-500 font-medium">Dashboard</h2>

      <div className="grid grid-cols-4 gap-4 items-center">
        <div className="text-center bg-gray-200/35 px-2 py-4">
          <span className="flex flex-wrap gap-2 text-blue-500 text-base justify-center">
            <MdOutlineHowToVote className="text-base self-center" />
            Total Voter
          </span>
          <span className="text-3xl">96716</span>
        </div>

        <div className="text-center bg-gray-200/35 px-2 py-4">
          <span className="flex flex-wrap gap-2 text-blue-500 text-base justify-center">
            <MdOutlineMale className="text-base self-center" />
            Male Voter
          </span>
          <span className="text-3xl">6716</span>
        </div>

        <div className="text-center bg-gray-200/35 px-2 py-4">
          <span className="flex flex-wrap gap-2 text-blue-500 text-base justify-center">
            <MdOutlineFemale className="text-base self-center" />
            Female Voter
          </span>
          <span className="text-3xl">9716</span>
        </div>

        <div className="text-center bg-gray-200/35 px-2 py-4">
          <span className="flex flex-wrap gap-2 text-blue-500 text-base justify-center">
            <MdOutlineGroup className="text-base self-center" />
            Candidates
          </span>
          <span className="text-3xl">716</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-8">
        <div>
          <span className="text-xl font-medium">Barangay High Result</span>
          <Image
            src="/sample-graph.svg"
            alt="Sample Graph1"
            width={498}
            height={289}
            priority
          />
        </div>

        <div>
          <span className="text-xl font-medium">Barangay High Result</span>
          <Image
            src="/sample-graph.svg"
            alt="Sample Graph1"
            width={498}
            height={289}
            priority
          />
        </div>

        <div>
          <span className="text-xl font-medium">Barangay High Result</span>
          <Image
            src="/sample-graph.svg"
            alt="Sample Graph1"
            width={498}
            height={289}
            priority
          />
        </div>

        <div>
          <span className="text-xl font-medium">Barangay High Result</span>
          <Image
            src="/sample-graph.svg"
            alt="Sample Graph1"
            width={498}
            height={289}
            priority
          />
        </div>
      </div>
    </>
  );
}
