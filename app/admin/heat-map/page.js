"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { MdOutlineSearch } from "react-icons/md";
import { PrimaryButton } from "../../components/theme/Button";


export default function HeatMapPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("../../components/theme/Map"), {
        loading: () => <p>Loading Map...</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <div className="grid grid-cols-2">
        <h2 className="text-4xl text-blue-500 font-medium">Heat Map</h2>

        <div className="flex flex-row gap-1 justify-self-end">
          <PrimaryButton
            className="px-2 py-2 w-32"
            startContent={
              <MdOutlineSearch className="inline text-2xl align-top" />
            }
          >
            Barangay
          </PrimaryButton>
        </div>

        <Map zoom={13} location={[7.0683, 125.6104]} />
      </div>
    </>
  );
}
