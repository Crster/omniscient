import Image from "next/image";

export function Profile({ src, alt, name, title }) {
  return (
    <div className="flex flex-1 gap-2 content-center">
      <Image
        className="rounded w-10 h-10 self-center"
        src={src}
        alt={alt}
        width={64}
        height={64}
        priority
      />

      <div className="flex flex-col col-span-4">
        <span className="font-medium text-base">{name}</span>
        <span className="text-gray-400 text-sm">{title}</span>
      </div>
    </div>
  );
}
